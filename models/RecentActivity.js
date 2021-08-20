const mongoose = require('mongoose');
//Activity Schema for MongoDb
const recentActivitySchema = new mongoose.Schema({
    //Array of recent activity
    //When user adds to list or likes a book
    //That action is pushed inside that function for a push to this array
        uid: {type: String, required: true},
        bookId: {type: String, required: true},
        bookTitle: {type: String, required: true},
        bookActivity: {type: String, required: true},
        activityLocation: {type: String, required: false},
}, {timestamps: true})

const RecentActivity = mongoose.model('RecentActivity', recentActivitySchema)
module.exports = RecentActivity