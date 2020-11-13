import { Instruccion } from "../../Abstracto/Instruccion";
import { Expresion } from "../../Abstracto/Expresion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Generador } from "../../Generador/Generador";
import { Types } from "../../Utils/Type";
import { Error_ } from 'src/interprete/Errores/Error';

export class Asignacion extends Instruccion {
    private objetivo: Expresion;
    private valor: Expresion;

    constructor(objetivo: Expresion, valor: Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.objetivo = objetivo;
        this.valor = valor;
    }

    compilar(entorno: Entorno): void {
        const objetivo = this.objetivo.compilar(entorno);
        const valor = this.valor.compilar(entorno);

        const generador = Generador.getInstancia();
        const simbolo = objetivo.simbolo;

        if(objetivo.simbolo.isConst){
            throw new Error_(this.linea,this.columna,'Semantico','No se puede reasignar el valor de una constante');
        }

        if (!this.mismoTipo(objetivo.tipo, valor.tipo)) {
            throw new Error_(this.linea,this.columna,'Semantico','Tipos de dato diferentes');
        }
        if (simbolo?.isGlobal) {
            if (objetivo.tipo.nombreTipo == Types.BOOLEAN) {
                const templabel = generador.newEtiqueta();
                generador.addEtiqueta(valor.etiquetaVerdadero);
                generador.addSetStack(simbolo.posicion, '1');
                generador.addGoto(templabel);
                generador.addEtiqueta(valor.etiquetaFalso);
                generador.addSetStack(simbolo.posicion, '0');
                generador.addEtiqueta(templabel);
            }
            else {
                generador.addSetStack(simbolo.posicion, valor.getValor());
            }
        }
        else if (simbolo?.isHeap) {
            if (objetivo.tipo.nombreTipo == Types.BOOLEAN) {
                const templabel = generador.newEtiqueta();
                generador.addEtiqueta(valor.etiquetaVerdadero);
                generador.addSetHeap(simbolo.posicion, '1');
                generador.addGoto(templabel);
                generador.addEtiqueta(valor.etiquetaFalso);
                generador.addSetHeap(simbolo.posicion, '0');
                generador.addEtiqueta(templabel);
            }
            else {
                generador.addSetHeap(objetivo.getValor(), valor.getValor());
            }
        }
        else {
            if (objetivo.tipo.nombreTipo == Types.BOOLEAN) {
                const templabel = generador.newEtiqueta();
                generador.addEtiqueta(valor.etiquetaVerdadero);
                generador.addSetStack(objetivo.getValor(), '1');
                generador.addGoto(templabel);
                generador.addEtiqueta(valor.etiquetaFalso);
                generador.addSetStack(objetivo.getValor(), '0');
                generador.addEtiqueta(templabel);
            }
            else {
                generador.addSetStack(objetivo.getValor(), valor.getValor());
            }
        }
    }
}