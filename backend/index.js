const express = require('express');
const mongoose = require('mongoose');
const statsRouter = require('./routes/stats');
const cors = require('cors');   // <--- Add this
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;

// Allow requests from your frontend
app.use(cors({
  origin: '*', // Or replace '*' with your vercel URL for security
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api', statsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
