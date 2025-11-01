const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');   // ✅ Add CORS
const statsRouter = require('./routes/stats');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;

// ✅ CORS FIX — Allow Frontend Domain
app.use(cors({
  origin: [
    "https://mnrega-gy3cw6ba8-lokeshs-projects-c10d1959.vercel.app", // Production Frontend
    "http://localhost:5173" // Local Development
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

// Parse JSON (if needed)
app.use(express.json());

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB Connection Error:', err));

app.use('/api', statsRouter);

app.listen(port, () => {
  console.log(`🚀 Server Running on Port: ${port}`);
});
