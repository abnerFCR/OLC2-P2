import { SimboloFuncion } from "./SimboloFuncion";
import { SimboloStruct } from "./SimboloStruct";
import { Simbolo } from "./Simbolo";
import { Type, Types } from "../Utils/Type";
import { Error } from "../Utils/Error";
import { FunctionSt } from "../Instruccion/Funciones/FunctionSt";
import { StructSt } from "../Instruccion/Funciones/StructSt";
import { Parametro } from "../Utils/Parametro";

export class Entorno {

    funciones: Map<string, SimboloFuncion>;
    structs: Map<string, SimboloStruct>;
    variables: Map<string, Simbolo>;
    anterior: Entorno | null;
    size: number;
    break: string | null;
    continue: string | null;
    return: string | null;
    prop : string;
    actualFunc: SimboloFuncion | null;

    constructor(anterior: Entorno | null = null) {
        this.funciones = new Map();
        this.structs = new Map();
        this.variables = new Map();
        this.anterior = anterior;
        this.size = anterior?.size || 0;
        this.break = anterior?.break || null;
        this.return = anterior?.return || null;
        this.continue = anterior?.continue || null;
        this.prop = 'main';
        this.actualFunc = anterior?.actualFunc || null;
    }

    setEnviorementFunc(prop: string, actualFunc : SimboloFuncion, ret : string){
        this.size = 1; //1 porque la posicion 0 es para el return
        this.prop = prop;
        this.return = ret;
        this.actualFunc = actualFunc;
    }

    public addVar(id: string, tipo: Type, isConst: boolean, isRef: boolean): Simbolo | null {
        id = id.toLowerCase();
        if (this.variables.get(id) != undefined) {
            return null;
        }
        const nuevaVariable = new Simbolo(tipo, id, this.size++, isConst, this.anterior == null, isRef);
        this.variables.set(id, nuevaVariable);
        return nuevaVariable;
    }

    public addFuncion(funcion: FunctionSt, idUnico: string) : boolean{
        if(this.funciones.has(funcion.id.toLowerCase())){
            return false;
        }
        this.funciones.set(funcion.id.toLowerCase(),new SimboloFuncion(funcion,idUnico));
        return true;
    }

    public addStruct(id: string, size: number, params: Array<Parametro>) : boolean{
        if(this.structs.has(id.toLocaleLowerCase())){
            return false;
        }
        this.structs.set(id.toLowerCase(),new SimboloStruct(id.toLowerCase(),size,params));
        return true;
    }

    public getVariable(id: string) : Simbolo | null{
        let entorno : Entorno | null = this;
        id = id.toLowerCase();
        while(entorno != null){
            const simbolo = entorno.variables.get(id);
            if(simbolo != undefined){
                return simbolo;
            }
            entorno = entorno.anterior;
        }
        return null;
    }

    public getFuncion(id: string) : SimboloFuncion | undefined{
        return this.funciones.get(id.toLocaleLowerCase());
    }

    public buscarFuncion(id: string) : SimboloFuncion | null{
        let entorno : Entorno | null = this;
        id = id.toLowerCase();
        while(entorno != null){
            const simbolo = entorno.funciones.get(id);
            if(simbolo != undefined){
                return simbolo;
            }
            entorno = entorno.anterior;
        }
        return null;
    }

    public getStruct(id: string){
        return this.structs.get(id.toLocaleLowerCase());
    }

    public buscarStruct(id: string) : SimboloStruct | null{
        let entorno : Entorno | null = this;
        id = id.toLowerCase();
        while(entorno != null){
            const simbolo = entorno.structs.get(id);
            if(simbolo != undefined){
                return simbolo;
            }
            entorno = entorno.anterior;
        }
        return null;
    }
}