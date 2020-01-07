var mongoose = require('mongoose');
const User = require("./user");
var Schema = mongoose.Schema;

var PostsModelSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: User
  },
  textString: {
    type: String,
    required: true
  },
  postCreatedDate: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  },
  numberOfComments: {
    type: Number,
    default: 0
  },
  comments: [{
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
    }
  }]
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('PostsModel', PostsModelSchema);