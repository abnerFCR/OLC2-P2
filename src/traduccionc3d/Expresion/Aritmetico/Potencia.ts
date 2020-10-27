import { Expresion } from "../../Abstracto/Expresion";
import { Generador } from "../../Generador/Generador";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Type, Types } from "../../Utils/Type";
import { Error } from "../../Utils/Error";
import { Retorno } from "../../Utils/Retorno";

export class Potencia extends Expresion {
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
            //TODO corregir potencia aca solo hace una suma
            case Types.NUMBER:
                switch (right.tipo.nombreTipo) {
                    case Types.NUMBER:
                        const tempAux = generator.newTemporal(); generator.liberarTemporal(tempAux);
                        generator.addExpresion(tempAux, 'p', enviorement.size + 1, '+');
                        generator.addSetStack(tempAux, left.getValor());
                        generator.addExpresion(tempAux, tempAux, '1', '+');
                        generator.addSetStack(tempAux, right.getValor());
                        generator.addSiguienteEntorno(enviorement.size);
                        generator.addCall('native_pot');
                        generator.addGetStack(temp, 'p');
                        generator.addAnteriorEntorno(enviorement.size);
                        return new Retorno(temp, true, left.tipo);
                    default:
                        break;
                }
        }
        throw new Error(this.linea, this.columna, 'Semantico', `No se puede modular ${left.tipo.nombreTipo} % ${right.tipo.nombreTipo}`);
    }
}