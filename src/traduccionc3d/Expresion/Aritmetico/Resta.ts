import { Expresion } from "../../Abstracto/Expresion";
import { Generador } from "../../Generador/Generador";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Error } from "../../Utils/Error";
import { Types, Type } from "../../Utils/Type";
import { Retorno } from "../../Utils/Retorno";

export class Resta extends Expresion {
    private left: Expresion;
    private right: Expresion;

    constructor(left: Expresion, right: Expresion, line: number, column: number) {
        super(line, column);
        this.left = left;
        this.right = right;
    }

    public compilar(enviorement: Entorno): Retorno {
        const left = this.left.compilar(enviorement);
        const right = this.right.compilar(enviorement);
        const generator = Generador.getInstancia();
        const temp = generator.newTemporal();
        switch (left.tipo.nombreTipo) {
            case Types.NUMBER:
                switch (right.tipo.nombreTipo) {
                    case Types.NUMBER:
                        generator.addExpresion(temp, left.getValor(), right.getValor(), '-');
                        return new Retorno(temp, true, left.tipo);
                    default:
                        break;
                }
        }
        throw new Error(this.linea, this.columna, 'Semantico', `No se puede restar ${left.tipo.nombreTipo} - ${right.tipo.nombreTipo}`);
    }
}