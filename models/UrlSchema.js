const mongoose = require('mongoose')

const UrlSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    name: String,
    date: {
        type: String,
        default: Date.now()
    }
})

module.exports = mongoose.model('Url', UrlSchema);