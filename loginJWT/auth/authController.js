const express = require('express');
const router=express.Router();
const bodyParser = require('body-parser');
const jwt=require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const config = require('../config')
const User = require('./userSchema')

router.use(bodyParser.urlencoded({ extended:true}))
router.use(bodyParser.json())

//get all users

router.get('/users',(req,res)=>{
    User.find({},(err,data)=>{
        if(err) throw err;
        res.send(data);
    })
})

//register user

router.post('/register',(req,res)=>{
    var hashpassword=bcrypt.hashSync(req.body.password,8);
       var email=req.body.email
       User.findOne({email:email},(err,user)=>{
           if(user) res.status(500).send('User already registered')
           else{
            User.create({
                name:req.body.name,
                email:req.body.email,
                password:hashpassword,
                role:req.body.role?req.body.role:'User'
            },(err,data)=>{
                if(err) return res.status(500).send('Error')
                res.status(200).send('Register Successfully')
            })
           }
      
    
    })
   
})

//login user

router.post('/login',(req,res)=>{
    User.findOne({email:req.body.email},(err,user)=>{
        if(err) return res.status(500).send('Error')
        if(!user) return res.status(500).send({auth:false,token:'No User Found'})
        else{
            const passIsValid =bcrypt.compareSync(req.body.password,user.password);
            if(!passIsValid) return res.status(500).send({auth:false,token:'Invalid Password'})
            var token=jwt.sign({id:user._id},config.secrete,{expiresIn:86400})
            res.send({auth:true,token:token})
        }
    })
})

module.exports =router;