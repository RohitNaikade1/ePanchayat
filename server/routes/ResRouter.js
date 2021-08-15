const express=require('express');
const Router=express.Router();
const { create,read, download,reject } = require('../controller/Residence');

Router.post('/create',create);

Router.get('/readApplicants',read);
Router.post('/reject',reject);
Router.post('/download',download);

module.exports=Router;