const { json } = require('body-parser');

module.exports.deleteBook=async(req,res,next)=>{
    var books=require('./books')
    console.log("hey,this is delete book file");
    const obj=req.params;
    console.log(obj.BookID);
    books[obj.BookID]=null;
    // console.log(books.obj.BookID)
    // books.splice(books.indexOf(books.obj.BookID), 1)
    console.log(obj);
    res.send({received:books});
}