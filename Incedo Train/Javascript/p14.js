var student={"ID":1234,"sname":"Sreekanth","course":"CSE","Fees":12000};

var person={"ID":12,"pname":"Sree","gender":"Male","age":30};

for (var i in student){
    console.log(`${i}:${student[i]}`);
}

for (var i in person){
    console.log(`${i}:${person[i]}`);
}


