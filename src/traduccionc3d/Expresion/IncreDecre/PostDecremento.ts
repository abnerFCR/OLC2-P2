import { Expresion } from "../../Abstracto/Expresion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Error } from "../../Utils/Error";
import { Retorno } from "../../Utils/Retorno";
import { Types } from "../../Utils/Type";
import { Generador } from "../../Generador/Generador";

export class PostDecrement extends Expresion {
    private access: Expresion;

    constructor(access: Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.access = access;
    }

    compilar(enviorement: Entorno): Retorno {
        const access = this.access.compilar(enviorement);
        const symbol = access.simbolo;
        const generator = Generador.getInstancia();
        if(symbol == null) throw new Error(this.linea,this.columna,'Semantico','-- no aplicable aqui');
        switch (access.tipo.nombreTipo) {
            case Types.NUMBER:
                const temp = generator.newTemporal();
                const tempaux = generator.newTemporal(); generator.liberarTemporal(tempaux);
                if(symbol?.isGlobal){
                    generator.addGetStack(temp,symbol.posicion);
                    generator.addExpresion(tempaux,temp,'1','-');
                    generator.addSetStack(symbol.posicion,tempaux);
                }
                else if(symbol?.isHeap){
                    generator.addGetHeap(temp,access.getValor());
                    generator.addExpresion(tempaux,temp,'1','-');
                    generator.addSetHeap(access.getValor(),tempaux);
                }
                else{
                    generator.addGetStack(temp,access.getValor());
                    generator.addExpresion(tempaux,temp,'1','-');
                    generator.addSetStack(access.getValor(),tempaux);
                }
                return new Retorno(temp,true,symbol.tipo);
            default:
                break;
        }
        throw new Error(this.linea, this.columna, 'Semantico', 'Aun no lo hago :(');
    }
}