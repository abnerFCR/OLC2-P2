import { Parametro } from "../Utils/Parametro";

export class SimboloStruct{
    id : string;
    size : number;
    atributos : Array<Parametro>;

    constructor(id: string, size: number,atributos: Array<Parametro>){
        this.id = id;
        this.size = size;
        this.atributos = atributos;
    }

    getAtributo(id: string) : {index : number, valor: Parametro | null}{
        for(let i = 0; i < this.atributos.length; i++){
            const valor = this.atributos[i];
            if(valor.id == id){
                return {index: i,valor : valor};
            }
        }
        return {index: -1,valor : null};
    }
}