import { Expresion } from "../../Abstracto/Expresion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Retorno } from "../../Utils/Retorno";
import { Generador } from "../../Generador/Generador";
import { Error } from "../../Utils/Error";
import { Types, Type } from "../../Utils/Type";
import { Simbolo } from "../../TablaSimbolos/Simbolo";

export class AccessId extends Expresion {
    private id: string;
    private anterior: Expresion | null;

    constructor(id: string, anterior: Expresion | null, linea: number, columna: number) {
        super(linea, columna);
        this.id = id;
        this.anterior = anterior;
    }

    compilar(entorno: Entorno): Retorno {
        const generator = Generador.getInstancia();
        if (this.anterior == null) {
            let simbolo = entorno.getVariable(this.id);
            if (simbolo == null) {
                throw new Error(this.linea, this.columna, 'Semantico', `No existe la variable: ${this.id}`);
            }
            const temp = generator.newTemporal();
            if (simbolo.isGlobal) {
                generator.addGetStack(temp, simbolo.posicion);
                if (simbolo.tipo.nombreTipo != Types.BOOLEAN) return new Retorno(temp, true, simbolo.tipo, simbolo);

                const retorno = new Retorno('', false, simbolo.tipo,simbolo);
                this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generator.newEtiqueta() : this.etiquetaVerdadero;
                this.etiquetaFalso = this.etiquetaFalso == '' ? generator.newEtiqueta() : this.etiquetaFalso;
                generator.addIf(temp, '1', '==', this.etiquetaVerdadero);
                generator.addGoto(this.etiquetaFalso);
                retorno.etiquetaVerdadero = this.etiquetaVerdadero;
                retorno.etiquetaFalso = this.etiquetaFalso;
                return retorno;
            }
            else {
                const tempAux = generator.newTemporal(); generator.liberarTemporal(tempAux);
                generator.addExpresion(tempAux, 'p', simbolo.posicion, '+');
                generator.addGetStack(temp, tempAux);
                if (simbolo.tipo.nombreTipo != Types.BOOLEAN) return new Retorno(temp, true, simbolo.tipo, simbolo);

                const retorno = new Retorno('', false, simbolo.tipo);
                this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generator.newEtiqueta() : this.etiquetaVerdadero;
                this.etiquetaFalso = this.etiquetaFalso == '' ? generator.newEtiqueta() : this.etiquetaFalso;
                generator.addIf(temp, '1', '==', this.etiquetaVerdadero);
                generator.addGoto(this.etiquetaFalso);
                retorno.etiquetaVerdadero = this.etiquetaVerdadero;
                retorno.etiquetaFalso = this.etiquetaFalso;
                return retorno;
            }
        }
        else {
            //TODO faltan booleanos
            const anterior = this.anterior.compilar(entorno);
            const symStruct = anterior.tipo.struct;
            if (anterior.tipo.nombreTipo != Types.STRUCT || symStruct == null)
                throw new Error(this.linea, this.columna, 'Semantico', `Acceso no valido para el tipo ${anterior.tipo.nombreTipo}`);
            const attribute = symStruct.getAtributo(this.id);
            if (attribute.valor == null)
                throw new Error(this.linea, this.columna, 'Semantico', `El struct ${symStruct.id} no tiene el atributo ${this.id}`);

            const tempAux = generator.newTemporal(); generator.liberarTemporal(tempAux);
            const temp = generator.newTemporal();

            generator.addExpresion(tempAux, anterior.getValor(), attribute.index, '+'); //Busca la posicion del atributo
            generator.addGetHeap(temp, tempAux); //Trae el valor del heap

            return new Retorno(temp, true, attribute.valor.tipo);
        }
    }
}