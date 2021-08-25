var express=require('express')
var app=express()
var port=5600
app.get('/',function(req, res) {
    res.send('Hi from Express')
})
app.get('/city',(req,res)=>{
    res.send('Hi from city')
})
app.get('/hotels',(req,res)=>{
    res.send('Hi from hotels page')
})
app.listen(port,function(err){
    if(err) throw err
    console.log(`server is running on ${port}`)
})