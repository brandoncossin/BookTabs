const mongoose = require('mongoose');
//userSchema for MongoDb
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    uid: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    //Array of books that user has added to their list.
    //MongoDb will return this for the user on their profile
    myList: [
        
        {
        bookId: {type: String, required: true},
        bookImage: {type: String, required: true},
        bookTitle: {type: String, required: true},
        bookAuthor: {type: Array, required: true},
        bookInformation: {type: String, required: true},
        bookISBN10: {type: String, required: true},
        bookISBN13: {type: String, required: true},
        bookPreviewLink: {type: String, required: true},
    }]
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
module.exports = User