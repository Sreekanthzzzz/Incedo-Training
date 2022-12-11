var length=(n)=>n.length;
var firstName=(n)=>n.substring(0,n.indexOf(" "));
var lastname=(n)=>n.substring(n.indexOf(" ")+1);

console.log(length("sree kanth"));
console.log(firstName("sree kanth"));
console.log(lastname("sree kanth"));

