var fs=require("fs");
fs.readFile("demo1.txt",'utf-8',function(err,data){
    if(!err){
                console.log(data);
    }
    else{
        console.log(`Error: ${err}`)
    }
}

)


var fs = require("fs");

console.log("Going to delete an existing file");
fs. unlink ('input.txt', function(err) {
   if (err) {
       console.log(err);
   }
   else
   console.log("File deleted successfully!");
});

//Rename a file
const fs = require('fs');
fs.rename('n1.js','n2.js');
//Appendfile
const fs = require("fs");
var fname="a1.txt";
var content="\nThis is additional content\nAdded at end";
fs.appendFile(fname,content,function(err){
    if( !err)
        console.log("File appended successfully...");
    else
        console.log(`Error: ${err}`);
});

//Duplicate a file
var fs = require("fs");

fs.mkdir("myfiles",function(){
    fs.readFile("file1.txt",'utf8',function(err,data){
        fs.writeFile("./myfiles/sample1.txt",data,function(err){
            console.log("File copied successfully");
        });        
    });
});
//move a file
var fs = require("fs");

fs.mkdir("myfiles",function(err){
    fs.readFile("demo1.txt",'utf8',function(err,data){
        fs.writeFile("./myfiles/demo1.txt",data,function(err){
            if( !err ){
                console.log("File copied successfully to target folder");
                fs.unlink("demo1.txt",function(err){
                    if (!err)
                        console.log("File removed successfully source folder");
                });                
            }            
        });
        
    });
    
});
