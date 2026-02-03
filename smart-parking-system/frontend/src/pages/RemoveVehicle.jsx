import React, { useState } from 'react';
import toast from 'react-hot-toast';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { slotAPI } from '../services/api';

const RemoveVehicle = () => {
  const [slotNo, setSlotNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!slotNo) {
      toast.error('Please enter slot number');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await slotAPI.removeVehicle(slotNo);
      setResult(response.data);
      toast.success(response.data.message);
      setSlotNo('');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to remove vehicle';
      toast.error(errorMessage);
      setResult({ success: false, message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Remove Vehicle</h2>
        
        <div className="card mb-8">
          <form onSubmit={handleSubmit}>
            <InputField
              label="Slot Number"
              type="number"
              value={slotNo}
              onChange={(e) => setSlotNo(e.target.value)}
              placeholder="Enter slot number to free"
              required
              min="1"
            />
            
            <Button
              type="submit"
              variant="danger"
              size="large"
              disabled={loading || !slotNo}
              className="w-full"
            >
              {loading ? 'Removing...' : 'Remove Vehicle'}
            </Button>
          </form>
        </div>

        {result && (
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Operation Result</h3>
            
            <div className={`p-4 rounded-md ${
              result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <p className={result.success ? 'text-green-800' : 'text-red-800'}>
                {result.message}
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 card">
          <h3 className="font-semibold text-lg mb-3">Important Notes</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Enter the slot number from which you want to remove the vehicle
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              The slot will be marked as available for new vehicles
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              You cannot remove vehicle from an already empty slot
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Check slot status from "View Slots" page before removing
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RemoveVehicle;