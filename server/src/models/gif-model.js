const mongoose = require('mongoose');
const { bool } = require('sharp');

const Schema = mongoose.Schema;

const gifSchema = new Schema({
  url: { type: String, required: true, trim: true },
  tags: { type: [String], required: true },
});

module.exports = mongoose.model('gifs', gifSchema);
