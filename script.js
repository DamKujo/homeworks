// Блок Map и Set
let array = [
    {id:1, name: 'Vasya'},
    {id:2, name: 'Petya'},
    {id:1, name: 'Vasya'}
]

console.log(array);

let arrayV1 = array.map(el => el.id);
let arrayV2 = [...new Set(array.map(el => el.id))];
let isEqual = true;

for(let i = 0; i < arrayV1.length; i++){
    if(arrayV1[i] !== arrayV2[i]){
        isEqual = false;
    }
    if(!isEqual){
        // arrayNew.push(array[i]);
        array.splice(array.indexOf(array[i]))
    }
}
console.log(array);