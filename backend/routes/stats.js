const express = require('express');
const router = express.Router();
const DistrictMonthlyStats = require('../models/stats');

// GET /districts
router.get('/districts', async (req, res) => {
  try {
    const districts = await DistrictMonthlyStats.distinct('district');
    res.json(districts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /stats/:district
router.get('/stats/:district', async (req, res) => {
  try {
    const stats = await DistrictMonthlyStats.findOne({ district: req.params.district }).sort({ year: -1, month: -1 });
    if (stats == null) {
      return res.status(404).json({ message: 'Cannot find stats for the specified district' });
    }
    res.json({
        "district": stats.district,
        "total_people_worked": stats.total_jobs.toLocaleString('en-IN'),
        "total_money_spent": `₹${stats.total_wages_paid.toLocaleString('en-IN')}`,
        "total_work_days": stats.total_person_days.toLocaleString('en-IN')
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /stats/history/:district
router.get('/stats/history/:district', async (req, res) => {
    const months = parseInt(req.query.months) || 6;
    try {
      const history = await DistrictMonthlyStats.find({ district: req.params.district })
        .sort({ year: -1, month: -1 })
        .limit(months);
      res.json(history);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
