import { Expresion } from "../../Abstracto/Expresion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Retorno } from "../../Utils/Retorno";
import { Generador } from "../../Generador/Generador";
import { Types } from "../../Utils/Type";
import { Error_ } from 'src/interprete/Errores/Error';

export class Not extends Expresion {
    private value: Expresion;

    constructor(value: Expresion, line: number, column: number) {
        super(line, column);
        this.value = value;
    }

    compilar(enviorement: Entorno): Retorno {
        const generator = Generador.getInstancia();
        this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generator.newEtiqueta() : this.etiquetaVerdadero;
        this.etiquetaFalso = this.etiquetaFalso == '' ? generator.newEtiqueta() : this.etiquetaFalso;

        this.value.etiquetaVerdadero = this.etiquetaFalso;
        this.value.etiquetaFalso = this.etiquetaVerdadero;

        const value = this.value.compilar(enviorement);
        if(value.tipo.nombreTipo == Types.BOOLEAN){
            const retorno = new Retorno('',false,value.tipo);
            retorno.etiquetaVerdadero = this.etiquetaVerdadero;
            retorno.etiquetaFalso = this.etiquetaFalso;
            return retorno;
        }
        throw new Error_(this.linea,this.columna,'Semantico',`No se puede Not del tipo ${value.tipo.nombreTipo}`);
    }
}