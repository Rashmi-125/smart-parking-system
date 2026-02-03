const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: '🚗 Smart Parking Lot System API',
    version: '1.0.0',
    mongodb: 'Version 8.x',
    endpoints: {
      slots: '/api/slots',
      park: '/api/slots/park',
      remove: '/api/slots/remove'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: '✅ OK',
    database: 'Connected',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/slots', require('./routes/slotRoutes'));

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
  console.log(`🌐 Open: http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});