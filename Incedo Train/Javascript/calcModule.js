const empModule = require("./empModule");

var square=function(n){
    return n*n;
}

module.exports.square=square;

module.exports.biggest=function biggest(a,b){
    return a>b?a:b;
}
module.exports.smallest=function smallest(a,b){
    return a<b?a:b;
}