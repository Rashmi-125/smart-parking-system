const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  slotNo: {
    type: Number,
    required: [true, 'Please add a slot number'],
    unique: true,
    min: 1
  },
  isCovered: {
    type: Boolean,
    required: true,
    default: false
  },
  isEVCharging: {
    type: Boolean,
    required: true,
    default: false
  },
  isOccupied: {
    type: Boolean,
    required: true,
    default: false
  },
  vehicleType: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Index for faster queries
slotSchema.index({ slotNo: 1 });
slotSchema.index({ isOccupied: 1, isCovered: 1, isEVCharging: 1 });

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;