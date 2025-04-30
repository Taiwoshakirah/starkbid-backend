import express from 'express';
import config from './config/config';
import mongoConnect from './config/mongo-connector';
// Import dotenv at the very top
import dotenv from 'dotenv';

// Load environment variables BEFORE any other code runs
dotenv.config();

// For debugging - remove in production
// console.log('MONGO_URI:', process.env.MONGO_URI);

const app = express();
app.use(express.json());

import transactionRoute from './routes/transactionRoute';

// Use the router properly
app.use('/api/transactions', transactionRoute);

// Add a basic root route
app.get('/', (req, res) => {
  res.send('API is running');
});

async function startServer() {
  try {
    // Properly await MongoDB connection
    await mongoConnect();
    
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
}

startServer();