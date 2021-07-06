const express = require('express');
const axios = require('axios');
const app = express();
var cors = require('cors');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const keys = require('./config/keys')

var corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  
};
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
/*
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true});
const db = mongoose.connection;

debug.on('error', error => console.error(error))
debug.once('opnn', error => console.log('Connected to Mongoose'));
*/
app.post('/api/login', function(req, res){
  let user = req.body
  console.log(user);
  res.send({requestBody: req.body.uid})
})

app.post('/api/signup', function(req, res){
  let user = req.body
  console.log(user);
  res.send({requestBody: req.body.uid})
})


app.get('/', function(req, res){
    let param = req.query.book
    axios.get('https://www.googleapis.com/books/v1/volumes?q='+ param+'&key='+ keys.apiKey+ '&maxResults=30')
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
app.listen(PORT);