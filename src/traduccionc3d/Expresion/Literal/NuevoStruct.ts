import { Expresion } from "../../Abstract/Expresion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Retorno } from "../../Utils/Retorno";
import { Error } from "../../Utils/Error";
import { log, types } from "util";
import { Generador } from "../../Generador/Generador";
import { Types, Type } from "../../Utils/Type";

export class NewStruct extends Expresion {
    private id: string;

    constructor(id: string, line: number, column: number) {
        super(line, column);
        this.id = id;
    }

    compile(enviorement: Entorno): Retorno {
        const symStruct = enviorement.searchStruct(this.id);
        const generator = Generador.getInstancia();
        if (symStruct == null)
            throw new Error(this.line, this.column, 'Semantico', `No existe el struct ${this.id} en este ambito`);
        const temp = generator.newTemporal();
        generator.addExpresion(temp, 'h', '', '');
        //Llenar de valores por defecto
        symStruct.attributes.forEach((attribute) => {
            switch (attribute.tipo.nombreTipo) {
                case Types.INTEGER:
                case Types.DOUBLE:
                case Types.CHAR:
                case Types.BOOLEAN:
                    generator.addSetHeap('h', '0');
                    break;
                case Types.STRING:
                case Types.STRUCT:
                case Types.ARRAY:
                    generator.addSetHeap('h','-1');
            }
            generator.nextHeap();
        })
        return new Retorno(temp,true,new Type(Types.STRUCT,symStruct.identifier,symStruct));
    }
}