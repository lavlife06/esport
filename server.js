const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport')
const connectDB = require('./config/db');
require('./backend/services/passport')
const app = express();

// Implementing cors
app.use(cors());

// connect to database
connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

const sampleData = [
  { name: 'Bhavesh', age: 20 },
  { name: 'Kirtan', age: 16 },
];

app.get('/api/name', (req, res) => {
  res.json(sampleData);
});

require('./backend/routes/authRoutes/signup')(app)
require('./backend/routes/authRoutes/login')(app)
require('./backend/routes/authRoutes/googleAuth')(app)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Listen to Port to 3000');
});
