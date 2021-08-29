const validUrl = require('valid-url')
const shortId = require('short-id')
require('dotenv').config()
const Url = require('../models/UrlSchema')
const baseUrl = process.env.API_URL;

module.exports = {
    postUrl: async (req, res) => {
        const {longUrl, name} = req.body
        if (!validUrl.isUri(baseUrl)) {
            return res.status(401).json('invalid base url');
        }
        const urlCode = shortId.generate()
        if (validUrl.isUri(longUrl)) {
            try {
                let url = await Url.findOne({longUrl})
                if (url) {
                    res.json(url)
                } else {
                    const shortUrl = baseUrl + "/" + name

                    url = new Url({
                        longUrl,
                        shortUrl,
                        urlCode,
                        name,
                        date: new Date()
                    })

                    await url.save()
                    res.status(201).json(url)
                }
            } catch (error) {
                console.log(error);
                res.status(500).json('Server Error')
            }
        }
    },
    getUrl: async (req, res) => {
        try {
            const url = await Url.findOne({name: req.params.code})
            if (url) {
                res.redirect(url.longUrl)
            } else {
                res.status(404).json("Url Not Found")
            }
        } catch (error) {
            console.log(error);
            res.status(501).json('Server Error')
        }
    },
    deleteUrl: async (req, res) => {
        try {
            await Url.deleteOne({ urlCode: req.params.code });
            res.status(200).json('URL Deleted')
        } catch (error) {
            console.log(error);
            res.status(501).json('server error')
        }

    },
    getAllUrl: async (req, res) => {
        try {
            const url = await Url.find({})
            res.status(200).json(url)
        } catch (error) {
            console.log(error);
            res.status(500).json("server error")
        }
    }
}