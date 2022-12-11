const { json } = require('body-parser');

module.exports.getBook=async(req,res,next)=>{
    var books=require('./books')
    console.log("hey,this is getBook file");
    const obj=req.params;
    console.log(obj.BookID);
    var book=books[obj.BookID]
    console.log(book);
    res.send({book});
}