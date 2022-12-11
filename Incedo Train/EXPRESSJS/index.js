var express  = require("express");
var app = express();
var mysql = require("mysql");

var cs = {'host':'localhost', user: 'root', password:'root@123', database: 'tableEmployees'};
var cn  = mysql.createConnection(cs);

// var employees = require("./empModule").employees;
var bodyParser = require("body-parser");

app.use(bodyParser());
app.get('/', function(req, resp){
    query = "select * from IncedoEmployeeDb.tblEmployees";
    cn.query(query, function(err,data)
    {
        resp.send(data);
    });

});
app.get('/search/:id', function(req, resp){
    var id = req.params.id;
    query ="select * from tblEmployees where id = "+id;
    cn.query(query, function(err,data)
    {
        resp.send(data);

    });

});

app.post('/', function(req,resp)
{
    var e = req.body;
    var query = `insert into tblEmployees values (  ${e.id}, '${e.ename}', '${e.job}', ${e.salary})`;
    cn.query( query, function(err,data)
    {
        resp.send('row added successfully');
    });
});
app.put('/:id', function(req, resp)
{
    var e = req.body;
    var id = req.body.id;
    var query = ` update tblEmployees set ename = '${e.ename}', job = '${e.job}', salary = ${e.salary} where id = ${id}`;
    cn.query(query, function(err,data)
    {
        resp.send('row updated successfully');
    });
});
app.delete('/:id', function(req, resp)
{
    var id = req.body.id;
    var query = ` delete from tblEmployees where id = ${id}`;
    cn.query(query, function(err,data)
    {
        resp.send('row deleted successfully');
    });
});

app.delete





app.listen(9002, ()=>console.log("hey"));
