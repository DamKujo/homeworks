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

BaseCharacter.prototype.speak = function(){
    console.log(`Язык ${this.language}, имя персонажа ${this.name}`);
};
BaseCharacter.prototype.kick = function(){
    console.log('Kick!');
};
BaseCharacter.prototype.invocationSpell = function(){
    if(!this.spell){
        alert('У вас отсутствуют заклинания! Вам необходимо их создать!');
        return;
    };
    console.log(`A spell ${this.spell} is being used`);
};
BaseCharacter.prototype.createASpell = function(spell){
    this.spell = spell;
};
BaseCharacter.prototype.weapon = function(weapon){
    this.weapon = weapon;
};

const character = new BaseCharacter('Человек', 'Николай', 'RU');
console.log(character)
const orc = new BaseCharacter('Орк', "Шрек", "ENG");
console.log(orc);
orc.weapon(`King Arthur's sword`);
console.log(orc);
const elf = new BaseCharacter('Эльф', 'Ева', 'JPN');
console.log(elf);
elf.createASpell('The ligth shot!');
console.log(elf);
elf.invocationSpell();


// Блок Классы

class Car {
    #make;
    #model;
    #run;
    constructor(make, model, run){
        this.#make = make;
        this.#model = model;
        this._run = run;
    }


    set _run(km){
        this.#run = km;
        return 'changed'
    }

    get checkRun(){
        return this.#run;
    }


    info(){
        console.log(`Марка машины/модель: ${this.#make}/${this.#model}
        Пробег: ${this.#run}kM`);
    }
}

const mercedes = new Car('Mercedes', 'S-Class', 50000);
console.log(mercedes)
// получаем пробег 
console.log(mercedes.checkRun)
// метод info возвращает основную информацию
console.log(mercedes.info())
// через setter обновляем пробег
mercedes._run = 90000;
console.log(mercedes.checkRun);
console.log(mercedes.info())



