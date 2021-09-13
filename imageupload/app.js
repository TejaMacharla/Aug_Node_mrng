var express = require('express');
var fileupload=require('express-fileupload')
var bodyParser = require('body-parser')
var app=express();
const port=1300;
//static path
app.use(express.static(__dirname+'/public'))
app.set('view engine', 'ejs');

//middleware
app.use(bodyParser.json());
app.use(fileupload())

app.get('/',(req,res)=>{
    res.render('app')
    
})
app.post('/profile',(req,res)=>{
    console.log(req.files)
    console.log(req.body)
    const imageFile=req.files.avatar
    imageFile.mv(`${__dirname}/public/images/${imageFile.name}`,(err,data)=>{
        if(err) throw err;
        res.render('display',{image:`${imageFile.name}`,title:req.body.fname})
    })
})

app.listen(port)