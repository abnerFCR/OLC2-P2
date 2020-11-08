import { Expresion } from "../../Abstracto/Expresion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Generador } from "../../Generador/Generador";
import { Types, Type } from "../../Utils/Type";
import { Error_ } from 'src/interprete/Errores/Error';
import { Retorno } from 'src/traduccionc3d/Utils/Retorno';

export class CharAt extends Expresion {

    private variable: Expresion;
    private indice:Expresion;

    constructor(variable: Expresion,indice:Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.variable = variable;
        this.indice = indice;
    }

    compilar(entorno: Entorno) {
        const variable = this.variable.compilar(entorno);

        const generador = Generador.getInstancia();
        const simbolo = variable.simbolo;

        if (variable.tipo.nombreTipo != Types.STRING) {
            throw new Error_(this.linea, this.columna, 'Semantico', 'La funcion length solo se puede aplicar a tipo de dato string');
        }

        const indice =this.indice.compilar(entorno);
        const simbolo2 = indice.simbolo;
        if (indice.tipo.nombreTipo != Types.NUMBER) {
            throw new Error_(this.linea, this.columna, 'Semantico', 'La funcion necesita un que el indice sea de tipo number');
        }

        let temp = generador.newTemporal();
        if (simbolo?.isGlobal) {

            //generador.addSetStack(simbolo.posicion, valor.getValor());
            let tempAux = generador.newTemporal();
            generador.liberarTemporal(tempAux);

            //cambio simulado
            
            generador.addExpresion(tempAux, 'p', entorno.size + 1, '+');
            generador.addSetStack(tempAux, variable.getValor());
            generador.addExpresion(tempAux, tempAux, 1, '+');
            generador.addSetStack(tempAux, indice.getValor());

            console.log(entorno);
            generador.addSiguienteEntorno(entorno.size);
            generador.addCall('nativa_charAt');
            generador.addGetStack(temp, 'p');
            generador.addAnteriorEntorno(entorno.size);

            return new Retorno(temp, true, new Type(Types.STRING));

        }
        else if (simbolo?.isHeap) {
            let tempAux = generador.newTemporal();
            generador.liberarTemporal(tempAux);

            generador.addExpresion(tempAux, 'p', entorno.size + 1, '+');
            generador.addSetStack(tempAux, variable.getValor());

            generador.addExpresion(tempAux, tempAux, 1, '+');
            generador.addSetStack(tempAux, indice.getValor());
            
            generador.addSiguienteEntorno(entorno.size);
            generador.addCall('nativa_charAt');
            generador.addGetStack(temp, 'p');
            generador.addAnteriorEntorno(entorno.size);
            return new Retorno(temp, true, new Type(Types.STRING));

            //generador.addSetHeap(objetivo.getValor(), valor.getValor());

        }
        else {
            let tempAux = generador.newTemporal();
            generador.liberarTemporal(tempAux);

            generador.addExpresion(tempAux, 'p', entorno.size + 1, '+');
            generador.addSetStack(tempAux, variable.getValor());

            generador.addExpresion(tempAux, tempAux, 1, '+');
            generador.addSetStack(tempAux, indice.getValor());

            generador.addSiguienteEntorno(entorno.size);
            generador.addCall('nativa_charAt');
            generador.addGetStack(temp, 'p');
            generador.addAnteriorEntorno(entorno.size);
            return new Retorno(temp, true, new Type(Types.STRING));
            //generador.addSetStack(objetivo.getValor(), valor.getValor());
        }

    }


}