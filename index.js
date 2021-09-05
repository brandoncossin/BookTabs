const express = require('express');
const axios = require('axios');
const app = express();
var cors = require('cors');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const keys = require('./config/keys')
const User = require('./models/User.js')
const RecentActivity = require('./models/RecentActivity.js')
const jwt = require('jsonwebtoken')
const path = require('path')

var corsOptions = {
  credentials: true,
  //origin: "https://serene-spire-91674.herokuapp.com",
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
//sends the recent 12 activities done by users
app.get('/recentActivity', async (req, res) => {
  try{
    const response = await RecentActivity.find().sort({_id: -1}).limit(12);
    res.send({status: 'success', data: response});
  }
  catch(error){
    console(error);
    res.send({status: 'error', data: error})
  }
})
//Book Routes
app.use('/', require('./routes/BookSearch.js'));
app.use('/authorBook', require('./routes/BookSearch.js'));
app.use('/book', require('./routes/BookSearch.js'));

//Allows users to add book to List
//Finds book and Updates one
//First matches by uid
//Then adds to set to prevent duplicates

app.post('/api/add', async (req, res) => {
  const base64String = req.body.token.split('.')[1];
  let profile = JSON.parse(Buffer.from(req.body.token.split('.')[1], 
    'base64').toString('ascii'));
  let uid = profile.uid
 
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
      //adds book to recent activities 
    const user=new RecentActivity({
    uid: uid, 
    bookId: req.body.book.bookId, 
    bookTitle: req.body.book.bookTitle, 
    bookActivity: ' added ',
    activityLocation: ' to their list'});
  await user.save(function(err, data){
    if(err) return console.log(err);
  });
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
app.post('/api/like', async (req, res) => {
  let profile = JSON.parse(Buffer.from(req.body.token.split('.')[1], 
    'base64').toString('ascii'));
  let uid = profile.uid
 
  try {
    const response = await User.findOneAndUpdate(
      { 'uid': uid },
      {
        $addToSet: {
          likedList:
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
      //adds book to recent activities 
    const user=new RecentActivity({
    uid: uid, 
    bookId: req.body.book.bookId, 
    bookTitle: req.body.book.bookTitle, 
    bookActivity: ' liked ',
    activityLocation: ''});
  await user.save(function(err, data){
    if(err) return console.log(err);
  });
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
  const base64String = req.body.token.split('.')[1];
  let profile = JSON.parse(Buffer.from(base64String, 
    'base64').toString('ascii'));  
  let uid = profile.uid; 
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
//Allows user to unlike a book in their list
app.post('/api/unlike', async (req, res) => {
  const base64String = req.body.token.split('.')[1];
  let profile = JSON.parse(Buffer.from(base64String, 
    'base64').toString('ascii'));  
  let uid = profile.uid; 
  try {
    const response = await User.updateOne(
      { uid: uid },
      {
        $pull: {
          likedList:
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
  res.json({ status: 'success', data: 'successfully unliked' })

})
//Allows user to login
app.post('/api/login', async (req, res) => {
  const { uid, pwd } = req.body;
  const user = await User.findOne({ uid }).lean()
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
  if (name.length < 6 ) {
    return res.json({ status: 'error',
     error: 'Name must be at least 6 characters long' })
  }
  if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
    return res.json({ status: 'error',
    error: 'Email must be real' })
  }
  if (pwd.length < 6 || (!/\d/.test(pwd))) {
    return res.json({ status: 'error',
     error: 'Password must be at least 6 characters long and contain a number' })
  }
  const password = await bcrypt.hash(pwd, 10);
  var dateObject = new Date();
  var date = dateObject.getDate();
  var month = (dateObject.getMonth() + 1);
  var year = dateObject.getFullYear();
  let dateCreated = `${month}/${date}/${year}`;  
  try {
    const response = await User.create({
      name,
      email,
      uid,
      password,
      dateCreated,
    })
    //adds user to recent activities
    const user=new RecentActivity({
      uid: uid,  
      bookActivity: ' created an account',});
    await user.save(function(err, data){
      if(err) return console.log(err);
    });
  } catch (error) {
    if (error.code === 11000) {
      //duplicate key
      console.log(error)
      return res.json({ status: 'error', error: 'Username or email already in use' })
    }
    throw error;
  }
  return res.send({ status: 'success', response: "accounted created" })
})
//Checks authorization using JWT
//Checks the token matches the key
//Also sends book lists if it works
app.get('/authCheck', async (req, res) => {
  try {
    jwt.verify(JSON.parse(req.query.token), keys.ACCESS_TOKEN_SECRET);
    let profile = JSON.parse(Buffer.from(req.query.token.split('.')[1], 
      'base64').toString('ascii'));
      let uid = profile.uid
    try{
      const response = await User.findOne({ uid }, {myList: {bookId: 1} , likedList: {bookId: 1}});
      console.log(response.likedList, response.myList, "authChecked");
      return res.send({ status: 'success', userMyList: response.myList, userLikedList: response.likedList});
    }
    catch(error){
      return res.send({status: 'error', error: 'no user'})
    }
  } catch (err) {
    return res.send({ status: 'error', error: 'Improper Token' });
  }
})

//pre-check for deletion
app.get('/deleteCheck', async (req, res) => {
  
  try {
    jwt.verify(JSON.parse(req.query.token), keys.ACCESS_TOKEN_SECRET);
    let profile = JSON.parse(Buffer.from(req.query.token.split('.')[1], 
      'base64').toString('ascii'));
      let uid = profile.uid
    try{
      const response = await User.findOne({ uid }, {"uid": 1, "name": 1});
      console.log(response, "authChecked");
      return res.send({ status: 'success', uid: response.uid});
    }
    catch(error){
      return res.send({status: 'error', error: 'no user'})
    }
  } catch (err) {
    return res.send({ status: 'error', error: 'Improper Token' });
  }
})
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//destroys users account from the MongoDb
app.post('/api/destroy', async (req, res) => {
  const {token, uid, pwd } = req.body;
  try {
    jwt.verify(JSON.parse(token), keys.ACCESS_TOKEN_SECRET);
    let profile = JSON.parse(Buffer.from(token.split('.')[1], 
      'base64').toString('ascii'));
      if(uid != profile.uid){
        return res.send({ status: 'error', error: 'Improper Token' });
      }   
    try{
      const user = await User.findOne({ uid }).lean()
      if (!user) {
        return res.json({ status: 'error', error: 'Invalid username' })
      }
      if (await bcrypt.compare(pwd, user.password)) {
      const response = await User.findOneAndDelete({uid: uid});
      console.log(response, "authChecked");
      return res.send({ status: 'success', response: response});
      }
      else{
        console.log("wrong pw")
        return res.send({ status: 'error', error: "Wrong Password"});
      }
    }
    catch(error){
      return res.send({status: 'error', error: 'no user'})
    }
  } catch (err) {
    return res.send({ status: 'error', error: 'Improper Token' });
  }
})
//gets profile page for logged in user
//This uses JWT token
app.get('/profile', async (req, res) => {
  console.log(req.query.token);
  const base64String = req.query.token.split('.')[1];
  let profile = JSON.parse(Buffer.from(base64String, 
    'base64').toString('ascii'));  
  let uid = profile.uid;
  const user = await User.findOne({ uid }).lean()
  res.send({ status: 'success', profile: user });
})
//Middleware? Will it work I hope so
//Gets user information for account
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  
}

//Gets user information for account
if(process.env.NODE_ENV === 'production'){
  const path = require('path');
  app.get("*", function(request, response){
    response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html' ))
  })
}

const PORT = process.env.PORT || 8080;
app.listen(PORT);