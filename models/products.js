const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  depart: {
    type: String,
    required: true,
  },
  car: {
    type: String,
    required: true,
  },
  heure: {
    type: String,
    required: true,
  },
  l100: {
    type: Number,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  place: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Product', productSchema);
