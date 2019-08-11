const express = require('express');
const router =  express.Router();
const passport = require('passport');

const controller = require('../controllers/user_controller');
router.get('/sign-in',controller.signIn);
router.get('/sign-up',controller.signUp);
router.get('/log-out',controller.logOut);
router.get('/profile/:id', passport.checkAuthentication,controller.profile);
router.post('/create',controller.create);
router.post('/update/:id',passport.checkAuthentication,controller.update);
router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect: '/user/sign-in'},
),controller.createSession);
module.exports = router;