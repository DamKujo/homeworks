// Блок Map и Set
let array = [
    {id:1, name: 'Vasya'},
    {id:2, name: 'Petya'},
    {id:1, name: 'Vasya'}
]

console.log(array);

let arr2 = array.filter(el => el.id === 1);
let arr3 = [];
for(let item of arr2){
    arr3.push(Object.entries(item));
}
arr3 = arr3.concat(...arr3).splice(2);
arr3 = [[...new Set(arr3.concat(...arr3).splice(4))].splice(0,2), [...new Set(arr3.concat(...arr3).splice(4))].splice(2)];
let obj = {};
for (let [key, value] of arr3){
    obj[key] = value;
}
let newArray = array.filter(el => el.id === 2);
newArray.push(obj);
console.log(newArray);
// Блок расчеты и math 
function breakDice(dice){
    const allDice = [
        {name: 'd4', min: 1, max: 4},
        {name: 'd6', min: 1, max: 6},
        {name: 'd8', min: 1, max: 8},
        {name: 'd10', min: 1, max: 10},
        {name: 'd12', min: 1, max: 12},
        {name: 'd16', min: 1, max: 16},
        {name: 'd20', min: 1, max: 20}
    ];
    const currentDice = allDice.find(x => x.name === dice);
    if(!currentDice){
        return null;
    }

    return Math.floor(Math.random() * (currentDice.max - currentDice.min + 1)) + currentDice.min;
}

//В функцию передаем тип dice (от d4 до d20)
console.log(breakDice('d16'));



const interval = setInterval(()=> {
    let now = new Date();
    let nextYear = new Date(`${now.getFullYear() + 1}`);
    let almostNewYear = new Date(nextYear.getTime() - ((1000*3600*3) + 1000));
    const difference = {
        month: `${almostNewYear.getMonth() - now.getMonth()}`,
        days: `${almostNewYear.getDate() - now.getDate()}`,
        hours: `${almostNewYear.getHours() - now.getHours()}`,
        min: `${almostNewYear.getMinutes() - now.getMinutes()}`,
        sec: `${almostNewYear.getSeconds() - now.getSeconds()}`
    }
    document.getElementById('1').textContent = `${difference.month} month, ${difference.days} days, ${difference.hours} hours, ${difference.min} minutes, ${difference.sec} seconds`;
}, 1000);

// Блок ООП 

const BaseCharacter = function(race, name, language){
    this.race = race;
    this.name = name;
    this.language = language;
}

console.log(isValidAge('03/15/2009'));

// Блок Принципы ООП в классах 
class Character{
    constructor(race, name, language){
        this.race = race;
        this.name = name;
        this.language = language;
    }

    speak(){
        console.log(`Меня зовут ${this.name}, мой родной язык ${this.language}, я отношусь к расе ${this.race}`);
    }
}
const john = new Character('Human', 'Алекс', 'RU');

class Orc extends Character{
    constructor(race, name, language, weapon){
        super(race, name, language);
        this.weapon = weapon;
    }

    speak(){
        console.log(`Чего тебе надо? Я ${this.name}, говорю на ${this.language}, естественно я ${this.race === 'Orc' ? 'огр'  : this.race}`);
    }

    #kick(){
        console.log(`Получай по башке! Нанесён урон оружием ${this.weapon}`);
    }

    kick(){
        if(this.race === 'Orc'){
            this.#kick();
        }
    }
}
const shrek = new Orc('Orc', 'Шрек', 'ENG', `King Arthur's sword`);

class Elf extends Character{
    constructor(race, name, language, spell){
        super(race, name, language);
    }

    speak(){
        console.log(`Моё имя ${this.name}, приятно познакомиться! Родился я далеко от этих земель, от того и говорю на ${this.language}, я чистокровный ${this.race === 'Elf' ? 'Эльф'  : this.race}`);
    }

    #createSpell(x){
        this.spell = x;
    }

    createASpell(spell){
        if(this.race === 'Elf'){
            this.#createSpell(spell);
        }
    }

    invocationSpell(){
        if(!this.spell){
            alert('У вас отсутствуют заклинания! Вам необходимо их создать!');
            return;
        };
        console.log(`${this.spell} is being used`);
    }
        
}


// Блок SOLID
class Billing{
    _amount;
    constructor(){
        this.amount = 0;
    }

    get amount(){
        return this._amount;
    }
    set amount(a){
        this._amount = a;
    }

    CalculateTotal(a){
        this._amount = a;
    }
}

class FixedBilling extends Billing{
    constructor(_amount){
        super(_amount);
    }
    CalculateTotal(){
        return this._amount;
    }
}

class HourBilling extends Billing{
    constructor(_amount, hours){
        super(_amount);
        this.hours = Number(hours);
    }

    CalculateTotal(){
        return this._amount * this.hours;
    }
}

class ItemBilling extends Billing{
    constructor(_amount, item){
        super(_amount);
        this.item = Number(item);
    }
    CalculateTotal(){
        return this._amount * this.item;
    }
}
const original = new Billing();
original.amount = 5;
console.log(original)

const heir1 = new FixedBilling();
heir1.amount = 1
console.log(heir1.CalculateTotal());
console.log(heir1)

const heir2 = new HourBilling(0, 6);
heir2.amount = 8
console.log(heir2.CalculateTotal());
console.log(heir2)

const heir3 = new ItemBilling(0, 6);
heir3.amount = 9
console.log(heir3.CalculateTotal());
console.log(heir3)


// Блок Асинхронный JS
function req(){
    const request = new XMLHttpRequest();
    request.open('GET', 'https://pokeapi.co/api/v2/pokemon/ditto');
    request.send();

    request.addEventListener('load', function(){
        const data = JSON.parse(this.responseText);
        let arr = data.abilities.filter(el => el.is_hidden === false);
        let nextUrl = arr[0].ability.url;
        // Следующий запрос
        const request = new XMLHttpRequest();
        request.open('GET', nextUrl);
        request.send();
    
        request.addEventListener('load', function(){
            const data = JSON.parse(this.responseText);
            let arr = data.effect_entries.filter(el => el.language.name === "en");
            console.log(arr[0].effect)
            // let nextUrl = arr[0].ability.url;
        });
    });
}

req();

