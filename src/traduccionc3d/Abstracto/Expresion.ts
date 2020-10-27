import { Entorno } from "../TablaSimbolos/Entorno";
import { Retorno } from "../Utils/Retorno";

export abstract class Expresion{
    etiquetaVerdadero : string;
    etiquetaFalso : string;
    linea: number;
    columna : number;

    constructor(linea: number, columna: number){
        this.etiquetaVerdadero = this.etiquetaFalso = '';
        this.linea = linea;
        this.columna = columna;
    }

    public abstract compilar(env: Entorno) : Retorno;
}