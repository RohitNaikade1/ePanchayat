const express=require('express');
const Router=express.Router();
const { send } = require('../controller/notify');

Router.post('/send',send);

module.exports=Router;