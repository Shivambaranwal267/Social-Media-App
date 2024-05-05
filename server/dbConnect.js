const mongoose = require("mongoose");

const mongoUri = 'mongodb+srv://shivambaranwal267:6OTUulE2BYMknpdl@cluster0.ta0ivbf.mongodb.net/?retryWrites=true&w=majority';

const connectdb = async () => {
  try {
    const connect = await mongoose.connect(mongoUri);

    console.log(`DB connected: ${connect.connection.host}`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

module.exports = connectdb;
