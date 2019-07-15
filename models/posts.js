// posts mongo model

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var PostsModelSchema = new Schema({
  postCreator: String,
  postCreatedDate: Date,
  likes: Number,
  comments: Array
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('PostsModel', PostsModelSchema);