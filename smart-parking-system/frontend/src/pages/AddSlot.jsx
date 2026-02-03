import React, { useState } from 'react';
import toast from 'react-hot-toast';
import InputField from '../components/InputField';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import { slotAPI } from '../services/api';

const AddSlot = () => {
  const [formData, setFormData] = useState({
    slotNo: '',
    isCovered: false,
    isEVCharging: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.slotNo) {
      toast.error('Please enter slot number');
      return;
    }

    setLoading(true);
    try {
      await slotAPI.createSlot(formData);
      toast.success('Parking slot added successfully!');
      setFormData({
        slotNo: '',
        isCovered: false,
        isEVCharging: false,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add slot');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Parking Slot</h2>
        
        <div className="card">
          <form onSubmit={handleSubmit}>
            <InputField
              label="Slot Number"
              name="slotNo"
              type="number"
              value={formData.slotNo}
              onChange={handleChange}
              placeholder="Enter slot number"
              required
              min="1"
            />
            
            <div className="mb-6 space-y-4">
              <Checkbox
                label="Covered Parking"
                name="isCovered"
                checked={formData.isCovered}
                onChange={handleChange}
              />
              
              <Checkbox
                label="EV Charging Available"
                name="isEVCharging"
                checked={formData.isEVCharging}
                onChange={handleChange}
              />
            </div>
            
            <Button
              type="submit"
              variant="primary"
              size="large"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Adding...' : 'Add Parking Slot'}
            </Button>
          </form>
        </div>
        
        <div className="mt-8 card">
          <h3 className="text-lg font-semibold mb-4">Sample Slots</h3>
          <p className="text-gray-600 mb-4">
            You can add pre-configured sample slots for testing:
          </p>
          <Button
            variant="secondary"
            onClick={async () => {
              try {
                await slotAPI.addSampleSlots();
                toast.success('Sample slots added successfully!');
              } catch (error) {
                toast.error('Failed to add sample slots');
              }
            }}
          >
            Add Sample Slots
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddSlot;