const express = require('express');
const router = express.Router();
const {
  createSlot,
  getAllSlots,
  getAvailableSlots,
  parkVehicle,
  removeVehicle,
  getSlotByNumber,
  addSampleSlots
} = require('../controllers/slotController');

// Parking slot routes
router.post('/', createSlot);
router.get('/', getAllSlots);
router.get('/available', getAvailableSlots);
router.post('/park', parkVehicle);
router.post('/remove', removeVehicle);
router.get('/:slotNo', getSlotByNumber);
router.post('/sample/add', addSampleSlots);

module.exports = router;