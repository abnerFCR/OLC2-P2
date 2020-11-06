import { Type } from "../Utils/Type";
import { FuncionSt } from "../Instruccion/Funciones/FuncionSt";
import { Parametro } from "../Utils/Parametro";

export class SimboloFuncion {
    tipo: Type;
    id: string;
    idUnico: string;
    size: number;
    parametros: Array<Parametro>;

    constructor(funcion: FuncionSt,idUnico: string) {
        this.tipo = funcion.tipo;
        this.id = funcion.id;
        this.size = funcion.parametros.length;
        this.idUnico = idUnico;
        this.parametros = funcion.parametros;
    }
}