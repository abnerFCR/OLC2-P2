import { Expresion } from "../../Abstracto/Expresion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Error_ } from 'src/interprete/Errores/Error';
import { Retorno } from "../../Utils/Retorno";
import { Types } from "../../Utils/Type";
import { Generador } from "../../Generador/Generador";

export class PreDecrement extends Expresion {
    private access: Expresion;

    constructor(access: Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.access = access;
    }

    compilar(enviorement: Entorno): Retorno {
        const access = this.access.compilar(enviorement);
        const simbolo = access.simbolo;
        const generator = Generador.getInstancia();
        if(simbolo == null) throw new Error_(this.linea,this.columna,'Semantico','-- no aplicable aqui');
        switch (access.tipo.nombreTipo) {
            case Types.NUMBER:
                const temp = generator.newTemporal();
                if(simbolo?.isGlobal){
                    generator.addGetStack(temp,simbolo.posicion);
                    generator.addExpresion(temp,temp,'1','-');
                    generator.addSetStack(simbolo.posicion,temp);
                }
                else if(simbolo?.isHeap){
                    generator.addGetHeap(temp,access.getValor());
                    generator.addExpresion(temp,temp,'1','-');
                    generator.addSetHeap(access.getValor(),temp);
                }
                else{
                    generator.addGetStack(temp,access.getValor());
                    generator.addExpresion(temp,temp,'1','-');
                    generator.addSetStack(access.getValor(),temp);
                }
                return new Retorno(temp,true,simbolo.tipo);
            default:
                break;
        }
        //TODO validar el error semantico
        throw new Error_(this.linea, this.columna, 'Semantico', 'Aun no lo hago :(');
    }
}