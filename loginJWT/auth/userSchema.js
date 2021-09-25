//in userSchema we define the structure of our user,how the data table looks like
var mongoose = require('mongoose');

var userSchema =new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:String
})
mongoose.model('user',userSchema)
module.exports =mongoose.model('user');