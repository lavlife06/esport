const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');

// Implementing cors
app.use(cors());

// connect to database
connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sampleData = [
  { name: 'Bhavesh', age: 20 },
  { name: 'Kirtan', age: 16 },
];

app.get('/api/name', (req, res) => {
  res.json(sampleData);
});

// Routes
app.use('/api/signup', require('./backend/router/signup'));
app.use('/api/login', require('./backend/router/login'));
// app.use('/api/profile', require('./router/profile'));
// app.use('/api/posts', require('./router/posts'));

const PORT = process.env.PORT || 3000;
// Start to listen the app
app.listen(PORT, () => {
  console.log('Listen to Port to 3000');
});
