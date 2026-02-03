import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { slotAPI } from '../services/api';

const ResultPanel = () => {
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    occupied: 0,
    covered: 0,
    ev: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await slotAPI.getAllSlots();
      const slots = response.data.data;
      
      const statsData = {
        total: slots.length,
        available: slots.filter(s => !s.isOccupied).length,
        occupied: slots.filter(s => s.isOccupied).length,
        covered: slots.filter(s => s.isCovered).length,
        ev: slots.filter(s => s.isEVCharging).length,
      };
      
      setStats(statsData);
    } catch (error) {
      toast.error('Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, color, icon }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Slots"
          value={stats.total}
          color="text-blue-600"
          icon={
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
        />
        
        <StatCard
          title="Available"
          value={stats.available}
          color="text-green-600"
          icon={
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        
        <StatCard
          title="Occupied"
          value={stats.occupied}
          color="text-red-600"
          icon={
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          }
        />
        
        <StatCard
          title="Covered Slots"
          value={stats.covered}
          color="text-yellow-600"
          icon={
            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
            </svg>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => window.location.href = '/add-slot'}
              className="w-full btn btn-primary"
            >
              Add New Parking Slot
            </button>
            <button
              onClick={() => window.location.href = '/park-vehicle'}
              className="w-full btn btn-secondary"
            >
              Park Vehicle
            </button>
            <button
              onClick={() => window.location.href = '/remove-vehicle'}
              className="w-full btn btn-secondary"
            >
              Remove Vehicle
            </button>
            <button
              onClick={fetchStats}
              className="w-full btn btn-secondary"
            >
              Refresh Dashboard
            </button>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">EV Charging Slots:</span>
              <span className="font-semibold">{stats.ev}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Utilization Rate:</span>
              <span className="font-semibold">
                {stats.total > 0 ? Math.round((stats.occupied / stats.total) * 100) : 0}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Available Rate:</span>
              <span className="font-semibold">
                {stats.total > 0 ? Math.round((stats.available / stats.total) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPanel;