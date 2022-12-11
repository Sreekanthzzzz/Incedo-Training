var people =require("./peopleModule").people;

var http = require("http");
var server = http.createServer(function(req,resp){
    var url = req.url.substring(1);
    var id =parseInt(url);
    var p = people.find(x=>x.id==id);
    resp.writeHead(200, { 'Content-Type': 'application/json' });
    resp.write(JSON.stringify(p));
    resp.end();
});

server.listen(9000);
