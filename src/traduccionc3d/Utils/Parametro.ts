import { Type, Types } from "./Type";

export class Parametro {
    id: string;
    tipo: Type;

    constructor(id: string, type: Type) {
        this.id = id.toLowerCase();
        this.tipo = type;
    }

    getTipoUnico() : string{
        if(this.tipo.nombreTipo == Types.STRUCT){
            return this.tipo.tipoIdStruct;
        }
        return this.tipo.nombreTipo;
    }

    toString() : string{
        return `{id: ${this.id}, type: ${this.tipo}}`;
    }
}