const express = require('express');
const route = express.Router();
const controller = require('../contollers/contoller');
const multer = require('../config/multerConfig')

route.get('/',controller.defaultController);
route.get('/viewData',controller.viewData)
route.post('/addData',multer.single('image'),controller.addData);
route.get('/edit/:id', controller.editContoller);
route.post('/updateContoller/:id', multer.single('image') , controller.updateContoller)
route.get('/delete/:id', controller.deleteContoller);

module.exports = route;
