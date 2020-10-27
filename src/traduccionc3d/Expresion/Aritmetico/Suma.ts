import { Expresion } from "../../Abstracto/Expresion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Retorno } from "../../Utils/Retorno";
import { Generador } from "../../Generador/Generador";
import { Types, Type } from "../../Utils/Type";
import { Error } from "../../Utils/Error";

export class Suma extends Expresion {
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
        const generator = Generador.getInstancia();
        const temp = generator.newTemporal();
        switch (izquierda.tipo.nombreTipo) {
            case Types.NUMBER:
                switch (derecha.tipo.nombreTipo) {
                    case Types.NUMBER:
                        generator.addExpresion(temp, izquierda.getValor(), derecha.getValor(), '+');
                        return new Retorno(temp, true, izquierda.tipo);
                    case Types.STRING:
                        const tempAux = generator.newTemporal(); generator.liberarTemporal(tempAux); //?? crea el temporal y despues lo libera al parecer no hay que declararlo
                        generator.addExpresion(tempAux,'p',entorno.size + 1, '+');
                        generator.addSetStack(tempAux,izquierda.getValor());
                        generator.addExpresion(tempAux,tempAux,'1','+');
                        generator.addSetStack(tempAux,derecha.getValor());
                        generator.addSiguienteEntorno(entorno.size);
                        generator.addCall('native_concat_dbl_str');
                        generator.addGetStack(temp,'p');
                        generator.addAnteriorEntorno(entorno.size);
                        return new Retorno(temp, true, new Type(Types.STRING));
                    default:
                        break;
                }
            case Types.STRING:
                const tempAux = generator.newTemporal(); generator.liberarTemporal(tempAux);
                switch (derecha.tipo.nombreTipo) {
                    case Types.NUMBER:
                        generator.addExpresion(tempAux,'p',entorno.size + 1, '+');
                        generator.addSetStack(tempAux,izquierda.getValor());
                        generator.addExpresion(tempAux,tempAux,'1','+');
                        generator.addSetStack(tempAux,derecha.getValor());
                        generator.addSiguienteEntorno(entorno.size);
                        generator.addCall('native_concat_str_dbl');
                        generator.addGetStack(temp,'p');
                        generator.addAnteriorEntorno(entorno.size);
                        return new Retorno(temp, true, new Type(Types.STRING));
                    case Types.STRING:
                        generator.addExpresion(tempAux,'p',entorno.size + 1, '+');
                        generator.addSetStack(tempAux,izquierda.getValor());
                        generator.addExpresion(tempAux,tempAux,'1','+');
                        generator.addSetStack(tempAux,derecha.getValor());
                        generator.addSiguienteEntorno(entorno.size);
                        generator.addCall('native_concat_str_str');
                        generator.addGetStack(temp,'p');
                        generator.addAnteriorEntorno(entorno.size);
                        return new Retorno(temp, true, new Type(Types.STRING));
                    case Types.BOOLEAN:
                        const lblTemp = generator.newEtiqueta();
                        generator.addExpresion(tempAux,'p',entorno.size + 1, '+');
                        generator.addSetStack(tempAux,izquierda.getValor());
                        generator.addExpresion(tempAux,tempAux,'1','+');

                        generator.addEtiqueta(derecha.etiquetaVerdadero);
                        generator.addSetStack(tempAux,'1');
                        generator.addGoto(lblTemp);

                        generator.addEtiqueta(derecha.etiquetaFalso);
                        generator.addSetStack(tempAux,'0');
                        generator.addEtiqueta(lblTemp);

                        generator.addSiguienteEntorno(entorno.size);
                        generator.addCall('native_concat_str_bol');
                        generator.addGetStack(temp,'p');
                        generator.addAnteriorEntorno(entorno.size);
                        return new Retorno(temp, true, new Type(Types.STRING));

                    default:
                        break;
                }
            case Types.BOOLEAN:
                switch (derecha.tipo.nombreTipo) {
                    case Types.STRING:
                        const tempAux = generator.newTemporal(); generator.liberarTemporal(tempAux);
                        const lblTemp = generator.newEtiqueta();
                        generator.addExpresion(tempAux,'p',entorno.size + 1, '+');
                        generator.addEtiqueta(izquierda.etiquetaVerdadero);
                        generator.addSetStack(tempAux,'1');
                        generator.addGoto(lblTemp);
                        generator.addEtiqueta(izquierda.etiquetaFalso);
                        generator.addSetStack(tempAux,'0');
                        generator.addEtiqueta(lblTemp);
                        generator.addExpresion(tempAux,tempAux,'1','+');
                        generator.addSetStack(tempAux,derecha.getValor());
                        generator.addSiguienteEntorno(entorno.size);
                        generator.addCall('native_concat_bol_str');
                        generator.addGetStack(temp,'p');
                        generator.addAnteriorEntorno(entorno.size);
                        return new Retorno(temp, true, new Type(Types.STRING));
                    default:
                        break;
                }
        }
        throw new Error(this.linea, this.columna, 'Semantico', `No se puede sumar ${izquierda.tipo.nombreTipo} + ${derecha.tipo.nombreTipo}`);
    }
}