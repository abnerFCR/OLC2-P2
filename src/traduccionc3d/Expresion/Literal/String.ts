import { Expresion } from "../../Abstracto/Expresion";
import { Types, Type } from "../../Utils/Type";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Retorno } from "../../Utils/Retorno";
import { Generador } from "../../Generador/Generador";

export class StringL extends Expresion {
    private type: Types;
    private value: string;

    constructor(type: Types, value: string, line: number, column: number) {
        super(line, column);
        this.type = type;
        this.value = value;
    }

    public compilar(enviorement: Entorno): Retorno {
        const generator = Generador.getInstancia();
        const temp = generator.newTemporal();
        generator.addExpresion(temp, 'h');
        for (let i = 0; i < this.value.length; i++) {
            generator.addSetHeap('h', this.value.charCodeAt(i));
            generator.nextHeap();
        }
        generator.addSetHeap('h', '-1');
        generator.nextHeap();
        return new Retorno(temp, true, new Type(this.type, 'String'));
    }
}