import { Expresion } from "../../Abstracto/Expresion";
import { Types, Type } from "../../Utils/Type";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Retorno } from "../../Utils/Retorno";
import { Generador } from "../../Generador/Generador";

export class StringL extends Expresion {
    private tipo: Types;
    private valor: any;

    constructor(tipo: Types, valor:any, linea: number, columna: number) {
        super(linea, columna);
        this.tipo = tipo;
        this.valor = valor;
    }

    public compilar(entorno: Entorno): Retorno {
        const generador = Generador.getInstancia();
        const temp = generador.newTemporal();
        let valor_string = this.valor.slice(1, -1);
        valor_string = valor_string.replaceAll('\\n', '\n');
        valor_string = valor_string.replaceAll('\\r', '\r');
        valor_string = valor_string.replaceAll('\\t', '\t');
        valor_string = valor_string.replaceAll('\\"', '\"');
        valor_string = valor_string.replaceAll("\\'", '\'');
        valor_string = valor_string.replaceAll("\\\\", '\\');
        generador.addExpresion(temp, 'h');
        for (let i = 0; i < valor_string.length; i++) {
            generador.addSetHeap('h', valor_string.charCodeAt(i));
            generador.nextHeap();
        }
        generador.addSetHeap('h', '-1');
        generador.nextHeap();
        return new Retorno(temp, true, new Type(this.tipo, 'String'));
    }
}