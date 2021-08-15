const express=require('express');
const Router=express.Router();
const { addData, readData } = require('../controller/currCommittee.js');

Router.post('/addData',addData);

Router.get('/readData',readData);

module.exports=Router;