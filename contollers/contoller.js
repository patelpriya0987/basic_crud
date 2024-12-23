const productModel = require('../models/productModel');
const path = require('path');
const fs = require('fs')
const defaultController = (req,res) => {
    console.log("Home page");
    res.render('index');
}
const viewData = async(req,res) => {
    const data = await productModel.find({});
    console.log("data >",data);
    res.render('view',{data});
}
const addData = (req,res)=> {
    console.log("add data",req.body,req.file);
    const {title, price, description} = req.body;
    const data = new productModel({
        title,price,description,image : req.file ? req.file.path : null,
    });
    data.save();
    console.log("data >>", data);
    
    res.redirect('/');
}
const editContoller = async(req,res) => {
    const data = await productModel.findOne({_id : req.params.id});
    console.log("data",data);
    
    res.render('edit',{data});
}
const updateContoller = async(req,res) => {
    console.log("id",req.params.id,req.body);
    const data = await productModel.findOne({ _id: req.params.id });
    const {title, price, description} = req.body;
    console.log("data",data);
    
    data.title = title;
    data.price = price;
    data.description = description;
    if(req.file){
        const oldPost = path.join(__dirname,'../',data.image);
        fs.unlink(oldPost,(err)=>{
            if(err){
                console.error('Error while deleting old poster:', err);
            }
        })
        data.image = req.file.path;
    }
    await data.save();
    console.log("record edited >",data);

    res.redirect('/viewData')
}
const deleteContoller = async(req,res) => {
    console.log("id",req.params.id);

    const data = await productModel.findByIdAndDelete(req.params.id);
    if(data && data.image){
        const img = path.join(__dirname,'../',data.image);
        fs.unlink(img,(err)=>{
            if(err){
                console.error('Error while deleting old poster:', err);
            }
        })
    }
    console.log("record deleted >",data);

    res.redirect('/viewData')
}
module.exports = {defaultController,addData,viewData,editContoller ,updateContoller ,deleteContoller};