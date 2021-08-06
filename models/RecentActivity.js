const mongoose = require('mongoose');
//Activity Schema for MongoDb
const recentActivitySchema = new mongoose.Schema({
    //Array of recent activity
    //When user adds to list or likes a book
    //That action is pushed inside that function for a push to this array
   RecentActivity: [ 
        {
        uid: {type: String, required: true},
        bookId: {type: String, required: true},
        bookImage: {type: String, required: true},
        bookActivity: {type: String, required: true},
    }]
}, {timestamps: true})

const RecentActivity = mongoose.model('RecentActivity', recentActivitySchema)
module.exports = RecentActivity