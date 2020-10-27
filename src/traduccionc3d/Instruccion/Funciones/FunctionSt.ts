import { Instruccion } from "../../Abstracto/Instruccion";
import { Parametro } from "../../Utils/Parametro";
import { Type, Types } from "../../Utils/Type";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Error } from "../../Utils/Error";
import { Generador } from "../../Generador/Generador";

export class FunctionSt extends Instruccion{
    id: string;
    parametros: Array<Parametro>;
    tipo: Type;
    private cuerpo: Instruccion;
    private preCompile: boolean;

    constructor(tipo: Type,id: string, parametros: Array<Parametro>, cuerpo: Instruccion, linea: number, columna: number){
        super(linea,columna);
        this.id = id;
        this.tipo = tipo;
        this.parametros = parametros;
        this.cuerpo = cuerpo;
        this.preCompile = true;
    }

    compilar(entorno: Entorno){
        if(this.preCompile){
            this.preCompile = false;
            this.validarParametros(entorno);
            this.validarTipo(entorno);
            const idUnico = this.idUnico(entorno);
            if(!entorno.addFuncion(this,idUnico))
                throw new Error(this.linea,this.columna,'Semantico',`Ya existe una funcion con el id: ${this.id}`);
            return;
        }

        const symbolFunc = entorno.getFuncion(this.id);
        if(symbolFunc != undefined){
            const generator = Generador.getInstancia();
            const newEntorno = new Entorno(entorno);
            const etiquetaRetorno = generator.newEtiqueta();
            const almacenamientoTemp = generator.getAlmacenamientoTemp();

            newEntorno.setEnviorementFunc(this.id,symbolFunc,etiquetaRetorno);
            this.parametros.forEach((param)=>{
                newEntorno.addVar(param.id,param.tipo,false,false);
            });
            generator.limpiarAlmacenamientoTemp();
            generator.isFunc = '\t';
            generator.addBegin(symbolFunc.idUnico);
            this.cuerpo.compilar(newEntorno);
            generator.addEtiqueta(etiquetaRetorno);
            generator.addEnd();
            generator.isFunc = '';
            generator.setAlmacenamientoTemp(almacenamientoTemp);
        }
    }

    private validarParametros(entorno: Entorno){
        const set = new Set<string>();
        this.parametros.forEach((param)=>{
            if(set.has(param.id.toLowerCase()))
                throw new Error(this.linea,this.columna,'Semantico',`Ya existe un parametro con el id ${param.id}`);
            if(param.tipo.nombreTipo == Types.STRUCT ){
                const struct = entorno.getStruct(param.tipo.tipoIdStruct);
                if(!struct)
                    throw new Error(this.linea,this.columna,'Semantico',`No existe el struct ${param.tipo.tipoIdStruct}`);
                param.tipo.struct = struct;
            }
            set.add(param.id.toLowerCase());
        });
    }

    private validarTipo(entorno: Entorno){
        if(this.tipo.nombreTipo == Types.STRUCT){
            const struct = entorno.getStruct(this.tipo.tipoIdStruct);
            if(!struct)
                throw new Error(this.linea,this.columna,'Semantico',`No existe el struct ${this.tipo.tipoIdStruct}`);
            this.tipo.struct = struct;
        }
    }

    public idUnico(entorno: Entorno) : string{
        let id = `${entorno.prop}_${this.id}`;
        if(this.parametros.length == 0)
            return id + '_empty';
        this.parametros.forEach((param)=>{
            id += `_${param.getTipoUnico()}`;
        });
        return id;
    }
}