var express= require("express");
var employees=require("./employees").employees
var bodyParser = require("body-parser");

var app = express(); 
app.use(bodyParser());



app.get('/:id', function (req, resp){
     var id= Number(req.params.id); 
     var e=employees.find(x=>x.id==id);
     resp.send(e);

})

app.get('/',function(req, resp){
    resp.send(employees);


})

app.post('/', function (req, resp){
    var obj=req.body
    employees.push(obj);
    resp.send(`Row added Successfully...`);

})

app.put('/:id',function(req, resp)
{ var id = Number(req.params.id);
    var index=employees.findIndex(x=>x.id==id);

var obj = req.body; 
employees[index]=obj
resp.send(`Row edited Successfully`);
})

app.delete('/:id',function(req, resp)
{ var id= Number(req.params.id); 
    var index=employees.findIndex(x=>x.id==id);
    employees.splice(index,1)
    resp.send(`Delete for id: ${id}`);

})

app.listen(9001, () =>console.log("Web API Started listening..."));