const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const db = require('./config/db')
const path = require('path')
const port = 3002;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname , "/views"));

app.use('/upload' , express.static(path.join(__dirname , "/upload")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}))

app.use('/',routes);

app.listen(port,(err)=> {
    if(!err){
        console.log(`server is running on http://localhost:${port}`);
        
    }
})

