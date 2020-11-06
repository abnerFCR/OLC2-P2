import { Expresion } from "../../Abstracto/Expresion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Retorno } from "../../Utils/Retorno";
import { Error_ } from 'src/interprete/Errores/Error';
import { Generador } from "../../Generador/Generador";
import { Types } from "../../Utils/Type";

export class And extends Expresion {
    private izquierda: Expresion;
    private derecha: Expresion;

    constructor(izquierda: Expresion, derecha: Expresion, line: number, columna: number) {
        super(line, columna);
        this.izquierda = izquierda;
        this.derecha = derecha;
    }

    compilar(entorno: Entorno): Retorno {
        const generator = Generador.getInstancia();
        this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generator.newEtiqueta() : this.etiquetaVerdadero;
        this.etiquetaFalso = this.etiquetaFalso == '' ? generator.newEtiqueta() : this.etiquetaFalso;

        this.izquierda.etiquetaVerdadero = generator.newEtiqueta();
        this.derecha.etiquetaVerdadero = this.etiquetaVerdadero;
        this.izquierda.etiquetaFalso = this.derecha.etiquetaFalso = this.etiquetaFalso;

        const izquierda = this.izquierda.compilar(entorno);
        generator.addEtiqueta(this.izquierda.etiquetaVerdadero);
        const derecha = this.derecha.compilar(entorno);

        if(izquierda.tipo.nombreTipo == Types.BOOLEAN && derecha.tipo.nombreTipo == Types.BOOLEAN){
            const retorno = new Retorno('',false,izquierda.tipo);
            retorno.etiquetaVerdadero = this.etiquetaVerdadero;
            retorno.etiquetaFalso = this.derecha.etiquetaFalso;
            return retorno;
        }
        throw new Error_(this.linea, this.columna, 'Semantico', `No se puede And: ${izquierda.tipo.nombreTipo} && ${derecha.tipo.nombreTipo}`);
    }
}