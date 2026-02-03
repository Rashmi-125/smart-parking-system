import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { slotAPI } from '../services/api';

const SlotList = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'available', 'occupied'

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await slotAPI.getAllSlots();
      setSlots(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch slots');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (isOccupied) => {
    return isOccupied ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
  };

  const getStatusText = (isOccupied) => {
    return isOccupied ? 'Occupied' : 'Available';
  };

  const filteredSlots = slots.filter(slot => {
    if (filter === 'available') return !slot.isOccupied;
    if (filter === 'occupied') return slot.isOccupied;
    return true;
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading slots...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Parking Slots</h2>
        
        <div className="flex space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input py-2"
          >
            <option value="all">All Slots</option>
            <option value="available">Available Only</option>
            <option value="occupied">Occupied Only</option>
          </select>
          
          <button
            onClick={fetchSlots}
            className="btn btn-secondary"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slot No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Features
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle Type
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSlots.map((slot) => (
              <tr key={slot._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-lg font-semibold">#{slot.slotNo}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(slot.isOccupied)}`}>
                    {getStatusText(slot.isOccupied)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-2">
                    {slot.isCovered && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        Covered
                      </span>
                    )}
                    {slot.isEVCharging && (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                        EV Charging
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {slot.vehicleType || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredSlots.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No slots found
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="font-semibold text-lg mb-2">Statistics</h3>
          <div className="space-y-2">
            <p>Total Slots: {slots.length}</p>
            <p className="text-green-600">Available: {slots.filter(s => !s.isOccupied).length}</p>
            <p className="text-red-600">Occupied: {slots.filter(s => s.isOccupied).length}</p>
          </div>
        </div>
        
        <div className="card">
          <h3 className="font-semibold text-lg mb-2">Features Summary</h3>
          <div className="space-y-2">
            <p>Covered Slots: {slots.filter(s => s.isCovered).length}</p>
            <p>EV Charging Slots: {slots.filter(s => s.isEVCharging).length}</p>
          </div>
        </div>
        
        <div className="card">
          <h3 className="font-semibold text-lg mb-2">Quick Actions</h3>
          <div className="space-y-2">
            <button
              onClick={() => window.location.href = '/add-slot'}
              className="btn btn-primary w-full"
            >
              Add New Slot
            </button>
            <button
              onClick={() => window.location.href = '/park-vehicle'}
              className="btn btn-secondary w-full"
            >
              Park Vehicle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlotList;