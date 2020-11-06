import { Expresion } from "../../Abstracto/Expresion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Retorno } from "../../Utils/Retorno";
import { Error_ } from 'src/interprete/Errores/Error';
import { log, types } from "util";
import { Generador } from "../../Generador/Generador";
import { Types, Type } from "../../Utils/Type";


export class NuevoStruct extends Expresion {
    private id: string;

    constructor(id: string, line: number, column: number) {
        super(line, column);
        this.id = id;
    }

    compilar(enviorement: Entorno): Retorno {
        const symStruct = enviorement.buscarStruct(this.id);
        const generator = Generador.getInstancia();
        if (symStruct == null)
            throw new Error_(this.linea, this.columna, 'Semantico', `No existe el struct ${this.id} en este ambito`);
        const temp = generator.newTemporal();
        generator.addExpresion(temp, 'h', '', '');
        //Llenar de valores por defecto
        symStruct.atributos.forEach((attribute) => {
            switch (attribute.tipo.nombreTipo) {
                case Types.NUMBER:
                case Types.BOOLEAN:
                    generator.addSetHeap('h', '0');
                    break;
                case Types.STRING:
                case Types.STRUCT:
                case Types.ARRAY:
                    generator.addSetHeap('h','-1');
            }
            generator.nextHeap();
        });
        return new Retorno(temp,true,new Type(Types.STRUCT,symStruct.id,symStruct));
    }
}