import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Slot API calls
export const slotAPI = {
  // Create new slot
  createSlot: (slotData) => api.post('/slots', slotData),
  
  // Get all slots
  getAllSlots: () => api.get('/slots'),
  
  // Get available slots
  getAvailableSlots: () => api.get('/slots/available'),
  
  // Park vehicle
  parkVehicle: (needsEV, needsCover, vehicleType) => 
    api.post('/slots/park', { needsEV, needsCover, vehicleType }),
  
  // Remove vehicle
  removeVehicle: (slotNo) => api.post('/slots/remove', { slotNo }),
  
  // Get slot by number
  getSlotByNumber: (slotNo) => api.get(`/slots/${slotNo}`),
  
  // Add sample slots
  addSampleSlots: () => api.post('/slots/sample/add'),
};
