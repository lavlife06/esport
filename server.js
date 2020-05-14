const express = require('express');
const bodyParser = require('body-parser') ;
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI,{ useNewUrlParser: true, useUnifiedTopology: true  });

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(passport.initialize());
// app.use(passport.session());

const sampleData = [
  {name: 'Bhavesh', age: 20},
  {name: 'Kirtan', age: 16}
]

app.get('/api/name', (req, res) =>{
  res.send(sampleData)
});

// require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
  console.log('Listen to Port to 3000')
})