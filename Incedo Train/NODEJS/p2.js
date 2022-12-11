var http=require("http");

var server=http.createServer(function(req,resp){
    resp.writeHead(200,{"Content-type":"text/plain"});
    //resp.writeHead(200,{"Content-type":"text/html"});
    resp.write("<h1>Hello hyderabad<h1/>");
    resp.end();
});
server.on("request",function(){
    console.log("A client made a request");
});

server.listen(9000,function(){
    console.log("server started listening...");
});
