import { Expresion } from "../../Abstracto/Expresion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Error_ } from 'src/interprete/Errores/Error';
import { Retorno } from "../../Utils/Retorno";
import { Types } from "../../Utils/Type";
import { Generador } from "../../Generador/Generador";

export class PostDecremento extends Expresion {
    private acceso: Expresion;

    constructor(acceso: Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.acceso = acceso;
    }

    compilar(entorno: Entorno): Retorno {
        const acceso = this.acceso.compilar(entorno);
        const simbolo = acceso.simbolo;
        const generator = Generador.getInstancia();
        if(simbolo == null) throw new Error_(this.linea,this.columna,'Semantico','-- no aplicable aqui');
        switch (acceso.tipo.nombreTipo) {
            case Types.NUMBER:
                const temp = generator.newTemporal();
                const tempaux = generator.newTemporal(); generator.liberarTemporal(tempaux);
                if(simbolo?.isGlobal){
                    generator.addGetStack(temp,simbolo.posicion);
                    generator.addExpresion(tempaux,temp,'1','-');
                    generator.addSetStack(simbolo.posicion,tempaux);
                }
                else if(simbolo?.isHeap){
                    generator.addGetHeap(temp,acceso.getValor());
                    generator.addExpresion(tempaux,temp,'1','-');
                    generator.addSetHeap(acceso.getValor(),tempaux);
                }
                else{
                    generator.addGetStack(temp,acceso.getValor());
                    generator.addExpresion(tempaux,temp,'1','-');
                    generator.addSetStack(acceso.getValor(),tempaux);
                }
                return new Retorno(temp,true,simbolo.tipo);
            default:
                break;
        }
        throw new Error_(this.linea, this.columna, 'Semantico', 'Aun no lo hago :(');
    }
}