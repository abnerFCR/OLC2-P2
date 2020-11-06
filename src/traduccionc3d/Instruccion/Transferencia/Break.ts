import { Instruccion } from "../../Abstracto/Instruccion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Error_ } from 'src/interprete/Errores/Error';
import { Generador } from "../../Generador/Generador";

export class Break extends Instruccion{

    constructor(linea: number, columna: number){
        super(linea,columna);
    }

    compilar(entorno: Entorno) : void{
        if(entorno.break == null){ 
            throw new Error_(this.linea,this.columna,'Semantico','Break en un ambito incorrecto');
        }
        Generador.getInstancia().addGoto(entorno.break);
    }
}