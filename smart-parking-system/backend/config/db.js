const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // For MongoDB 8.x - No options needed
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`✅ MongoDB 8.x Connected Successfully!`);
    console.log(`📊 Host: ${conn.connection.host}`);
    console.log(`📁 Database: ${conn.connection.name}`);
    
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log('\n💡 Troubleshooting Tips:');
    console.log('1. Check if MongoDB is running: mongosh');
    console.log('2. Check .env file MONGODB_URI');
    console.log('3. Windows: Run CMD as Administrator');
    console.log('4. Command: mongod --dbpath "C:\\data\\db"');
    
    process.exit(1);
  }
};

module.exports = connectDB;