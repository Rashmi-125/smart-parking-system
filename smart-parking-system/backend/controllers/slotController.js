const slotService = require('../services/slotService');

// @desc    Create a new parking slot
// @route   POST /api/slots
// @access  Public
const createSlot = async (req, res) => {
  try {
    const { slotNo, isCovered, isEVCharging } = req.body;

    // Validate required fields
    if (!slotNo || isCovered === undefined || isEVCharging === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: slotNo, isCovered, isEVCharging'
      });
    }

    const slotData = {
      slotNo: parseInt(slotNo),
      isCovered: Boolean(isCovered),
      isEVCharging: Boolean(isEVCharging)
    };

    const slot = await slotService.createSlot(slotData);
    
    res.status(201).json({
      success: true,
      message: 'Slot created successfully',
      data: slot
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all parking slots
// @route   GET /api/slots
// @access  Public
const getAllSlots = async (req, res) => {
  try {
    const slots = await slotService.getAllSlots();
    
    res.status(200).json({
      success: true,
      count: slots.length,
      data: slots
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get available parking slots
// @route   GET /api/slots/available
// @access  Public
const getAvailableSlots = async (req, res) => {
  try {
    const slots = await slotService.getAvailableSlots();
    
    res.status(200).json({
      success: true,
      count: slots.length,
      data: slots
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Park a vehicle
// @route   POST /api/slots/park
// @access  Public
const parkVehicle = async (req, res) => {
  try {
    const { needsEV, needsCover, vehicleType } = req.body;

    const result = await slotService.parkVehicle(
      Boolean(needsEV),
      Boolean(needsCover),
      vehicleType || 'Car'
    );

    res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Remove a vehicle
// @route   POST /api/slots/remove
// @access  Public
const removeVehicle = async (req, res) => {
  try {
    const { slotNo } = req.body;

    if (!slotNo) {
      return res.status(400).json({
        success: false,
        message: 'Please provide slot number'
      });
    }

    const result = await slotService.removeVehicle(parseInt(slotNo));
    
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get slot by number
// @route   GET /api/slots/:slotNo
// @access  Public
const getSlotByNumber = async (req, res) => {
  try {
    const { slotNo } = req.params;
    const slot = await slotService.getSlotByNumber(parseInt(slotNo));
    
    res.status(200).json({
      success: true,
      data: slot
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add sample slots
// @route   POST /api/slots/sample
// @access  Public
const addSampleSlots = async (req, res) => {
  try {
    const result = await slotService.addSampleSlots();
    
    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createSlot,
  getAllSlots,
  getAvailableSlots,
  parkVehicle,
  removeVehicle,
  getSlotByNumber,
  addSampleSlots
};