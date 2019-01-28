const express = require('express');
const morgan = require('morgan');
const bodyParser =require('body-parser');
const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
mongoose.Promise = global.Promise;

const app =express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Routes
app.use('/user',require('./routes/user'));
//Start server
const port = process.env.PORT || 5000;
app.listen(port);

mongoose.connect('mongodb://localhost:27017/APIAuthentication',{ useNewUrlParser: true });
console.log('Server LIstening at port ='+port); 
