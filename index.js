'use strict'

const { mongo } = require('mongoose')

const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
const mongoose = require('./Database')
const port = (process.env.PORT || 8000)

const http = require('http')
const server = http.createServer(app)



//Settings
app.set('port',port)

//middlewares
app.use(morgan('tiny'));
app.use(express.urlencoded({extended:false}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use(express.json())
app.use('/api/devices/soundmeters', require('./Routes/DevicesSoundMeters'))

app.use(express.static(path.join(__dirname, 'public')));


app.get('/icgSound/realTime', (req, res) => {
    res.sendFile(__dirname + '/public/realTime.html');
});



server.listen(app.get('port'), function(){
    console.log("✅ My https server listening on port " + app.get('port') + "...");
  });
