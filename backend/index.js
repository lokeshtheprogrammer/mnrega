const express = require('express');
const mongoose = require('mongoose');
const statsRouter = require('./routes/stats');
require('dotenv').config();
const cors = require("cors");
app.use(cors());



const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;

// ✅ Allow your Vercel Frontend to access this backend
app.use(cors({
  origin: "*", // or put your vercel link here for security later
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ If your API uses JSON body
app.use(express.json());

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api', statsRouter);

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
