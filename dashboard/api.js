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
app.get('/health',(req,res)=>{
    res.status(200).send('it is working file')
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
app.post('/addusers',(req,res)=>{
    console.log(req.body)
    db.collection(col_name).insert(req.body,(err,result)=>{
        if (err) throw err;
        res.send('data added')
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

app.put('/updateuser',(req,res)=>{
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

app.delete('/deleteuser',(req,res)=>{
    db.collection(col_name).remove({
        _id:mongo.ObjectId(req.params._id)
    },(err,result)=>{
        if(err) throw err;
        res.send('Data deleted')
    })
})

//deactivate user

app.put('/deactivateuser',(req,res)=>{
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

app.put('/activateuser',(req,res)=>{
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