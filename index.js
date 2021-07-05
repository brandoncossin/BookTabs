const express = require('express');
const axios = require('axios');
const app = express();
var cors = require('cors');
const cookieParser = require('cookie-parser')
const apiKey = "AIzaSyBm-Omi3o6U4tNvT445DyT-eH4suqeDYTs";
const mongoose = require('mongoose');

var corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  
};
app.use(cookieParser());
app.use(cors(corsOptions));

app.get('/', function(req, res){
    let param = req.query.book
    axios.get('https://www.googleapis.com/books/v1/volumes?q='+ param+'&key='+ apiKey+ '&maxResults=30')
    .then(function (response) {
        response = response.data;
        res.send(response);
    });
    //Same Site Set to none
    //Was Getting error messages from google 
    //so I just set them using cookie-parser
    res.cookie(SameSite = 'none' );
    
});

const PORT = process.env.PORT || 8080;
//app.listen(PORT);
app.listen(8080);