var express = require('express');
const { postUrl, getUrl, deleteUrl, getAllUrl } = require('../controllers/url');
var router = express.Router();

router.get('/allUrl', getAllUrl)
router.post('/setUrl', postUrl)
router.get('/:code', getUrl)
router.get('/delete/:code', deleteUrl)

module.exports = router;
