const express=require('express');
const Router=express.Router();
const { create,approve,readData,reject,remove } = require('../controller/revenue');

Router.post('/create',create);

Router.post('/approve',approve);

Router.post('/reject',reject);

Router.post('/remove',remove);

Router.get('/readData',readData);

module.exports=Router;