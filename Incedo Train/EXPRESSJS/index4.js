var express= require("express");

var bodyParser = require("body-parser");

var app = express(); 
app.use(bodyParser());



app.get('/:id', function (req, resp){
     var id= Number(req.params.id); 
     resp.send(`Given id: ${id}`);

})

app.post('/',function(req, resp){

var obj = req.body; resp.send('Hello' +JSON.stringify(obj));

})

app.put('/:id',function(req, resp)
{ var id = Number(req.params.id);

var obj = req.body; 
resp.send(JSON.stringify(obj));
})

app.delete('/:id',function(req, resp)
{ var id= Number(req.params.id); 
    resp.send(`Delete for id: ${id}`);

})

app.listen(9001, () =>console.log("Web API Started listening..."));