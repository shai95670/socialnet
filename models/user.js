const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hash: String,
    avatar: {
        type: String
    },
    userCreationDate: {
        type: Date,
        default: Date.now
    }
});

//Export function to create "userModel" model class
module.exports = mongoose.model('UserModel', UserModelSchema);