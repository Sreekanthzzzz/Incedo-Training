const { json } = require('body-parser');

module.exports.updateBook=async(req,res,next)=>{
    var books=require('./books')
    console.log("hey,this is update book file");
    const obj=req.body;
    console.log(obj.BookID);
    books[obj.BookID]=(obj);
    console.log(obj);
    res.send({received:books});
}