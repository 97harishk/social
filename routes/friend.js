const express = require('express');
const router = express.Router();
const controller  = require('../controllers/friend_controller');
router.get('/toggle/:id',controller.toggleFriend);

module.exports = router;
