var add=function(a,b){
    return a+b;
}

var multiply=function(a,b){
    return a*b;
}

var calcNumbers=function(a,b,fe){
    return fe(a,b);
}

console.log(calcNumbers(10,5,add));
console.log(calcNumbers(5,5,multiply));
console.log(calcNumbers(10,5,function(a,b){
    return a>b?a:b;
}))