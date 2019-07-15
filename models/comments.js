// user mongo model
//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const CommentsModelSchema = new Schema({
    creator: String,
    datePosted: Date,
    commentString: String
});

//Export function to create "userModel" model class
module.exports = mongoose.model('CommentsModel', CommentsModelSchema);