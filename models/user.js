// user mongo model
//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
    name: String,
    email: String,
    password: String,
    posts: Array,
    skills: Array,
    userCreationDate: Date,
});

//Export function to create "userModel" model class
module.exports = mongoose.model('UserModel', UserModelSchema);