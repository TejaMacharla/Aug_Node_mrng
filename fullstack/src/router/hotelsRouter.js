var express=require('express')
var hotelsRouter=express.Router()
var mongodb=require('mongodb').MongoClient
//var url="mongodb://127.0.0.1:27017"
var url="mongodb+srv://tejamacharla2808:Teja2808@cluster0.jas8d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
hotelsRouter.route('/')
.get(function(req, res) {
   mongodb.connect(url, function(err,connection){
	   if(err){
		   res.status(501).send("Error While Connection")
	   }else{
		   const dbo=connection.db('augnode')
		   dbo.collection('hotels').find({}).toArray(function(err,data){
			   if(err){
				   res.status(501).send('Error While Fetching')
			   }else{
				res.render('hotels',{title: 'Hotels Page',hotelsData:data});
			   }
		   })
	   }
   })
   
})
hotelsRouter.route('/details/:id')
.get(function(req, res) {
	//var id = req.params.id;
	var {id}=req.params
    mongodb.connect(url, function(err,connection){
		if(err){
			res.status(501).send("Error While Connection")
		}else{
			const dbo=connection.db('augnode')
			dbo.collection('hotels').findOne({id:id}),(function(err,data){
				if(err){
					res.status(501).send('Error While Fetching')
				}else{
				 res.render('hotelsdetails',{title:data.name,details:data});
				}
			})
		}
	})
})
module.exports =hotelsRouter;