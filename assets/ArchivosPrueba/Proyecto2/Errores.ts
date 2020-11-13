/** 0.4 puntos por error semantico reportado ***/

let x:number = 5 / 0; //Error 1
let zzz:number = 5 % 0; //Error 2

let y:number = 20;
const y:number = 30; //Error 3

if(true){
    break; //Error 4
}

while(true){
    return; //Error 5
}

switch(1){
    case 1:
        continue; //Error 6
}

/******************/
let arreglo : number = 1;
arreglo = "hola"; //Error 7

if(true){
    let noexistoafuera:number = 100;
}
console.log(noexistoafuera); //Error 8

let tipo1:string = "hola";
tipo1 = 100; //Error 9


type t = {
    nombre : string
};

let tNull : t = null;
console.log(t.nombre); //Error 10