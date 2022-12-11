var http=require("http");

var server=http.createServer(function(req,resp){
   // resp.writeHead(200,{"Content-type":"text/plain"});
    resp.writeHead(200,{"Content-type":"text/html"});
    var e1={"id":1001,"ename":"Hari","age":30};
    resp.write(JSON.stringify(e1));
    resp.write("<h1>Hello client, How are you?</h1>");
    resp.end();
});



server.listen(9000,function(){
    console.log("Server stsrted running");
});
