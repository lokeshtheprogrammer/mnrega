const mongoose = require('mongoose');
const DistrictMonthlyStats = require('../models/stats');
const mockData = require('./mock-data.json');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    populateDatabase();
  })
  .catch(err => console.log(err));

const populateDatabase = async () => {
  try {
    await DistrictMonthlyStats.deleteMany({});
    console.log('Existing data cleared');

    await DistrictMonthlyStats.insertMany(mockData);
    console.log('Database populated with mock data');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error populating database:', error);
    mongoose.connection.close();
  }
};
