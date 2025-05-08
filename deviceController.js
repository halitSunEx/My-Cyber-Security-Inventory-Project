const Device = require('../models/Device');

// Tüm cihazları getir
const getAllDevices = async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

// Yeni cihaz ekle
const createDevice = async (req, res) => {
  try {
    const newDevice = new Device(req.body);
    await newDevice.save();
    res.status(201).json({ message: 'Cihaz başarıyla eklendi', device: newDevice });
  } catch (err) {
    res.status(400).json({ error: 'Veri eklenemedi', details: err.message });
  }
};

module.exports = {
  getAllDevices,
  createDevice
};
