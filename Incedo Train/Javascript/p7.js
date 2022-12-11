var hour =new Date().getHours();

if(hour<12)
    console.log(`Good Morning`);
else if(hour<16)
    console.log(`Good Afternoon`);
else
    console.log(`Good Evening`);

console.log(`Time is : ${new Date().toLocaleTimeString()}`);

var day=new Date().getDay();

if(day==0 || day==6)
    console.log(`Today is the Weekend`);
else
    console.log(`Today is a work day`);

