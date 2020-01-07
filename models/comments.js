const mongoose = require('mongoose');
const User = require("./user");
const Schema = mongoose.Schema;

const CommentsModelSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    commentCreationDate: {
        type: Date,
        default: Date.now
    },
    textString: {
        type: String,
        required: true
    },
});

//Export function to create "userModel" model class
module.exports = mongoose.model('CommentsModel', CommentsModelSchema);