const express = require('express');
const axios = require('axios');
const app = express();
var cors = require('cors');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const keys = require('./config/keys')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
var corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,

};
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

//Allows mongodb connection
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
//Allows users to add book to List
//Finds book and Updates one
//First matches by uid
//Then adds to set to prevent duplicates
app.post('/api/add', async (req, res) => {
  console.log(req.body.book.volumeInfo);
  let profile = JSON.parse(atob(req.body.token.split('.')[1]))
  let uid = profile.uid
  console.log(uid)
  const dateWithTime = new Date();
  try {
    const response = await User.findOneAndUpdate(
      { 'uid': uid },
      {
        $addToSet: {
          myList:
          {
            _id: req.body.book.id,
            'bookId': req.body.book.id,
            'bookImage': req.body.book.volumeInfo.imageLinks.thumbnail,
            'bookTitle': req.body.book.volumeInfo.title,
            'bookAuthor': req.body.book.volumeInfo.authors[0],
          }
    
        }
      })  
    console.log('Added', response)
  }
  catch (error) {
    if (error.code === 11000) {
      //duplicate key
      console.log(error)
      return res.json({ status: 'error', error: 'Already in list' })
    }
    throw error;
  }
  res.json({ status: 'success', data: 'successfully added to' })

})
//Allows user to remove item in their list
app.post('/api/remove', async (req, res) => {
  let uid = req.body.uid
  try {
    const response = await User.updateOne(
      { uid: uid },
      {
        $pull: {
          myList:
          {
            'bookId': req.body.book.bookId,
          }
        }
      })
    console.log('Removed', response)
  }
  catch (error) {
    if (error.code === 11000) {
      //duplicate key
      console.log(error)
      return res.json({ status: 'error', error: '' })
    }
    throw error;
  }
  res.json({ status: 'success', data: 'successfully removed' })

})
//Allows user to login
app.post('/api/login', async (req, res) => {
  const { uid, pwd } = req.body;
  const user = await User.findOne({ uid }).lean()
  console.log(user)
  if (!user) {
    return res.json({ status: 'error', error: 'Invalid username' })
  }
  if (await bcrypt.compare(pwd, user.password)) {
    const token = jwt.sign({
      id: user._id,
      uid: user.uid
    }, keys.ACCESS_TOKEN_SECRET)
    console.log(token)
    return res.json({ status: 'ok', data: token });
  }
  res.json({ status: 'error', error: 'Invalid username/password' })
})

//Allows user to sign up
app.post('/api/signup', async (req, res) => {
  const { name, email, uid, pwd } = req.body;
  if (!uid || typeof uid !== 'string') {
    return res.json({ status: 'error', error: 'Invalid username' })
  }
  if (!pwd || typeof pwd !== 'string') {
    return res.json({ status: 'error', error: 'Invalid password' })
  }
  const password = await bcrypt.hash(pwd, 10);
  try {
    const response = await User.create({
      name,
      email,
      uid,
      password,
      
    })
    console.log('User created successfully:', response)
  } catch (error) {
    if (error.code === 11000) {
      //duplicate key
      console.log(error)
      return res.json({ status: 'error', error: 'Username or email already in use' })
    }
    throw error;
  }
  res.send({ status: 'success' })
})
//Checks authorization using JWT
//Checks the token matches the key
app.get('/authCheck', async (req, res) => {
  //let profile = JSON.parse(atob(req.query.token.split('.')[1]))
  console.log(req.query.token);
  try {
    jwt.verify(JSON.parse(req.query.token), keys.ACCESS_TOKEN_SECRET);
    return res.send({ status: 'success', data: "Welcome" });
  } catch (err) {
    return res.send({ status: 'error', error: 'Improper Token' });
  }
})
app.get('/', function (req, res) {
  let param = req.query.book
  axios.get('https://www.googleapis.com/books/v1/volumes?q=' + param + '&key=' + keys.apiKey + '&maxResults=30')
    .then(function (response) {
      response = response.data;
      res.send(response);
    });
  //Same Site Set to none
  //Was Getting error messages from google 
  //so I just set them using cookie-parser
  res.cookie(SameSite = 'none');

});

app.get('/profile', async (req, res) => {
  let profile = JSON.parse(atob(req.query.token.split('.')[1]))
  let uid = profile.uid
  const user = await User.findOne({ uid }).lean()
  res.send({ status: 'success', profile: user });
})
const PORT = process.env.PORT || 8080;
app.listen(PORT);