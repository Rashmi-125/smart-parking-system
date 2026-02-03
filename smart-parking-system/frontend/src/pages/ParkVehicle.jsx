import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { slotAPI } from '../services/api';

const ParkVehicle = () => {
  const [formData, setFormData] = useState({
    needsEV: false,
    needsCover: false,
    vehicleType: 'Car',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await slotAPI.parkVehicle(
        formData.needsEV,
        formData.needsCover,
        formData.vehicleType
      );
      
      setResult(response.data);
      
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to park vehicle');
    } finally {
      setLoading(false);
    }
  };

  const getFeatureText = () => {
    const features = [];
    if (formData.needsEV) features.push('EV Charging');
    if (formData.needsCover) features.push('Covered');
    return features.length > 0 ? features.join(', ') : 'No special features';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Park Vehicle</h2>
        
        <div className="card mb-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">Vehicle Type</h3>
              <InputField
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                placeholder="e.g., Car, Motorcycle, Truck"
              />
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">Special Requirements</h3>
              <div className="space-y-3">
                <Checkbox
                  label="Need EV Charging"
                  name="needsEV"
                  checked={formData.needsEV}
                  onChange={handleChange}
                  className="text-gray-700"
                />
                
                <Checkbox
                  label="Need Covered Parking"
                  name="needsCover"
                  checked={formData.needsCover}
                  onChange={handleChange}
                  className="text-gray-700"
                />
              </div>
            </div>
            
            <Button
              type="submit"
              variant="primary"
              size="large"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Finding Slot...' : 'Find & Park Vehicle'}
            </Button>
          </form>
        </div>

        {result && (
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Parking Result</h3>
            
            <div className={`p-4 rounded-md mb-4 ${
              result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <p className={result.success ? 'text-green-800' : 'text-red-800'}>
                {result.message}
              </p>
            </div>
            
            {result.slot && (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Slot Number:</span>
                  <span className="font-semibold">#{result.slot.slotNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Features:</span>
                  <div className="flex gap-2">
                    {result.slot.isCovered && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        Covered
                      </span>
                    )}
                    {result.slot.isEVCharging && (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                        EV Charging
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vehicle Type:</span>
                  <span className="font-medium">{formData.vehicleType}</span>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 card">
          <h3 className="font-semibold text-lg mb-3">Parking Rules</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              System finds nearest available slot matching your requirements
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              If EV charging needed, only EV slots are allocated
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              If covered parking needed, only covered slots are allocated
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">✗</span>
              If no matching slot available, you'll get "No slot available" message
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ParkVehicle;