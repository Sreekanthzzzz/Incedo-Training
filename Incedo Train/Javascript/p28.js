//callback functions: 

var display=function(){
    console.log("hello from display");

}

var wishes=function(){
    console.log("hello from wishes");

}

var cb=function(fe){
    fe();

}
cb(display);
cb(wishes);
cb(function(){
    console.log("Hello from anonymous");
})