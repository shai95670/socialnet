const mongoose = require("mongoose");
const User = require("./user");

//Define a schema
const Schema = mongoose.Schema;

const profileModelSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: User
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  jobttitle: {
    type: String,
    required: false
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  skills: {
    type: [String],
    require: true
  },
  experience: [{
    title: {
      type: String,
      required: false
    },
    company: {
      type: String,
      required: false
    },
    location: {
      type: String
    },
    from: {
      type: Date,
      required: false
    },
    to: {
      type: String
    },
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String
    }
  }],
  education: [{
    school: {
      type: String,
      required: false
    },
    degree: {
      type: String,
      required: false
    },
    fieldofstudy: {
      type: String,
      required: false
    },
    from: {
      type: Date,
      required: false
    },
    to: {
      type: String
    },
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String
    }
  }],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkdin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

//Export function to create "userModel" model class
module.exports = mongoose.model("ProfileModel", profileModelSchema);