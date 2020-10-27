import { Type, Types } from "../Utils/Type";

export class Simbolo {
    tipo: Type;
    id: string;
    posicion: number;
    isConst: boolean;
    isGlobal: boolean;
    isHeap: boolean;

    constructor(tipo: Type, id: string, posicion: number, isConst: boolean, isGlobal: boolean, isHeap: boolean = false) {
        this.tipo = tipo;
        this.id = id;
        this.posicion = posicion;
        this.isConst = isConst;
        this.isGlobal = isGlobal;
        this.isHeap = isHeap;
    }
}