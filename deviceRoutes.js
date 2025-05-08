const express = require('express');
const router = express.Router();
const Device = require('../models/Device');  // MongoDB Device modelimizi import ediyoruz

// GET - Tüm cihazları listele
router.get('/', async (req, res) => {
  try {
    const devices = await Device.find();  // MongoDB'den tüm cihazları getir
    res.json({ message: "Cihaz listesi başarıyla getirildi.", data: devices });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST - Yeni cihaz ekle
router.post('/', async (req, res) => {
  const device = new Device({
    name: req.body.name,
    ip: req.body.ip,
    mac: req.body.mac,
    os: req.body.os,
    type: req.body.type,
    location: req.body.location
  });

  try {
    const newDevice = await device.save();  // MongoDB'ye kaydet
    res.status(201).json({ message: "Cihaz başarıyla eklendi", data: newDevice });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT - Cihaz güncelle
router.put('/:id', async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) {
      return res.status(404).json({ message: "Cihaz bulunamadı" });
    }

    // Gelen alanlar varsa güncelle
    device.name = req.body.name || device.name;
    device.ip = req.body.ip || device.ip;
    device.mac = req.body.mac || device.mac;
    device.os = req.body.os || device.os;
    device.type = req.body.type || device.type;
    device.location = req.body.location || device.location;

    const updatedDevice = await device.save();
    res.json({ message: "Cihaz başarıyla güncellendi", data: updatedDevice });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE - Cihaz sil
router.delete('/:id', async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) {
      return res.status(404).json({ message: "Cihaz bulunamadı" });
    }

    await device.deleteOne();  // Silme işlemi
    res.json({ message: "Cihaz başarıyla silindi" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;  // Tüm rotaları dışa aktarıyoruz
