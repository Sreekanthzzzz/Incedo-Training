const fs = require("fs");

fs.mkdir("folder1", function(err){


if (err && err.code==="EEXIST")
console.log("Error: Directory already exist");
else
console.log("Created directory successfully...");
});
//File system has mkdir method to create a folder