const mongoose=require('mongoose');

const coordinateSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number
});
const fieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
    required: true
  },
  coordinates: [coordinateSchema],
  area: {
    type: Number,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Field', fieldSchema);