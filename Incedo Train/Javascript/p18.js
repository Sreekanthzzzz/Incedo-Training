var items=['eraser','pen','gum','pencil','scale'];

for (var i=0;i<items.length;i++){
    console.log(items[i]);
}
console.log("=============");
for (var i of items){
    console.log(i);
}
console.log("=============");

for (var i in items){
    console.log(items[i]);
}