import { Entorno } from "../TablaSimbolos/Entorno";
import { Types, Type } from "../Utils/Type";

export abstract class Instruccion{
    linea : number;
    columna : number;

    constructor(linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
    }

    public abstract compilar(env: Entorno) : any;

    public mismoTipo(type1: Type, type2: Type) : boolean{
        //TODO casteos implicitos
        if(type1.nombreTipo == type2.nombreTipo){
            if(type1.nombreTipo == Types.STRUCT){
                return type1.tipoIdStruct.toLocaleLowerCase() === type2.tipoIdStruct.toLocaleLowerCase();
            }
            return true;
        }
        else if(type1.nombreTipo == Types.STRUCT || type2.nombreTipo == Types.STRUCT){
            if(type1.nombreTipo == Types.NULL || type2.nombreTipo == Types.NULL){
                return true;
            }
        }
        return false;
    }
}