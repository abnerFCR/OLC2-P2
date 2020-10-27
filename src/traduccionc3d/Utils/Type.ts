import { SimboloStruct } from "../TablaSimbolos/SimboloStruct";

export enum Types{
    NUMBER = "number",
    STRING = "string",
    BOOLEAN = "boolean",
    STRUCT = "struct",
    ARRAY = "array",
    NULL = "null",
    VOID = "void"
}

export class Type{
    nombreTipo : Types;
    tipoIdStruct : string;
    struct : SimboloStruct | null;

    constructor(nombreTipo: Types, tipoIdStruct: string = '', struct : SimboloStruct | null = null){
        this.nombreTipo = nombreTipo;
        this.tipoIdStruct = tipoIdStruct;
        this.struct = struct;
    }
}