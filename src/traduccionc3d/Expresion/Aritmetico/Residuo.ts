import { Expresion } from "../../Abstracto/Expresion";
import { Retorno } from "../../Utils/Retorno";
import { Generador } from "../../Generador/Generador";
import { Types, Type } from "../../Utils/Type";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Error } from "../../Utils/Error";

export class Residuo extends Expresion{
    private izquierda: Expresion;
    private derecha: Expresion;

    constructor(izquierda: Expresion, derecha: Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.izquierda = izquierda;
        this.derecha = derecha;
    }

    public compilar(enviorement: Entorno): Retorno {
        const izquierda = this.izquierda.compilar(enviorement);
        const derecha = this.derecha.compilar(enviorement);
        const generador = Generador.getInstancia();
        const temp = generador.newTemporal();
        switch (izquierda.tipo.nombreTipo) {
            case Types.NUMBER:
                switch (derecha.tipo.nombreTipo) {
                    case Types.NUMBER:
                        generador.addCodigo(`${temp} = fmod(${izquierda.getValor()}, ${derecha.getValor()});`);
                        return new Retorno(temp, true, izquierda.tipo);
                    default:
                        break;
                }
        }
        throw new Error(this.linea, this.columna, 'Semantico', `No se puede modular ${izquierda.tipo.nombreTipo} % ${derecha.tipo.nombreTipo}`);
    }
}