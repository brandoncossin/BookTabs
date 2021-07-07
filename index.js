const express = require('express');
const axios = require('axios');
const app = express();
var cors = require('cors');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const keys = require('./config/keys')
const User = require('./models/User')

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

app.post('/api/login', async(req, res) => {
  let user = req.body
  console.log(user);
  const{uid, pwd} = req.body
  console.log(await bcrypt.hash(pwd, 10))
  res.send({requestBody: req.body.uid})
})

app.post('/api/signup', async(req, res) =>{
  const{name, email, uid, pwd} = req.body;
  if(!uid || typeof uid !== 'string'){
    return res.json({status: 'error', error: 'Invalid username'})
  }
  if(!pwd || typeof pwd !== 'string'){
    return res.json({status: 'error', error: 'Invalid password'})
  }
  const password = await bcrypt.hash(pwd, 10);
  try{
    const response = await User.create({
      name, 
      email, 
      uid, 
      password})
      console.log('User created successfully:', response)
  }catch(error){
    if(error.code === 11000){
      //duplicate key
      return res.json({status: 'error', error: 'Username or email already in use'})
    }
    throw error;
  }
  res.send({status: 'success'})
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