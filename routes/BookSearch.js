const express = require('express');
const router = express.Router();
const axios = require('axios');
const keys = require('../config/keys')
//All Books
router.get('/', function (req, res) {
  //Sends back books based on the title search request
  //Cleans up the products returned
  let param = req.query.book
  console.log(param)
  if(req.query.userId){
    console.log(req.query.userId)
  }
  //performance query limits what is being sent back.
  axios.get('https://www.googleapis.com/books/v1/volumes?q=' + param + '&key=' + keys.apiKey + 
  '&maxResults=30&fields=kind,items(id, volumeInfo/*)')
    .then(function (response) {
      response.data.items.forEach(function(data) {
        //console.log(data);
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
        data['bookPageCount'] = data.volumeInfo['pageCount'];
      });
      res.send(response.data);
    });
  //Same Site Set to none
  //Was Getting error messages from google 
  //so I just set them using cookie-parser
  res.cookie(SameSite = 'none');

});

//All Books under author
router.get('/authorBook', function (req, res) {
  //Sends back books based on the title search request
  //Cleans up the products returned
  let param = req.query.author
  console.log(param);
  //performance query limits what is being sent back.
  axios.get('https://www.googleapis.com/books/v1/volumes?q=inauthor:' + param + '&key=' + keys.apiKey + 
  '&maxResults=30&fields=kind,items(id, volumeInfo/*)')
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
        data['bookPageCount'] = data.volumeInfo['pageCount'];
      });
      res.send(response.data);
    });
  //Same Site Set to none
  //Was Getting error messages from google 
  //so I just set them using cookie-parser
  res.cookie(SameSite = 'none');

});
//Returns single book information
router.get('/book', function (req, res) {
  let param = req.query.id;
  console.log(param)
  axios.get('https://www.googleapis.com/books/v1/volumes/' + param + '?key=' + keys.apiKey)
    .then(function (response) {
        const data = response.data;
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
        data['bookPageCount'] = data.volumeInfo['pageCount'];
      res.send(response.data);
    });
  res.cookie(SameSite = 'none');
});
  module.exports = router;