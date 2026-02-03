const Slot = require('../models/Slot');

class SlotService {
  // Create new slot
  async createSlot(slotData) {
    try {
      const existingSlot = await Slot.findOne({ slotNo: slotData.slotNo });
      if (existingSlot) {
        throw new Error(`Slot number ${slotData.slotNo} already exists`);
      }
      
      const slot = await Slot.create(slotData);
      return slot;
    } catch (error) {
      throw new Error(`Error creating slot: ${error.message}`);
    }
  }

  // Get all slots
  async getAllSlots() {
    try {
      const slots = await Slot.find().sort({ slotNo: 1 });
      return slots;
    } catch (error) {
      throw new Error(`Error fetching slots: ${error.message}`);
    }
  }

  // Get available slots
  async getAvailableSlots() {
    try {
      const slots = await Slot.find({ isOccupied: false }).sort({ slotNo: 1 });
      return slots;
    } catch (error) {
      throw new Error(`Error fetching available slots: ${error.message}`);
    }
  }

  // Park vehicle
  async parkVehicle(needsEV, needsCover, vehicleType = 'Car') {
    try {
      // Build query based on requirements
      const query = {
        isOccupied: false
      };

      if (needsEV) {
        query.isEVCharging = true;
      }
      if (needsCover) {
        query.isCovered = true;
      }

      // Find matching slots sorted by slot number (nearest available)
      const matchingSlots = await Slot.find(query).sort({ slotNo: 1 });

      if (matchingSlots.length === 0) {
        return { 
          success: false, 
          message: 'No slot available' 
        };
      }

      // Allocate the first (nearest) matching slot
      const allocatedSlot = matchingSlots[0];
      
      allocatedSlot.isOccupied = true;
      allocatedSlot.vehicleType = vehicleType;
      await allocatedSlot.save();

      return {
        success: true,
        message: `Vehicle parked successfully at Slot ${allocatedSlot.slotNo}`,
        slot: allocatedSlot
      };
    } catch (error) {
      throw new Error(`Error parking vehicle: ${error.message}`);
    }
  }

  // Remove vehicle
  async removeVehicle(slotNo) {
    try {
      const slot = await Slot.findOne({ slotNo });
      
      if (!slot) {
        throw new Error(`Slot ${slotNo} not found`);
      }

      if (!slot.isOccupied) {
        throw new Error(`Slot ${slotNo} is already vacant`);
      }

      slot.isOccupied = false;
      slot.vehicleType = null;
      await slot.save();

      return {
        success: true,
        message: `Vehicle removed from Slot ${slotNo}`
      };
    } catch (error) {
      throw new Error(`Error removing vehicle: ${error.message}`);
    }
  }

  // Get slot by number
  async getSlotByNumber(slotNo) {
    try {
      const slot = await Slot.findOne({ slotNo });
      if (!slot) {
        throw new Error(`Slot ${slotNo} not found`);
      }
      return slot;
    } catch (error) {
      throw new Error(`Error fetching slot: ${error.message}`);
    }
  }

  // Add sample slots
  async addSampleSlots() {
    try {
      const sampleSlots = [
        { slotNo: 1, isCovered: true, isEVCharging: true },
        { slotNo: 2, isCovered: true, isEVCharging: false },
        { slotNo: 3, isCovered: false, isEVCharging: true },
        { slotNo: 4, isCovered: false, isEVCharging: false },
        { slotNo: 5, isCovered: true, isEVCharging: true },
        { slotNo: 6, isCovered: false, isEVCharging: false },
      ];

      for (const slotData of sampleSlots) {
        const exists = await Slot.findOne({ slotNo: slotData.slotNo });
        if (!exists) {
          await Slot.create(slotData);
        }
      }

      return { message: 'Sample slots added successfully' };
    } catch (error) {
      throw new Error(`Error adding sample slots: ${error.message}`);
    }
  }
}

module.exports = new SlotService();