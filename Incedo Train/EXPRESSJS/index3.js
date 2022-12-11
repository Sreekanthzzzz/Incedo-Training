var express= require("express");

var server = express();

server.get('',function(req, resp) { 
    resp.send('Hello from Web API Get operation');})

server.post('',function(req, resp){ 
    resp.send('Hello from Web API Post operation');})

server.put('',function(req, resp){

resp.send('Hello from Web API Put operation'); })

server.delete('',function(req, resp){

resp.send('Hello from Web API Delete operation');})

server.listen(9001, () =>console.log("Web API Started listening..."));