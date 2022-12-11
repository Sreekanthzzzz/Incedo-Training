module.exports.getBooks=async(req,res,next)=>{
    var books=require('./books')
    console.log("hey,this is getBooks file");
    const obj=req.body;
    console.log(obj);
    res.send({books});
}