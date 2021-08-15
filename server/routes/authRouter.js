const express=require('express');
const Router=express.Router();
const { signup, signin,activate,forgotPassword,resetPassword,google,facebook } = require('../controller/auth');

Router.post('/signup',signup);

Router.post('/activate',activate);

Router.post('/login',signin);

Router.post('/forgotPassword',forgotPassword);
Router.post('/resetPassword',resetPassword);
Router.post('/googleLogin',google);
Router.post('/facebookLogin',facebook);

Router.post('/signin',signin);

module.exports=Router;