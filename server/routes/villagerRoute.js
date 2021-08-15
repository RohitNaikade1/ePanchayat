const express=require('express');
const Router=express.Router();
const { deleteRecord,addRecord } = require('../controller/villager');

Router.post('/addRecord',addRecord);

Router.post('/deleteRecord',deleteRecord);

module.exports=Router;