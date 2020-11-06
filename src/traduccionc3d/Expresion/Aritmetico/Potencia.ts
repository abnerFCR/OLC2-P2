import { Expresion } from "../../Abstracto/Expresion";
import { Generador } from "../../Generador/Generador";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Type, Types } from "../../Utils/Type";
import { Error_ } from 'src/interprete/Errores/Error';
import { Retorno } from "../../Utils/Retorno";

export class Potencia extends Expresion {
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
            //TODO corregir potencia aca solo hace una suma
            case Types.NUMBER:
                switch (derecha.tipo.nombreTipo) {
                    case Types.NUMBER:
                        const tempAux = generador.newTemporal(); generador.liberarTemporal(tempAux);
                        generador.addExpresion(tempAux, 'p', entorno.size + 1, '+');
                        generador.addSetStack(tempAux, izquierda.getValor());
                        generador.addExpresion(tempAux, tempAux, '1', '+');
                        generador.addSetStack(tempAux, derecha.getValor());
                        generador.addSiguienteEntorno(entorno.size);
                        generador.addCall('nativa_potencia');
                        generador.addGetStack(temp, 'p');
                        generador.addAnteriorEntorno(entorno.size);
                        return new Retorno(temp, true, izquierda.tipo);
                    default:
                        break;
                }
        }
        throw new Error_(this.linea, this.columna, 'Semantico', `No se puede modular ${izquierda.tipo.nombreTipo} % ${derecha.tipo.nombreTipo}`);
    }
}