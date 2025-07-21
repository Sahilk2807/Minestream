const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const adminAuth = require('../middleware/auth');

router.get('/movies', movieController.getAllContent);
router.get('/movies/:id', movieController.getContentById);
router.get('/search', movieController.searchContent);

router.get('/tmdb/fetch', adminAuth, movieController.fetchTMDb);

router.post('/add', adminAuth, movieController.addContent);
router.put('/update/:id', adminAuth, movieController.updateContent);
router.delete('/delete/:id', adminAuth, movieController.deleteContent);

module.exports = router;