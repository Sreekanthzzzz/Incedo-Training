var express = require("express");

var server = express();
server.get('/calculations/add/:a/:b',function(req, resp){

    var a= Number(req.params.a);
    
    var b= Number(req.params.b);
    
    var c= a+b;
    
    var msg=`Add of ${a} and ${b} is ${c}`;
    
    resp.send(msg);
    
    })
    
    server.get('/calculations/big/:a/:b',function(req, resp){
    
    var a = Number(req.params.a);
    
    var b= Number(req.params.b);
    
    var c= a>b?a:b;
    
    var msg=` Big of $(a) and (b) is $(c)`; 
    
    resp.send(msg);
    
    });
    server.listen(9001,()=>console.log("Web API started listening......."));
