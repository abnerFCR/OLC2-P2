import { Expresion } from "../../Abstracto/Expresion";
import { Generador } from "../../Generador/Generador";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Retorno } from "../../Utils/Retorno";
import { Error } from "../../Utils/Error";
import { Types, Type } from "../../Utils/Type";

export class Division extends Expresion {
    private izquierda: Expresion;
    private derecha: Expresion;

    constructor(izquierda: Expresion, derecha: Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.izquierda = izquierda;
        this.derecha = derecha;
    }

    public compilar(entorno: Entorno): Retorno {
        const izquierda = this.izquierda.compilar(entorno);
        const derecha = this.derecha.compilar(entorno);
        const generador = Generador.getInstancia();
        const temp = generador.newTemporal();
        switch (izquierda.tipo.nombreTipo) {
            case Types.NUMBER:
                switch (derecha.tipo.nombreTipo) {
                    case Types.NUMBER:
                        //TODO error division entre 0: es posible que se pueda desde la gramatica
                        generador.addExpresion(temp, izquierda.getValor(), derecha.getValor(), '/');
                        return new Retorno(temp, true, new Type(Types.NUMBER));
                    default:
                        break;
                }
        }
        throw new Error(this.linea, this.columna, 'Semantico', `No se puede dividir ${izquierda.tipo.nombreTipo} / ${derecha.tipo.nombreTipo}`);
    }
}