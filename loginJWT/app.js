const express = require('express');
const app = express();
const db=require('./db')
const port=5000;
const cors=require('cors')
app.use(cors());
const authController=require('./auth/authController')
app.use('/api/auth',authController)
app.listen(port,(err)=>{
    if(err)throw err
    console.log(`server is running on ${port}`)
})