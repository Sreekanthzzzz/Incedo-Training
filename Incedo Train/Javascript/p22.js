var employee=require("./empModule");
for(var i of employee){
    for (let j in i){
        console.log(`${j} = ${i[j]}`);
        
    }console.log("======");
    
}