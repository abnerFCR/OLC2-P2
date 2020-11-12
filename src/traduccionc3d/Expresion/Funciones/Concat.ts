import { Expresion } from "../../Abstracto/Expresion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Generador } from "../../Generador/Generador";
import { Types, Type } from "../../Utils/Type";
import { Error_ } from 'src/interprete/Errores/Error';
import { Retorno } from 'src/traduccionc3d/Utils/Retorno';

export class Concat extends Expresion {

    private operador1: Expresion;
    private operador2:Expresion;

    constructor(operador1: Expresion,operador2:Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.operador1 = operador1;
        this.operador2 = operador2;
    }

    compilar(entorno: Entorno) {

        const operador1 = this.operador1.compilar(entorno);
        
        const generador = Generador.getInstancia();
        const simbolo = operador1.simbolo;

        if (operador1.tipo.nombreTipo != Types.STRING) {
            throw new Error_(this.linea, this.columna, 'Semantico', 'La funcion concat solo se realiza con tipo de dato string');
        }

        const operador2 =this.operador2.compilar(entorno);
        const simbolo2 = operador2.simbolo;

        if (operador2.tipo.nombreTipo != Types.STRING) {
            throw new Error_(this.linea, this.columna, 'Semantico', 'La funcion concat solo se realiza con tipo de dato string');
        }

        let temp = generador.newTemporal();
        if (simbolo?.isGlobal) {

            //generador.addSetStack(simbolo.posicion, valor.getValor());
            let tempAux = generador.newTemporal();
            generador.liberarTemporal(tempAux);

            //cambio simulado
            
            generador.addExpresion(tempAux, 'p', entorno.size + 1, '+');
            generador.addSetStack(tempAux, operador1.getValor());
            generador.addExpresion(tempAux, tempAux, 1, '+');
            generador.addSetStack(tempAux, operador2.getValor());

            console.log(entorno);
            generador.addSiguienteEntorno(entorno.size);
            generador.addCall('nativa_conca_string_string');
            generador.addGetStack(temp, 'p');
            generador.addAnteriorEntorno(entorno.size);
            return new Retorno(temp, true, new Type(Types.STRING));

        }
        else if (simbolo?.isHeap) {
            let tempAux = generador.newTemporal();
            generador.liberarTemporal(tempAux);

            generador.addExpresion(tempAux, 'p', entorno.size + 1, '+');
            generador.addSetStack(tempAux, operador1.getValor());

            generador.addExpresion(tempAux, tempAux, 1, '+');
            generador.addSetStack(tempAux, operador2.getValor());
            
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
            generador.addSetStack(tempAux, operador1.getValor());

            generador.addExpresion(tempAux, tempAux, 1, '+');
            generador.addSetStack(tempAux, operador2.getValor());

            generador.addSiguienteEntorno(entorno.size);
            generador.addCall('nativa_charAt');
            generador.addGetStack(temp, 'p');
            generador.addAnteriorEntorno(entorno.size);
            return new Retorno(temp, true, new Type(Types.STRING));
            //generador.addSetStack(objetivo.getValor(), valor.getValor());
        }

    }


}