const express=require('express');
const Router=express.Router();
const { addData, readData } = require('../controller/prevCommittee.js');

Router.post('/addData',addData);

Router.get('/readData',readData);

module.exports=Router;