var express=require('express')
var cityRouter=express.Router()
var mongodb=require('mongodb').MongoClient
var url="mongodb://127.0.0.1:27017"

cityRouter.route('/').
get(function(req, res) {
  mongodb.connect(url, function(err,connection){
	  if(err){
		  res.status(501).send("Error While Connecting")
	  }else{
		  const dbo=connection.db("Augnode")
		  dbo.collection('city').find({}).toArray(function(err,data){
			  if(err){
				  res.status(501).send("Error While Fetching")
			  }else{
				  res.render('city',{title:'City Page',cityData:data})
			  }
		  })
	  }
  })
	
})
cityRouter.route('/details')
.get(function(req, res) {
    res.send("city details")
})

module.exports =cityRouter;