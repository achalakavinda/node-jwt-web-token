//npm modules import
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//api configurations
const app = express();
dotenv.config();
app.use(express.json());


//api variables
const uri = process.env.MONGODB_URI;
const authRoute = require('./routes/auth');
const sampleRoute = require('./routes/sample');

//mongo db connector
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true },(c)=>{
    console.log('connect to db')
});


//api routes
app.use('/',sampleRoute);
app.use('/api/user',authRoute);

app.listen(process.env.API_PORT, (value) => {
    console.log('up and running'+'Port:'+process.env.API_PORT);
});
