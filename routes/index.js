const express = require('express');
const router =  express.Router();
const controller = require('../controllers/home_controller');
router.get('/',controller.home);
router.use('/user',require('./user'))
router.use('/post',require('./post'));
router.use('/comment',require('./comment'));
router.use('/like',require('./like'));
router.use('/friend',require('./friend'));
module.exports = router;