import { Type, Types } from "./Type";

export class Struct extends Type{
    atributos : Map<string,any>;
    size : number;

    constructor(id: string, atributos: Map<string,any>){
        super(Types.STRUCT,id);
        this.atributos = atributos;
        this.size = this.atributos.size;
    }
}