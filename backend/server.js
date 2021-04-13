const express = require('express');

const cors = require('cors');

const mongoose = require('mongoose');

const requireDir = require('require-dir');

const app = express();
// a partir da rota post incluída
app.use(express.json());

app.use(cors());

mongoose.connect('mongodb://localhost:27017/projetozeus', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

requireDir('./src/models');

app.use('/api', require('./src/routes'));

// app.get('/', (req, res) => {
//   res.send('Hello, World');
// })

app.listen(3001);