function wishes(name){
    var hour =new Date().getHours();

if(hour<12)
    console.log(`Good Morning ${name}`);
else if(hour<16)
    console.log(`Good Afternoon ${name}`);
else
    console.log(`Good Evening ${name}`);

}

wishes("sreekanth");
wishes("Ravi");