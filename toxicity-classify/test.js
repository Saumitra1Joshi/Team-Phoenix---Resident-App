const nlp = require('./classify')
const a = nlp.classify_comment("Trump is an idiot")
console.log(a)
if( a == true){
    console.log("Toxic")
}
else{
    console.log("Not Toxic")
}