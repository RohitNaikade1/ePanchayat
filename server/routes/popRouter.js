const express=require('express');
const Router=express.Router();
const { addRecord, fetchRecord } = require('../controller/population');

Router.post('/add',addRecord);

Router.get('/fetch',fetchRecord);

module.exports=Router;