let people=[
    {"id":100,"pname":"sreekanth","gender":"Male","Age":23},
    {"id":102,"pname":"subhash","gender":"Male","Age":24},
    {"id":103,"pname":"madhukar","gender":"Male","Age":25},
    {"id":104,"pname":"ganesh","gender":"Male","Age":26},
]

for(let i in people)
{
    var p=people[i];
    console.log(`${p.id}  ${p.pname}  ${p.gender}  ${p.Age}`);
}