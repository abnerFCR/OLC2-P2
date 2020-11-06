import { Expresion } from "../../Abstracto/Expresion";
import { Type, Types } from "../../Utils/Type";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Retorno } from "../../Utils/Retorno";
import { Generador } from "../../Generador/Generador";
import { Error_ } from 'src/interprete/Errores/Error';

export class PrimitivoL extends Expresion {
    private tipo: Types;
    public valor: any;

    constructor(tipo: Types, valor: any, linea: number, columna: number) {
        super(linea, columna);
        this.tipo = tipo;
        this.valor = valor;
    }

    public compilar(entorno: Entorno): Retorno {
        switch (this.tipo) {
            case Types.NUMBER:
                return new Retorno(this.valor,false,new Type(this.tipo));
            case Types.BOOLEAN:
                const generador = Generador.getInstancia();
                const retorno = new Retorno('',false,new Type(this.tipo));
                //const retorno = new Retorno(this.valor,false,new Type(this.tipo));
                this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generador.newEtiqueta() : this.etiquetaVerdadero;
                this.etiquetaFalso = this.etiquetaFalso == '' ? generador.newEtiqueta() : this.etiquetaFalso;
                //
                this.valor ? generador.addGoto(this.etiquetaVerdadero) : generador.addGoto(this.etiquetaFalso);
                retorno.etiquetaVerdadero = this.etiquetaVerdadero;
                retorno.etiquetaFalso = this.etiquetaFalso;
                return retorno;
            case Types.NULL:
                return new Retorno('-1',false,new Type(this.tipo));
            default:
                throw new Error_(this.linea,this.columna,'Semantico','Tipo de dato no reconocido');
        }
    }
}