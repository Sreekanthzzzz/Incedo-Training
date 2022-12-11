module.exports.getTest=async(req,res,next)=>{
    console.log("hey,this is Testing service for foo");
    res.send({
        test:"foo",
        currentTime:(new Date().toISOString())
    });
};