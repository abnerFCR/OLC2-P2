import { Expresion } from "../../Abstracto/Expresion";
import { Retorno } from "../../Utils/Retorno";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Types, Type } from "../../Utils/Type";
import { Generador } from "../../Generador/Generador";
import { Error } from "../../Utils/Error";

export class Greater extends Expresion{
    private left: Expresion;
    private right: Expresion;
    private isGrtEqual: boolean;

    constructor(isGrtEqual: boolean, left: Expresion, right: Expresion, line: number, column: number) {
        super(line, column);
        this.left = left;
        this.right = right;
        this.isGrtEqual = isGrtEqual; 
    }

    compilar(enviorement: Entorno): Retorno {
        const left = this.left.compilar(enviorement);
        const right = this.right.compilar(enviorement);

        const lefType = left.tipo.nombreTipo;
        const rightType = right.tipo.nombreTipo;

        if ((lefType == Types.NUMBER) && (rightType == Types.NUMBER)) {
            const generator = Generador.getInstancia();
            this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generator.newEtiqueta() : this.etiquetaVerdadero;
            this.etiquetaFalso = this.etiquetaFalso == '' ? generator.newEtiqueta() : this.etiquetaFalso;
            if(this.isGrtEqual){
                generator.addIf(left.getValor(),right.getValor(),'>=',this.etiquetaVerdadero);
            }
            else{
                generator.addIf(left.getValor(),right.getValor(),'>',this.etiquetaVerdadero);
            }
            generator.addGoto(this.etiquetaFalso);
            const retorno = new Retorno('',false,new Type(Types.BOOLEAN));
            retorno.etiquetaVerdadero = this.etiquetaVerdadero;
            retorno.etiquetaFalso = this.etiquetaFalso;
            return retorno;
        }
        throw new Error(this.linea, this.columna, 'Semantico', `No se puede ${lefType} > ${rightType}`);
    }
}