const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongo= require('mongodb')
const MongoClient=mongo.MongoClient
const port=process.env.PORT ||2500
const mongoUrl="mongodb://localhost:27017"
let db;
let col_name='dashboard'
const app=express()
//static file path
app.use(express.static(__dirname + "/public"))

//html file
app.set('views', './src/views')

//view engine
app.set('view engine','ejs')

//use middleware as bodyParser for post the data

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//cors using for cross origin resource sharing
app.use(cors())

//db connection
MongoClient.connect(mongoUrl,(err, client) => {
    if(err) console.log('error while connecting')
    db=client.db('Augnode')
    app.listen(port,(err)=>{
        console.log(`server is running on port ${port}`)
    })
})
app.get('/work',(req,res)=>{
    res.status(200).send('it is working file')
})
app.get('/',(req,res)=>{
    db.collection(col_name).find().toArray((err,result)=>{
        if(err)throw err
        res.render('index',{data:result})
    })
})
app.get('/new',(req,res)=>{
    res.render('admin')
})

//Read user

app.get('/users',(req,res)=>{
    var query
    query={isActive:true}
    db.collection(col_name).find(query).toArray((err,result)=>{
        if(err) throw err;
        res.status(200).send(result)
    })
})
//Add user
app.post('/addUser', (req,res) => {
    console.log(req.body)
    const data = {
        name: req.body.name,
        city: req.body.city,
        phone: req.body.phone,
        role: req.body.role?req.body.role:'User',
        isActive: true
    }
    db.collection(col_name).insert(data,(err,result) => {
        if(err) throw err;
        //res.send('Data Added')
        res.redirect('/')

    })
})
//find particular user
app.get('/user/:id',(req,res)=>{
    var id=mongo.ObjectId(req.params.id)
    db.collection(col_name).find({_id:id}).toArray((err,result)=>{
        if(err)throw err
        res.status(200).send(result)
    })
})

//update user 

app.put('/updateUser',(req,res)=>{
    db.collection(col_name).updateOne({
        _id:mongo.ObjectId(req.body._id)
    },{
        $set:{
            name:req.body.name,
            city:req.body.city,
            phone:req.body.phone,
            role:req.body.role,
            isActive:true
        }
    },(err,result)=>{
        if(err) throw err;
        res.send('data updated')
    })
})

//delete user 

app.delete('/deleteUser', (req,res) => {
    db.collection(col_name).remove({_id:mongo.ObjectId(req.body._id)}, (err,result) => {
        if(err) throw err;
        res.send('Data Deleted')
    })
})

//deactivate user

app.put('/deactivateUser',(req,res)=>{
    db.collection(col_name).updateOne({
        _id:mongo.ObjectId(req.body._id)
    },{
        $set:{
            isActive:false
        }
    },(err,result)=>{
        if(err) throw err;
        res.send('user deactivated')
    })
})

//activate user

app.put('/activateUser',(req,res)=>{
    db.collection(col_name).updateOne({
        _id:mongo.ObjectId(req.body._id)
    },{
        $set:{
            isActive:true
        }
    },(err,result)=>{
        if(err) throw err;
        res.send('user activated')
    })
})