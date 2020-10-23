const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const videoSchema = new Schema({
  url: { type: String, required: true, trim: true },
  tags: { type: [String], required: true },
});

module.exports = mongoose.model('videos', videoSchema);
