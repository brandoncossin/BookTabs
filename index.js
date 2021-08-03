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
  let profile = JSON.parse(atob(req.body.token.split('.')[1]))
  let uid = profile.uid
  console.log(req.body.book.bookImage)
  try {
    const response = await User.findOneAndUpdate(
      { 'uid': uid },
      {
        $addToSet: {
          myList:
          {
            _id: req.body.book.bookId,
            'bookId': req.body.book.bookId,
            'bookImage': req.body.book.bookImage,
            'bookTitle': req.body.book.bookTitle,
            'bookAuthor': req.body.book.bookAuthor,
            'bookInformation': req.body.book.bookInformation,
            'bookISBN10' : req.body.book.bookISBN10,
            'bookISBN13' : req.body.book.bookISBN13,
            'bookPreviewLink': req.body.book.bookPreviewLink
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
  console.log(req.query.token, "authChecked");
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
      response.data.items.forEach(function(data) {
        data['bookId'] = data['id'];
        data['bookImage'] = data.volumeInfo['imageLinks'] === undefined ? "" : data.volumeInfo.imageLinks['thumbnail'] 
        data['bookTitle'] = data.volumeInfo['title'];
        data['bookAuthor'] = data.volumeInfo['authors'] === undefined ? [] :  data.volumeInfo.authors;
        data['bookInformation'] = data.volumeInfo['description'];
        if (data.volumeInfo['industryIdentifiers'] === undefined){
          data['bookISBN10'] = "" ;
          data['bookISBN13'] = "" 
        }  
        else{
          data['bookISBN10'] = data.volumeInfo.industryIdentifiers[1] === undefined ? "" :  
          data.volumeInfo.industryIdentifiers[1]['identifier'];
          data['bookISBN13'] = data.volumeInfo.industryIdentifiers[0] === undefined ? "" :  
          data.volumeInfo.industryIdentifiers[0]['identifier'];
        } 
        data['bookPreviewLink'] = data.volumeInfo['previewLink'];
        //destructures everything not needed
        delete data['kind'];
        delete data['volumeInfo'];
        delete data['saleInfo'];
        delete data['accessInfo'];
        delete data['searchInfo'];
        //console.log(data.bookAuthor)
      });
      console.log(response);
      res.send(response.data);
    });
  //Same Site Set to none
  //Was Getting error messages from google 
  //so I just set them using cookie-parser
  res.cookie(SameSite = 'none');

});

app.get('/profile', async (req, res) => {
  console.log(req.query.token);
  const base64String = req.query.token.split('.')[1];
  let profile = JSON.parse(Buffer.from(base64String,
    'base64').toString('ascii'));
  let uid = profile.uid
  const user = await User.findOne({ uid }).lean()
  res.send({ status: 'success', profile: user });
})
const PORT = process.env.PORT || 8080;
app.listen(PORT);