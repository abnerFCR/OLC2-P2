import { Instruccion } from "../../Abstracto/Instruccion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Error } from "../../Utils/Error";
import { Generador } from "../../Generador/Generador";

export class Continue extends Instruccion{

    constructor(linea: number, columna: number){
        super(linea,columna);
    }

    compilar(entorno: Entorno){
        if(entorno.continue == null){ 
            throw new Error(this.linea,this.columna,'Semantico','Continue en un ambito incorrecto');
        }
        Generador.getInstancia().addGoto(entorno.continue);
    }
}