const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  ip:       { type: String, required: true },
  mac:      { type: String },
  os:       { type: String },
  type:     { type: String },
  location: { type: String },
  createdAt:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('Device', deviceSchema);
