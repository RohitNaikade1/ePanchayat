const express=require('express');
const multer=require('multer');
const shortid=require('shortid');
const path=require('path');
const Router=express.Router();
const { add,deleteScheme,view } = require('../controller/scheme');
Router.post('/add',add);

Router.get('/view',view);
Router.get('/view',view);
Router.post('/delete',deleteScheme);

module.exports=Router;