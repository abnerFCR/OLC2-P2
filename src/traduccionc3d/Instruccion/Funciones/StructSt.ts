import { Instruccion } from "../../Abstracto/Instruccion";
import { Parametro } from "../../Utils/Parametro";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Error_ } from 'src/interprete/Errores/Error';
import { Types } from "../../Utils/Type";

export class StructSt extends Instruccion {
    private id: string;
    private atributos: Array<Parametro>;

    constructor(id: string, atributos: Array<Parametro>, linea: number, columna: number) {
        super(linea, columna);
        this.id = id;
        this.atributos = atributos;
    }

    compilar(entorno: Entorno): void {        
        if(!entorno.addStruct(this.id,this.atributos.length,this.atributos))
            throw new Error_(this.linea,this.columna,'Semantico',`Ya existe un struct con el id ${this.id}`);
        this.validarParametros(entorno);
    }

    private validarParametros(entorno: Entorno){
        const set = new Set<string>();
        this.atributos.forEach((param)=>{
            if(set.has(param.id.toLowerCase()))
                throw new Error_(this.linea,this.columna,'Semantico',`Ya existe un parametro con el id ${param.id}`);
            if(param.tipo.nombreTipo == Types.STRUCT) {
                const struct = entorno.getStruct(param.tipo.tipoIdStruct);
                if(!struct)
                    throw new Error_(this.linea,this.columna,'Semantico',`No existe el struct ${param.tipo.tipoIdStruct}`);
                param.tipo.struct = struct;
            }
            set.add(param.id.toLowerCase());
        });
    }
}