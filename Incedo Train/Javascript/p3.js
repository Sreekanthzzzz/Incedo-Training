var m=60;
var p=54;
var c=57;
console.log(`maths m= ${m} , physics p= ${p}, Chemistry c= ${c}`);
console.log(`Total score is ${m+p+c}`);
console.log(`average of the total score is ${(m+p+c)/3}`);


var total=m+p+c;
var avg=total/3;

var result;
var grade;
if(m>=35 && c>=35 && p>=35)
    {
        result="PASS";
        if(avg>=75) grade="A1";
        else if (avg =>65 ) grade ="A";
        else if (avg >= 50) grade ="B";


    }
else
    {
        result="FAIL";
        grade="NA"
    }
    console.log(`Result is : ${result},grade is : ${grade}`);