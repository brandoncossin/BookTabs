const express = require('express');
const axios = require('axios');
const app = express();
var cors = require('cors');
const apiKey = "AIzaSyBm-Omi3o6U4tNvT445DyT-eH4suqeDYTs";

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get('/', function(req, res){
    let param = req.query.book
    axios.get('https://www.googleapis.com/books/v1/volumes?q='+ param+'&key='+ apiKey+ '&maxResults=40')
    .then(function (response) {
        response = response.data;
        console.log(response);
        //console.log(response[0].volumeInfo);
        res.send(response);
    });
});
const PORT = process.env.PORT || 8080;
app.listen(PORT);