import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import AddSlot from './pages/AddSlot';
import SlotList from './pages/SlotList';
import ParkVehicle from './pages/ParkVehicle';
import RemoveVehicle from './pages/RemoveVehicle';
import ResultPanel from './pages/ResultPanel';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<ResultPanel />} />
            <Route path="/add-slot" element={<AddSlot />} />
            <Route path="/slots" element={<SlotList />} />
            <Route path="/park-vehicle" element={<ParkVehicle />} />
            <Route path="/remove-vehicle" element={<RemoveVehicle />} />
          </Routes>
        </main>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: '#10b981',
              },
            },
            error: {
              style: {
                background: '#ef4444',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;