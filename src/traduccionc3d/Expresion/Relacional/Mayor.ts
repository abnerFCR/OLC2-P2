import { Expresion } from "../../Abstracto/Expresion";
import { Retorno } from "../../Utils/Retorno";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Types, Type } from "../../Utils/Type";
import { Generador } from "../../Generador/Generador";
import { Error_ } from 'src/interprete/Errores/Error';

export class MayorQue extends Expresion{
    private izquierda: Expresion;
    private derecha: Expresion;
    private esMayorIgual: boolean;

    constructor(esMayorIgual: boolean, izquierda: Expresion, derecha: Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.izquierda = izquierda;
        this.derecha = derecha;
        this.esMayorIgual = esMayorIgual; 
    }

    compilar(entorno: Entorno): Retorno {
        const izquierda = this.izquierda.compilar(entorno);
        const derecha = this.derecha.compilar(entorno);

        const tipoIzquierda = izquierda.tipo.nombreTipo;
        const tipoDerecha = derecha.tipo.nombreTipo;

        if ((tipoIzquierda == Types.NUMBER) && (tipoDerecha == Types.NUMBER)) {
            const generador = Generador.getInstancia();
            this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generador.newEtiqueta() : this.etiquetaVerdadero;
            this.etiquetaFalso = this.etiquetaFalso == '' ? generador.newEtiqueta() : this.etiquetaFalso;
            if(this.esMayorIgual){
                generador.addIf(izquierda.getValor(),derecha.getValor(),'>=',this.etiquetaVerdadero);
            }
            else{
                generador.addIf(izquierda.getValor(),derecha.getValor(),'>',this.etiquetaVerdadero);
            }
            generador.addGoto(this.etiquetaFalso);
            const retorno = new Retorno('',false,new Type(Types.BOOLEAN));
            retorno.etiquetaVerdadero = this.etiquetaVerdadero;
            retorno.etiquetaFalso = this.etiquetaFalso;
            return retorno;
        }
        throw new Error_(this.linea, this.columna, 'Semantico', `No se puede ${tipoIzquierda} > ${tipoDerecha}`);
    }
}