import { Expresion } from "../../Abstracto/Expresion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Retorno } from "../../Utils/Retorno";
import { Generador } from "../../Generador/Generador";
import { Error_ } from 'src/interprete/Errores/Error';
import { Types } from "../../Utils/Type";
import { Simbolo } from "../../TablaSimbolos/Simbolo";

export class AsignacionId extends Expresion {
    private id: string;
    private anterior: Expresion | null;

    constructor(id: string, anterior: Expresion | null, linea: number, columna: number) {
        super(linea, columna);
        this.id = id;
        this.anterior = anterior;
    }

    compilar(entorno: Entorno): Retorno {
        const generador = Generador.getInstancia();
        if (this.anterior == null) {
            const simbolo = entorno.getVariable(this.id);
            if (simbolo == null) throw new Error_(this.linea, this.columna, 'Semantico', `No existe la variable ${this.id}`);

            if (simbolo.isGlobal) {
                return new Retorno(simbolo.posicion + '', false, simbolo.tipo, simbolo);
            }
            else {
                const temp = generador.newTemporal();
                generador.addExpresion(temp, 'p', simbolo.posicion, '+');
                return new Retorno(temp, true, simbolo.tipo, simbolo);
            }
        }
        else {
            const anterior = this.anterior.compilar(entorno);
            const symStruct = anterior.tipo.struct;
            if (anterior.tipo.nombreTipo != Types.STRUCT)
                throw new Error_(this.linea, this.columna, 'Semantico', `Acceso no valido para el tipo ${anterior.tipo.nombreTipo}`);

            const attribute = symStruct?.getAtributo(this.id) || anterior.tipo.struct?.getAtributo(this.id);
            if (attribute == undefined || attribute.valor == null)
                throw new Error_(this.linea, this.columna, 'Semantico', `El struct ${symStruct?.id} no tiene el atributo ${this.id}`);

            const tempAux = generador.newTemporal(); generador.liberarTemporal(tempAux);
            const temp = generador.newTemporal();
            if (anterior.simbolo != null && !anterior.simbolo.isHeap) {
                //TODO variables por referencia
                generador.addGetStack(tempAux, anterior.getValor());
            }
            else {
                generador.addGetHeap(tempAux, anterior.getValor());
            }

            generador.addExpresion(temp,tempAux,attribute.index,'+'); 
            return new Retorno(temp,true,attribute.valor.tipo,new Simbolo(attribute.valor.tipo,this.id,attribute.index,false,false,true));
        }
    }
}