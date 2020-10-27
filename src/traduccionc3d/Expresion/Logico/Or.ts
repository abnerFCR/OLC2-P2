import { Expresion } from "../../Abstracto/Expresion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Retorno } from "../../Utils/Retorno";
import { Error } from "../../Utils/Error";
import { Generador } from "../../Generador/Generador";
import { Types } from "../../Utils/Type";

export class Or extends Expresion {
    private left: Expresion;
    private right: Expresion;

    constructor(left: Expresion, right: Expresion, line: number, column: number) {
        super(line, column);
        this.left = left;
        this.right = right;
    }

    compilar(enviorement: Entorno): Retorno {
        const generator = Generador.getInstancia();
        this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generator.newEtiqueta() : this.etiquetaVerdadero;
        this.etiquetaFalso = this.etiquetaFalso == '' ? generator.newEtiqueta() : this.etiquetaFalso;

        this.left.etiquetaVerdadero = this.right.etiquetaVerdadero = this.etiquetaVerdadero;
        this.left.etiquetaFalso = generator.newEtiqueta();
        this.right.etiquetaFalso = this.etiquetaFalso;

        const left = this.left.compilar(enviorement);
        generator.addEtiqueta(this.left.etiquetaFalso);
        const right = this.right.compilar(enviorement);

        if(left.tipo.nombreTipo == Types.BOOLEAN && right.tipo.nombreTipo == Types.BOOLEAN){
            const retorno = new Retorno('',false,left.tipo);
            retorno.etiquetaVerdadero = this.etiquetaVerdadero;
            retorno.etiquetaFalso = this.right.etiquetaFalso;
            return retorno;
        }
        throw new Error(this.linea, this.columna, 'Semantico', `No se puede Or: ${left.tipo.nombreTipo} || ${right.tipo.nombreTipo}`);
    }
}