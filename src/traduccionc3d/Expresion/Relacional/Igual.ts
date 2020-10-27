import { Expresion } from "../../Abstracto/Expresion";
import { Error } from "../../Utils/Error";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Retorno } from "../../Utils/Retorno";
import { Generador } from "../../Generador/Generador";
import { Type, Types } from "../../Utils/Type";

export class Equals extends Expresion {
    private left: Expresion;
    private right: Expresion;

    constructor(left: Expresion, right: Expresion, line: number, column: number) {
        super(line, column);
        this.left = left;
        this.right = right;
    }

    compilar(enviorement: Entorno): Retorno {
        const left = this.left.compilar(enviorement);
        let right : Retorno | null = null;
        const generator = Generador.getInstancia();
        switch (left.tipo.nombreTipo) {
            case Types.NUMBER:
                right = this.right.compilar(enviorement);
                switch (right.tipo.nombreTipo) {
                    case Types.NUMBER:
                        this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generator.newEtiqueta() : this.etiquetaVerdadero;
                        this.etiquetaFalso = this.etiquetaFalso == '' ? generator.newEtiqueta() : this.etiquetaFalso;
                        generator.addIf(left.getValor(), right.getValor(), '==', this.etiquetaVerdadero);
                        generator.addGoto(this.etiquetaFalso);
                        const retorno = new Retorno('', false, new Type(Types.BOOLEAN));
                        retorno.etiquetaVerdadero = this.etiquetaVerdadero;
                        retorno.etiquetaFalso = this.etiquetaFalso;
                        return retorno;
                    default:
                        break;
                }
            case Types.BOOLEAN:
                const trueLabel = generator.newEtiqueta();
                const falseLabel = generator.newEtiqueta();

                generator.addEtiqueta(left.etiquetaVerdadero);
                this.right.etiquetaVerdadero = trueLabel;
                this.right.etiquetaFalso = falseLabel;
                right = this.right.compilar(enviorement);                

                generator.addEtiqueta(left.etiquetaFalso);
                this.right.etiquetaVerdadero = falseLabel;
                this.right.etiquetaFalso = trueLabel;
                right = this.right.compilar(enviorement);
                if(right.tipo.nombreTipo = Types.BOOLEAN){
                    const retorno = new Retorno('',false,left.tipo);
                    retorno.etiquetaVerdadero = trueLabel;
                    retorno.etiquetaFalso = falseLabel;
                    return retorno;
                }
                break;
            case Types.STRING:
                right = this.right.compilar(enviorement);
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
                        generator.addIf(temp, '1', '==', this.etiquetaVerdadero);
                        generator.addGoto(this.etiquetaFalso);
                        const retorno = new Retorno('', false, new Type(Types.BOOLEAN));
                        retorno.etiquetaVerdadero = this.etiquetaVerdadero;
                        retorno.etiquetaFalso = this.etiquetaFalso;
                        return retorno;
                    }
                    case Types.NULL: {
                        this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generator.newEtiqueta() : this.etiquetaVerdadero;
                        this.etiquetaFalso = this.etiquetaFalso == '' ? generator.newEtiqueta() : this.etiquetaFalso;
                        generator.addIf(left.getValor(), right.getValor(), '==', this.etiquetaVerdadero);
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
                right = this.right.compilar(enviorement);
                switch (right.tipo.nombreTipo) {
                    case Types.STRING:
                    case Types.ARRAY:
                    case Types.STRUCT:
                    case Types.NULL:
                        this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generator.newEtiqueta() : this.etiquetaVerdadero;
                        this.etiquetaFalso = this.etiquetaFalso == '' ? generator.newEtiqueta() : this.etiquetaFalso;
                        generator.addIf(left.getValor(), right.getValor(), '==', this.etiquetaVerdadero);
                        generator.addGoto(this.etiquetaFalso);
                        const retorno = new Retorno('', false, new Type(Types.BOOLEAN));
                        retorno.etiquetaVerdadero = this.etiquetaVerdadero;
                        retorno.etiquetaFalso = this.etiquetaFalso;
                        return retorno;
                    default:
                        break;    
                }
            case Types.STRUCT:
                right = this.right.compilar(enviorement);
                switch (right.tipo.nombreTipo) {
                    case Types.STRUCT:                    
                    case Types.NULL:
                        this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generator.newEtiqueta() : this.etiquetaVerdadero;
                        this.etiquetaFalso = this.etiquetaFalso == '' ? generator.newEtiqueta() : this.etiquetaFalso;
                        generator.addIf(left.getValor(), right.getValor(), '==', this.etiquetaVerdadero);
                        generator.addGoto(this.etiquetaFalso);
                        const retorno = new Retorno('', false, new Type(Types.BOOLEAN));
                        retorno.etiquetaVerdadero = this.etiquetaVerdadero;
                        retorno.etiquetaFalso = this.etiquetaFalso;
                        return retorno;
                    default:
                        break;
                }
            case Types.ARRAY:
                right = this.right.compilar(enviorement);
                switch (right.tipo.nombreTipo) {
                    case Types.ARRAY:                    
                    case Types.NULL:
                        this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generator.newEtiqueta() : this.etiquetaVerdadero;
                        this.etiquetaFalso = this.etiquetaFalso == '' ? generator.newEtiqueta() : this.etiquetaFalso;
                        generator.addIf(left.getValor(), right.getValor(), '==', this.etiquetaVerdadero);
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
        throw new Error(this.linea, this.columna, 'Semantico', `No se puede ${left.tipo.nombreTipo} == ${right?.tipo.nombreTipo}`);
    }
}