const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  title: String,
  image: String,
});

module.exports = mongoose.model('Category', categorySchema);
