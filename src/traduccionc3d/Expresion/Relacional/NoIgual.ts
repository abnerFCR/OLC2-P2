import { Expresion } from "../../Abstracto/Expresion";
import { Generador } from "../../Generador/Generador";
import { Retorno } from "../../Utils/Retorno";
import { Error } from "../../Utils/Error";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Types, Type } from "../../Utils/Type";

export class NotEquals extends Expresion{
    private left: Expresion;
    private right: Expresion;

    constructor(left: Expresion, right: Expresion, line: number, column: number) {
        super(line, column);
        this.left = left;
        this.right = right; 
    }

    compilar(enviorement: Entorno): Retorno {
        const left = this.left.compilar(enviorement);
        const right = this.right.compilar(enviorement);
        const generator = Generador.getInstancia();
        switch (left.tipo.nombreTipo) {
            case Types.NUMBER:
                switch (right.tipo.nombreTipo) {
                    case Types.NUMBER:
                        this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generator.newEtiqueta() : this.etiquetaVerdadero;
                        this.etiquetaFalso = this.etiquetaFalso == '' ? generator.newEtiqueta() : this.etiquetaFalso;
                        generator.addIf(left.getValor(), right.getValor(), '<>', this.etiquetaVerdadero);
                        generator.addGoto(this.etiquetaFalso);
                        const retorno = new Retorno('', false, new Type(Types.BOOLEAN));
                        retorno.etiquetaVerdadero = this.etiquetaVerdadero;
                        retorno.etiquetaFalso = this.etiquetaFalso;
                        return retorno;
                    default:
                        break;
                }
            case Types.STRING:
                switch (right.tipo.nombreTipo) {
                    case Types.STRING: {
                        const temp = generator.newTemporal();
                        const tempAux = generator.newTemporal(); generator.liberarTemporal(tempAux);
                        generator.addExpresion(tempAux, 'p', enviorement.size + 1, '+');
                        generator.addSetStack(tempAux, left.getValor());
                        generator.addExpresion(tempAux, tempAux, '1', '+');
                        generator.addSetStack(tempAux, right.getValor());
                        generator.addSiguienteEntorno(enviorement.size);
                        generator.addCall('native_compare_str_str');
                        generator.addGetStack(temp, 'p');
                        generator.addAnteriorEntorno(enviorement.size);

                        this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generator.newEtiqueta() : this.etiquetaVerdadero;
                        this.etiquetaFalso = this.etiquetaFalso == '' ? generator.newEtiqueta() : this.etiquetaFalso;
                        generator.addIf(temp, '1', '<>', this.etiquetaVerdadero);
                        generator.addGoto(this.etiquetaFalso);
                        const retorno = new Retorno('', false, new Type(Types.BOOLEAN));
                        retorno.etiquetaVerdadero = this.etiquetaVerdadero;
                        retorno.etiquetaFalso = this.etiquetaFalso;
                        return retorno;
                    }
                    case Types.NULL: {
                        this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generator.newEtiqueta() : this.etiquetaVerdadero;
                        this.etiquetaFalso = this.etiquetaFalso == '' ? generator.newEtiqueta() : this.etiquetaFalso;
                        generator.addIf(left.getValor(), right.getValor(), '<>', this.etiquetaVerdadero);
                        generator.addGoto(this.etiquetaFalso);
                        const retorno = new Retorno('', false, new Type(Types.BOOLEAN));
                        retorno.etiquetaVerdadero = this.etiquetaVerdadero;
                        retorno.etiquetaFalso = this.etiquetaFalso;
                        return retorno;
                    }
                    default:
                        break;
                }
            case Types.NULL:
                switch (right.tipo.nombreTipo) {
                    case Types.STRING:
                    case Types.ARRAY:
                    case Types.STRUCT:
                    case Types.NULL:
                        this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generator.newEtiqueta() : this.etiquetaVerdadero;
                        this.etiquetaFalso = this.etiquetaFalso == '' ? generator.newEtiqueta() : this.etiquetaFalso;
                        generator.addIf(left.getValor(), right.getValor(), '<>', this.etiquetaVerdadero);
                        generator.addGoto(this.etiquetaFalso);
                        const retorno = new Retorno('', false, new Type(Types.BOOLEAN));
                        retorno.etiquetaVerdadero = this.etiquetaVerdadero;
                        retorno.etiquetaFalso = this.etiquetaFalso;
                        return retorno;
                    default:
                        break;    
                }
            case Types.STRUCT:
                switch (right.tipo.nombreTipo) {
                    case Types.STRUCT:                    
                    case Types.NULL:
                        this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generator.newEtiqueta() : this.etiquetaVerdadero;
                        this.etiquetaFalso = this.etiquetaFalso == '' ? generator.newEtiqueta() : this.etiquetaFalso;
                        generator.addIf(left.getValor(), right.getValor(), '<>', this.etiquetaVerdadero);
                        generator.addGoto(this.etiquetaFalso);
                        const retorno = new Retorno('', false, new Type(Types.BOOLEAN));
                        retorno.etiquetaVerdadero = this.etiquetaVerdadero;
                        retorno.etiquetaFalso = this.etiquetaFalso;
                        return retorno;
                    default:
                        break;
                }
            case Types.ARRAY:
                switch (right.tipo.nombreTipo) {
                    case Types.ARRAY:                    
                    case Types.NULL:
                        this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generator.newEtiqueta() : this.etiquetaVerdadero;
                        this.etiquetaFalso = this.etiquetaFalso == '' ? generator.newEtiqueta() : this.etiquetaFalso;
                        generator.addIf(left.getValor(), right.getValor(), '<>', this.etiquetaVerdadero);
                        generator.addGoto(this.etiquetaFalso);
                        const retorno = new Retorno('', false, new Type(Types.BOOLEAN));
                        retorno.etiquetaVerdadero = this.etiquetaVerdadero;
                        retorno.etiquetaFalso = this.etiquetaFalso;
                        return retorno;
                    default:
                        break;
                }
            default:
        }
        throw new Error(this.linea, this.columna, 'Semantico', `No se puede ${left.tipo.nombreTipo} != ${right.tipo.nombreTipo}`);
    }
}