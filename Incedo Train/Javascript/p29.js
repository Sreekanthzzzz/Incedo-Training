var square = function(n){
    return n*n;
}


var next = function(n){
    return n+1;
}

var calcNumber = function(fe,n){
    return fe(n);
}

console.log(calcNumber(square,5));
console.log(calcNumber(next,9));

console.log(calcNumber(function(n){
    return n*n*n;
},8));
