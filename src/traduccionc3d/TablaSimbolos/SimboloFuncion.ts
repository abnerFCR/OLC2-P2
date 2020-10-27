import { Type } from "../Utils/Type";
import { FunctionSt } from "../Instruccion/Funciones/FunctionSt";
import { Parametro } from "../Utils/Parametro";

export class SimboloFuncion {
    tipo: Type;
    id: string;
    idUnico: string;
    size: number;
    parametros: Array<Parametro>;

    constructor(funcion: FunctionSt,idUnico: string) {
        this.tipo = funcion.tipo;
        this.id = funcion.id;
        this.size = funcion.parametros.length;
        this.idUnico = idUnico;
        this.parametros = funcion.parametros;
    }
}