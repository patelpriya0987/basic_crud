const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://priyupatel0987:vlqYhRDyP3u6WY3C@cluster1.pipyp.mongodb.net/basic_crud')
.then(() => console.log('DB Connected!')).catch((err) =>{
    console.log("err",err);
  })