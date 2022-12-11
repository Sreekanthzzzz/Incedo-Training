const { Router }=require("express");
const foo=require("./foo.route");

const router=new Router();
router.use("/foo",foo);
module.exports=router;