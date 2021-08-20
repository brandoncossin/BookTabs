const keys = require('../config/keys')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
module.exports = app => {
  //Allows user to add items to their "List"
  app.post('/api/add', async (req, res) => {
    console.log(req.body.book.volumeInfo.title);
    const base64String = req.body.token.split('.')[1];
    let profile = JSON.parse(Buffer.from(base64String, 
      'base64').toString('ascii'));    let uid = profile.uid
    try {
      const response = await User.updateOne(
        { uid: uid },
        {
          $push: {
            myList:
            {
              'bookId': req.body.book.id,
              'bookImage': req.body.book.volumeInfo.imageLinks.thumbnail,
              'bookTitle': req.body.book.volumeInfo.title
            }

          }
        })
    }
    catch (error) {
      if (error.code === 11000) {
        //duplicate key
        console.log(error)
        return res.json({ status: 'error', error: '' })
      }
      throw error;
    }
    res.json({ status: 'success', data: 'successfully added to' })

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
        password
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
};