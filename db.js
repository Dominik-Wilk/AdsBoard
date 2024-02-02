const mongoose = require('mongoose');
require('dotenv').config();

const connectToDB = () => {
  mongoose.connect(
    `mongodb+srv://mrwilkd:${process.env.SECRET_DB}@cluster0.lhv8unr.mongodb.net/AdsBoardDB?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

module.exports = connectToDB;
