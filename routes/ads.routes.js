const express = require('express');
const router = express.Router();
const imageUpload = require('../utils/imageUpload');
const authMiddleware = require('../utils/authMiddleware');
const authorMiddleware = require('../utils/authorMiddleware');
const ads = require('../controllers/ads.controller');

router.get('/ads', ads.getAll);
router.get('/ads/:id', ads.getAdById);
router.post('/ads', imageUpload.single('image'), ads.addNewAd);
router.put('/ads/:id', authorMiddleware, imageUpload.single('img'), ads.editAd);
router.delete('/ads/:id', ads.deleteAd);
router.get('/ads/search/:searchPhrase', ads.search);

module.exports = router;
