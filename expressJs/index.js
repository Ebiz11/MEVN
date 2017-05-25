const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

// body parser json
app.use(bodyParser.json());

// cors
app.use(cors());

// router
app.use('/api',require('./routes/api'));

// error status
app.use(function(err, req, res, next){
  res.status(422).send({error: err.message});
})

// listen
app.listen(process.env.port || 4000, function(){
  console.log('Now listening for request');
})
