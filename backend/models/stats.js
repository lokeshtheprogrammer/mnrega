const mongoose = require('mongoose');

const districtMonthlyStatsSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  total_jobs: {
    type: Number,
    required: true,
  },
  total_person_days: {
    type: Number,
    required: true,
  },
  total_wages_paid: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('DistrictMonthlyStats', districtMonthlyStatsSchema);
