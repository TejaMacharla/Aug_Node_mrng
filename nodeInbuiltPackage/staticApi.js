var http = require('http');
var fs=require('fs');
var server=http.createServer(function(req, res){
   fs.readFile('db.json','utf8',function(err,result){
       if(err) throw err;
       res.write(result);
       res.end();
   })
})
server.listen(5555)