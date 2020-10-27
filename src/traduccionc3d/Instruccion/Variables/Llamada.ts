import { Instruccion } from "../../Abstracto/Instruccion";
import { Expresion } from "../../Abstracto/Expresion";
import { Entorno } from "../../TablaSimbolos/Entorno";

export class Call extends Instruccion{
    private call: Expresion;

    constructor(call: Expresion, line: number, column: number){
        super(line,column);
        this.call = call;
    }

    compilar(entorno: Entorno){
        const valor = this.call.compilar(entorno);
        valor.getValor(); //Para limpiar temporal
    }
}