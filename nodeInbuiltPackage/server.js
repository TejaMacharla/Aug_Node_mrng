var http = require('http');
var server=http.createServer(function(req, res) {
    res.write('<h1>This is First Node App</h1>')
})
server.listen(4444)