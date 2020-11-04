import { Expresion } from "../../Abstracto/Expresion";
import { Generador } from "../../Generador/Generador";
import { Retorno } from "../../Utils/Retorno";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Type, Types } from "../../Utils/Type";
import { Error } from "../../Utils/Error";

export class Inverso extends Expresion{
    private valor: Expresion;

    constructor(valor:Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.valor = valor;
    }

    public compilar(entorno: Entorno): Retorno {
        const valor = this.valor.compilar(entorno);
        const generador = Generador.getInstancia();
        const temp = generador.newTemporal();
        switch (valor.tipo.nombreTipo) {
            case Types.NUMBER:
                generador.addExpresion(temp, valor.getValor(), -1, '*');
                return new Retorno(temp, true, valor.tipo);
        }
        throw new Error(this.linea, this.columna, 'Semantico', `No se puede invertir el tipo ${valor.tipo.nombreTipo} * -1`);
    }
}