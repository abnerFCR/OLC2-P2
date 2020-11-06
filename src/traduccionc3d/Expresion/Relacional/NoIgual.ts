import { Expresion } from "../../Abstracto/Expresion";
import { Generador } from "../../Generador/Generador";
import { Retorno } from "../../Utils/Retorno";
import { Error_ } from 'src/interprete/Errores/Error';
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Types, Type } from "../../Utils/Type";

export class NoIgual extends Expresion{
    private izquierda: Expresion;
    private derecha: Expresion;

    constructor(izquierda: Expresion, derecha: Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.izquierda = izquierda;
        this.derecha = derecha; 
    }
    

    compilar(entorno: Entorno): Retorno {
        const izquierda = this.izquierda.compilar(entorno);
        const derecha = this.derecha.compilar(entorno);
        const generador = Generador.getInstancia();
        switch (izquierda.tipo.nombreTipo) {
            case Types.NUMBER:
                switch (derecha.tipo.nombreTipo) {
                    case Types.NUMBER:
                        this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generador.newEtiqueta() : this.etiquetaVerdadero;
                        this.etiquetaFalso = this.etiquetaFalso == '' ? generador.newEtiqueta() : this.etiquetaFalso;
                        generador.addIf(izquierda.getValor(), derecha.getValor(), '!=', this.etiquetaVerdadero);
                        generador.addGoto(this.etiquetaFalso);
                        const retorno = new Retorno('', false, new Type(Types.BOOLEAN));
                        retorno.etiquetaVerdadero = this.etiquetaVerdadero;
                        retorno.etiquetaFalso = this.etiquetaFalso;
                        return retorno;
                    default:
                        break;
                }
            case Types.STRING:
                switch (derecha.tipo.nombreTipo) {
                    case Types.STRING: {
                        const temp = generador.newTemporal();
                        const tempAux = generador.newTemporal(); generador.liberarTemporal(tempAux);
                        generador.addExpresion(tempAux, 'p', entorno.size + 1, '+');
                        generador.addSetStack(tempAux, izquierda.getValor());
                        generador.addExpresion(tempAux, tempAux, '1', '+');
                        generador.addSetStack(tempAux, derecha.getValor());
                        generador.addSiguienteEntorno(entorno.size);
                        generador.addCall('nativa_comparar_string');
                        generador.addGetStack(temp, 'p');
                        generador.addAnteriorEntorno(entorno.size);

                        this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generador.newEtiqueta() : this.etiquetaVerdadero;
                        this.etiquetaFalso = this.etiquetaFalso == '' ? generador.newEtiqueta() : this.etiquetaFalso;
                        generador.addIf(temp, '1', '!=', this.etiquetaVerdadero);
                        generador.addGoto(this.etiquetaFalso);
                        const retorno = new Retorno('', false, new Type(Types.BOOLEAN));
                        retorno.etiquetaVerdadero = this.etiquetaVerdadero;
                        retorno.etiquetaFalso = this.etiquetaFalso;
                        return retorno;
                    }
                    case Types.NULL: {
                        this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generador.newEtiqueta() : this.etiquetaVerdadero;
                        this.etiquetaFalso = this.etiquetaFalso == '' ? generador.newEtiqueta() : this.etiquetaFalso;
                        generador.addIf(izquierda.getValor(), derecha.getValor(), '!=', this.etiquetaVerdadero);
                        generador.addGoto(this.etiquetaFalso);
                        const retorno = new Retorno('', false, new Type(Types.BOOLEAN));
                        retorno.etiquetaVerdadero = this.etiquetaVerdadero;
                        retorno.etiquetaFalso = this.etiquetaFalso;
                        return retorno;
                    }
                    default:
                        break;
                }
            case Types.NULL:
                switch (derecha.tipo.nombreTipo) {
                    case Types.STRING:
                    case Types.ARRAY:
                    case Types.STRUCT:
                    case Types.NULL:
                        this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generador.newEtiqueta() : this.etiquetaVerdadero;
                        this.etiquetaFalso = this.etiquetaFalso == '' ? generador.newEtiqueta() : this.etiquetaFalso;
                        generador.addIf(izquierda.getValor(), derecha.getValor(), '!=', this.etiquetaVerdadero);
                        generador.addGoto(this.etiquetaFalso);
                        const retorno = new Retorno('', false, new Type(Types.BOOLEAN));
                        retorno.etiquetaVerdadero = this.etiquetaVerdadero;
                        retorno.etiquetaFalso = this.etiquetaFalso;
                        return retorno;
                    default:
                        break;    
                }
            case Types.STRUCT:
                switch (derecha.tipo.nombreTipo) {
                    case Types.STRUCT:                    
                    case Types.NULL:
                        this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generador.newEtiqueta() : this.etiquetaVerdadero;
                        this.etiquetaFalso = this.etiquetaFalso == '' ? generador.newEtiqueta() : this.etiquetaFalso;
                        generador.addIf(izquierda.getValor(), derecha.getValor(), '!=', this.etiquetaVerdadero);
                        generador.addGoto(this.etiquetaFalso);
                        const retorno = new Retorno('', false, new Type(Types.BOOLEAN));
                        retorno.etiquetaVerdadero = this.etiquetaVerdadero;
                        retorno.etiquetaFalso = this.etiquetaFalso;
                        return retorno;
                    default:
                        break;
                }
            case Types.ARRAY:
                switch (derecha.tipo.nombreTipo) {
                    case Types.ARRAY:                    
                    case Types.NULL:
                        this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generador.newEtiqueta() : this.etiquetaVerdadero;
                        this.etiquetaFalso = this.etiquetaFalso == '' ? generador.newEtiqueta() : this.etiquetaFalso;
                        generador.addIf(izquierda.getValor(), derecha.getValor(), '!=', this.etiquetaVerdadero);
                        generador.addGoto(this.etiquetaFalso);
                        const retorno = new Retorno('', false, new Type(Types.BOOLEAN));
                        retorno.etiquetaVerdadero = this.etiquetaVerdadero;
                        retorno.etiquetaFalso = this.etiquetaFalso;
                        return retorno;
                    default:
                        break;
                }
            default:
        }
        throw new Error_(this.linea, this.columna, 'Semantico', `No se puede ${izquierda.tipo.nombreTipo} != ${derecha.tipo.nombreTipo}`);
    }
}