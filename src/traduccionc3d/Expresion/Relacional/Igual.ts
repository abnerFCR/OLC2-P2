import { Expresion } from "../../Abstracto/Expresion";
import { Error_ } from 'src/interprete/Errores/Error';
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Retorno } from "../../Utils/Retorno";
import { Generador } from "../../Generador/Generador";
import { Type, Types } from "../../Utils/Type";

export class IgualIgual extends Expresion {
    private izquierda: Expresion;
    private derecha: Expresion;

    constructor(izquierda: Expresion, derecha: Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.izquierda = izquierda;
        this.derecha = derecha;
    }

    compilar(entorno: Entorno): Retorno {
        const izquierda = this.izquierda.compilar(entorno);
        let derecha : Retorno | null = null;
        const generador = Generador.getInstancia();
        switch (izquierda.tipo.nombreTipo) {
            case Types.NUMBER:
                derecha = this.derecha.compilar(entorno);
                switch (derecha.tipo.nombreTipo) {
                    case Types.NUMBER:
                        this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generador.newEtiqueta() : this.etiquetaVerdadero;
                        this.etiquetaFalso = this.etiquetaFalso == '' ? generador.newEtiqueta() : this.etiquetaFalso;

                        generador.addIf(izquierda.getValor(), derecha.getValor(), '==', this.etiquetaVerdadero);
                        generador.addGoto(this.etiquetaFalso);
                        
                        const retorno = new Retorno('', false, new Type(Types.BOOLEAN));
                        
                        retorno.etiquetaVerdadero = this.etiquetaVerdadero;
                        retorno.etiquetaFalso = this.etiquetaFalso;
                        
                        return retorno;
                    default:
                        break;
                }
            case Types.BOOLEAN:
                const etiquetaVerdadero = this.etiquetaVerdadero =='' ? generador.newEtiqueta(): this.etiquetaVerdadero;
                const etiquetaFalso = this.etiquetaFalso=='' ? generador.newEtiqueta(): this.etiquetaFalso;
                                                                            // cuando compilo izquierda me devuelve un goto a la etiqueta de su valor sea V o F
                generador.addEtiqueta(izquierda.etiquetaVerdadero);         // a;ado la etiqueta verdadero de izquierda 
                this.derecha.etiquetaVerdadero = etiquetaVerdadero;
                this.derecha.etiquetaFalso = etiquetaFalso;
                derecha = this.derecha.compilar(entorno);                   // cuando compilo derecha me devuelde un goto a la etiqueta de su valor sea V o F
                
                generador.addEtiqueta(izquierda.etiquetaFalso);             // a;ado la etiqueta falso de izquierda
                this.derecha.etiquetaVerdadero = etiquetaFalso;
                this.derecha.etiquetaFalso = etiquetaVerdadero;
                
                derecha = this.derecha.compilar(entorno);                   // aca devuelve el goto contrario de cuando compilamos por primera vez derecha
                
                if(derecha.tipo.nombreTipo = Types.BOOLEAN){
                    const retorno = new Retorno('',false,izquierda.tipo);
                    retorno.etiquetaVerdadero = etiquetaVerdadero;
                    retorno.etiquetaFalso = etiquetaFalso;
                    console.log(retorno);
                    return retorno;
                }
                throw new Error_(this.linea, this.columna, 'Semantico', `No se puede ${izquierda.tipo.nombreTipo} == ${derecha?.tipo.nombreTipo}`);
                //break;
            case Types.STRING:
                derecha = this.derecha.compilar(entorno);
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
                        generador.addIf(temp, '1', '==', this.etiquetaVerdadero);
                        generador.addGoto(this.etiquetaFalso);
                        const retorno = new Retorno('', false, new Type(Types.BOOLEAN));
                        retorno.etiquetaVerdadero = this.etiquetaVerdadero;
                        retorno.etiquetaFalso = this.etiquetaFalso;
                        return retorno;
                    }
                    case Types.NULL: {
                        this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generador.newEtiqueta() : this.etiquetaVerdadero;
                        this.etiquetaFalso = this.etiquetaFalso == '' ? generador.newEtiqueta() : this.etiquetaFalso;
                        generador.addIf(izquierda.getValor(), derecha.getValor(), '==', this.etiquetaVerdadero);
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
                derecha = this.derecha.compilar(entorno);
                switch (derecha.tipo.nombreTipo) {
                    case Types.STRING:
                    case Types.ARRAY:
                    case Types.STRUCT:
                    case Types.NULL:
                        this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generador.newEtiqueta() : this.etiquetaVerdadero;
                        this.etiquetaFalso = this.etiquetaFalso == '' ? generador.newEtiqueta() : this.etiquetaFalso;
                        generador.addIf(izquierda.getValor(), derecha.getValor(), '==', this.etiquetaVerdadero);
                        generador.addGoto(this.etiquetaFalso);
                        const retorno = new Retorno('', false, new Type(Types.BOOLEAN));
                        retorno.etiquetaVerdadero = this.etiquetaVerdadero;
                        retorno.etiquetaFalso = this.etiquetaFalso;
                        return retorno;
                    default:
                        break;    
                }
            case Types.STRUCT:
                derecha = this.derecha.compilar(entorno);
                switch (derecha.tipo.nombreTipo) {
                    case Types.STRUCT:                    
                    case Types.NULL:
                        this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generador.newEtiqueta() : this.etiquetaVerdadero;
                        this.etiquetaFalso = this.etiquetaFalso == '' ? generador.newEtiqueta() : this.etiquetaFalso;
                        generador.addIf(izquierda.getValor(), derecha.getValor(), '==', this.etiquetaVerdadero);
                        generador.addGoto(this.etiquetaFalso);
                        const retorno = new Retorno('', false, new Type(Types.BOOLEAN));
                        retorno.etiquetaVerdadero = this.etiquetaVerdadero;
                        retorno.etiquetaFalso = this.etiquetaFalso;
                        return retorno;
                    default:
                        break;
                }
            case Types.ARRAY:
                derecha = this.derecha.compilar(entorno);
                switch (derecha.tipo.nombreTipo) {
                    case Types.ARRAY:                    
                    case Types.NULL:
                        this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generador.newEtiqueta() : this.etiquetaVerdadero;
                        this.etiquetaFalso = this.etiquetaFalso == '' ? generador.newEtiqueta() : this.etiquetaFalso;
                        generador.addIf(izquierda.getValor(), derecha.getValor(), '==', this.etiquetaVerdadero);
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
        throw new Error_(this.linea, this.columna, 'Semantico', `No se puede ${izquierda.tipo.nombreTipo} == ${derecha?.tipo.nombreTipo}`);
    }
}