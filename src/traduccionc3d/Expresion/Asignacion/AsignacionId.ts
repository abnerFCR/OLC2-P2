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

    compilar(enviorement: Entorno): Retorno {
        const generator = Generador.getInstancia();
        if (this.anterior == null) {
            const symbol = enviorement.getVariable(this.id);
            if (symbol == null) throw new Error_(this.linea, this.columna, 'Semantico', `No existe la variable ${this.id}`);

            if (symbol.isGlobal) {
                return new Retorno(symbol.posicion + '', false, symbol.tipo, symbol);
            }
            else {
                const temp = generator.newTemporal();
                generator.addExpresion(temp, 'p', symbol.posicion, '+');
                return new Retorno(temp, true, symbol.tipo, symbol);
            }
        }
        else {
            const anterior = this.anterior.compilar(enviorement);
            const symStruct = anterior.tipo.struct;
            if (anterior.tipo.nombreTipo != Types.STRUCT)
                throw new Error_(this.linea, this.columna, 'Semantico', `Acceso no valido para el tipo ${anterior.tipo.nombreTipo}`);

            const attribute = symStruct?.getAtributo(this.id) || anterior.tipo.struct?.getAtributo(this.id);
            if (attribute == undefined || attribute.valor == null)
                throw new Error_(this.linea, this.columna, 'Semantico', `El struct ${symStruct?.id} no tiene el atributo ${this.id}`);

            const tempAux = generator.newTemporal(); generator.liberarTemporal(tempAux);
            const temp = generator.newTemporal();
            if (anterior.simbolo != null && !anterior.simbolo.isHeap) {
                //TODO variables por referencia
                generator.addGetStack(tempAux, anterior.getValor());
            }
            else {
                generator.addGetHeap(tempAux, anterior.getValor());
            }

            generator.addExpresion(temp,tempAux,attribute.index,'+'); 
            return new Retorno(temp,true,attribute.valor.tipo,new Simbolo(attribute.valor.tipo,this.id,attribute.index,false,false,true));
        }
    }
}