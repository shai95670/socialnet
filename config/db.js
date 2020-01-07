const mongoose = require('mongoose');
const config = require('config');
const dbUri = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('mongo db is connected!');
  } catch (error) {
    console.error(error.message);
    // exit proccess with failiure
    process.exit(1);
  }
}

module.exports = connectDB;