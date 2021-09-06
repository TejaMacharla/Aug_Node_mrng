var express=require('express')
var morgan = require('morgan')
var fs=require('fs')
var app=express()
var dotenv = require('dotenv')
dotenv.config()
var port=process.env.PORT || 5600
var cityRouter=require('./src/router/cityRouter')
var hotelsRouter=require('./src/router/hotelsRouter')
//save logs in file
app.use(morgan('combined'))
app.use(morgan('dev',{stream:fs.createWriteStream('./app.log',{flags:'a'})}))
//static file path
app.use(express.static(__dirname + "/public"))

//html file
app.set('views', './src/views')

//view engine
app.set('view engine','ejs')


app.get('/',function(req, res) {
    //res.send('Hi from Express')
	res.render('home',{title:'Home Page',keyword:'Node FullStack'})//data binding
})
app.use('/city', cityRouter)
app.use('/hotels',hotelsRouter)
app.listen(port,function(err){
    if(err) throw err
    console.log(`server is running on ${port}`)
})