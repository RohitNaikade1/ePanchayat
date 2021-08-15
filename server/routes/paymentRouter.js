const express=require("express");
const Router=express.Router();
const { razorpay,verification,read } = require('../controller/payment');

Router.post('/razorpay',razorpay);
Router.post('/verification',verification);
Router.get('/read',read);


module.exports=Router;