const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const axios = require('axios');
require('dotenv').config()

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://HUMAYUNTRADERS:Zhmi32pkpOyjAWkk@cluster0.tdvw5wt.mongodb.net/HumayunDB?retryWrites=true&w=majority`;

mongoose.connect(uri, {
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(`Error connecting to MongoDB: ${err}`);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

const dealerCollection = mongoose.model('dealerCollection', new mongoose.Schema({}, { strict: false }));


// --------------------------------------localApi-------------------------------------------

app.get('/', (req, res) => {
  res.send('Humayur traders server running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});