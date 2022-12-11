var express = require("express");
var employees = require("./employees").employees;

var server = express();

server.get('/',function(req,resp){
    resp.send("Hello from Web API")
});

server.get('/wishes',function(req,resp){
    resp.send("Hello from Web API")
});

server.get('/date',function(req,resp){
    var msg = `Date is: ${new Date().toLocaleDateString()}`;
    resp.send(msg)
});

server.get('/time',function(req,resp){
    var msg = `Time is: ${new Date().toLocaleTimeString()}`;
    resp.send(msg)
});

server.get('/:name',function(req,resp){
    var name = req.params.name;
    resp.send(`Hello ${name}`);
});

// server.get('/:name/:city',function(req,resp){
//     var name = req.params.name;
//     var city = req.params.city;
//     resp.send(`${name} is from ${city}`);
// });

server.get('/employees/list',function(req,resp){
    var name = req.params.name;
    resp.send(employees);
});

server.get('/employees/details/:id',function(req,resp){
    var id = req.params.id;
    var e = employees.find(x=>x.id==id);
    resp.send(e);
});


server.listen(9001,()=>console.log("Web API started listening......."));
