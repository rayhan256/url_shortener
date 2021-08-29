const mongoose = require("mongoose");
require('dotenv').config()

const DB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/urlShortener";

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection

module.exports = connection