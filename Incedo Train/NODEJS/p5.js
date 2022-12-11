var http = require("http");
var server = http.createServer(function(req,resp){
var url = req.url;
resp.write(`Requested URL: ${url}\n`);
if(url==="/")
resp.write("Empty route");
else if(url==="/date")
resp.write(`Date is: ${new Date().toLocaleDateString()}`);
else if(url==="/time")
resp.write(`Time is: ${new Date().toLocaleTimeString()}`);
resp.end();

});

server.listen(9000,function(){
    console.log("Server started listening.......")
});
