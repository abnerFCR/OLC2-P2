import { Expresion } from "../../Abstracto/Expresion";
import { Generador } from "../../Generador/Generador";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Error } from "../../Utils/Error";
import { Types, Type } from "../../Utils/Type";
import { Retorno } from "../../Utils/Retorno";

export class Resta extends Expresion {
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
                        generador.addExpresion(temp, izquierda.getValor(), derecha.getValor(), '-');
                        return new Retorno(temp, true, izquierda.tipo);
                    default:
                        break;
                }
        }
        throw new Error(this.linea, this.columna, 'Semantico', `No se puede restar ${izquierda.tipo.nombreTipo} - ${derecha.tipo.nombreTipo}`);
    }
}