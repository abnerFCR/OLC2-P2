import { Expresion } from "../../Abstracto/Expresion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Retorno } from "../../Utils/Retorno";
import { Generador } from "../../Generador/Generador";
import { Types, Type } from "../../Utils/Type";
import { Error } from "../../Utils/Error";
import { StringL } from '../Literal/String';


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
        const generador = Generador.getInstancia();
        const temp = generador.newTemporal();
        switch (izquierda.tipo.nombreTipo) {
            case Types.NUMBER:
                switch (derecha.tipo.nombreTipo) {
                    case Types.NUMBER:
                        generador.addExpresion(temp, izquierda.getValor(), derecha.getValor(), '+');
                        return new Retorno(temp, true, izquierda.tipo);
                    case Types.STRING:
                        generador.addComentario("**inicia concatenacion");
                        const tempAux = generador.newTemporal(); generador.liberarTemporal(tempAux); //?? crea el temporal y despues lo libera al parecer no hay que declararlo
                        generador.addExpresion(tempAux,'p',entorno.size + 1, '+');      //Ta = tamanioEntorno+1        --poner la siguiente posicion del entorno
                        generador.addSetStack(tempAux,izquierda.getValor());
                        generador.addExpresion(tempAux,tempAux,'1','+');                //Ta = Ta + 1                  --preparamos la posicion del segundo parametro
                        generador.addSetStack(tempAux,derecha.getValor());              //stack[ta] = valor derecho     --enviamos el segundo parametro
                        generador.addSiguienteEntorno(entorno.size);                    //pongo el ambito al inicio del siguiente
                        generador.addCall('nativa_conca_number_string');                //llamo a la funcion
                        generador.addGetStack(temp,'p');                                //obtengo el return en el temporal de respuesta.
                        generador.addAnteriorEntorno(entorno.size);                     //regreso el ambito a donde estaba anteriormente
                        generador.addComentario('termina contatenacion');
                        return new Retorno(temp, true, new Type(Types.STRING));         //retorno la respeusta
                    default:
                        break;
                }
            case Types.STRING:
                const tempAux = generador.newTemporal(); generador.liberarTemporal(tempAux);
                switch (derecha.tipo.nombreTipo) {
                    case Types.NUMBER:
                        generador.addExpresion(tempAux,'p',entorno.size + 1, '+');
                        generador.addSetStack(tempAux,izquierda.getValor());
                        generador.addExpresion(tempAux,tempAux,'1','+');
                        generador.addSetStack(tempAux,derecha.getValor());
                        generador.addSiguienteEntorno(entorno.size);
                        generador.addCall('nativa_conca_number_string');
                        generador.addGetStack(temp,'p');
                        generador.addAnteriorEntorno(entorno.size);
                        return new Retorno(temp, true, new Type(Types.STRING));
                    case Types.STRING:
                        generador.addExpresion(tempAux,'p',entorno.size + 1, '+');
                        generador.addSetStack(tempAux,izquierda.getValor());
                        generador.addExpresion(tempAux,tempAux,'1','+');
                        generador.addSetStack(tempAux,derecha.getValor());
                        generador.addSiguienteEntorno(entorno.size);
                        generador.addCall('nativa_conca_string_string');
                        generador.addGetStack(temp,'p');
                        generador.addAnteriorEntorno(entorno.size);
                        return new Retorno(temp, true, new Type(Types.STRING));
                    case Types.BOOLEAN:
                        const lblTemp = generador.newEtiqueta();
                        generador.addExpresion(tempAux,'p',entorno.size + 1, '+');
                        generador.addSetStack(tempAux,izquierda.getValor());
                        generador.addExpresion(tempAux,tempAux,'1','+');

                        generador.addEtiqueta(derecha.etiquetaVerdadero);
                        generador.addSetStack(tempAux,'1');
                        generador.addGoto(lblTemp);

                        generador.addEtiqueta(derecha.etiquetaFalso);
                        generador.addSetStack(tempAux,'0');
                        generador.addEtiqueta(lblTemp);

                        generador.addSiguienteEntorno(entorno.size);
                        generador.addCall('native_concat_str_bol');
                        generador.addGetStack(temp,'p');
                        generador.addAnteriorEntorno(entorno.size);
                        return new Retorno(temp, true, new Type(Types.STRING));

                    default:
                        break;
                }
            case Types.BOOLEAN:
                switch (derecha.tipo.nombreTipo) {
                    case Types.STRING:
                        const tempAux = generador.newTemporal(); generador.liberarTemporal(tempAux);
                        const lblTemp = generador.newEtiqueta();
                        generador.addExpresion(tempAux,'p',entorno.size + 1, '+');
                        generador.addEtiqueta(izquierda.etiquetaVerdadero);
                        generador.addSetStack(tempAux,'1');
                        generador.addGoto(lblTemp);
                        generador.addEtiqueta(izquierda.etiquetaFalso);
                        generador.addSetStack(tempAux,'0');
                        generador.addEtiqueta(lblTemp);
                        generador.addExpresion(tempAux,tempAux,'1','+');
                        generador.addSetStack(tempAux,derecha.getValor());
                        generador.addSiguienteEntorno(entorno.size);
                        generador.addCall('native_concat_bol_str');
                        generador.addGetStack(temp,'p');
                        generador.addAnteriorEntorno(entorno.size);
                        return new Retorno(temp, true, new Type(Types.STRING));
                    default:
                        break;
                }
        }
        throw new Error(this.linea, this.columna, 'Semantico', `No se puede sumar ${izquierda.tipo.nombreTipo} + ${derecha.tipo.nombreTipo}`);
    }
}