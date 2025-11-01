const express = require('express');
const mongoose = require('mongoose');
const statsRouter = require('./routes/stats');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api', statsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
