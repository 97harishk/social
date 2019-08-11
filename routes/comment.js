const express = require('express');
const router =  express.Router();
const commentController = require('../controllers/comment_controller');
router.post('/create',commentController.create);
router.get('/destroy/:id',commentController.destroy);

module.exports = router;