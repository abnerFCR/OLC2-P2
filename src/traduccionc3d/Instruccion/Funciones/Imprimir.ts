import { Instruccion } from "../../Abstracto/Instruccion";
import { Expresion } from "../../Abstracto/Expresion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Types } from "../../Utils/Type";
import { Generador } from "../../Generador/Generador";
import { Error_ } from 'src/interprete/Errores/Error';

export class Imprimir extends Instruccion {
    private valor: Expresion[];
    private esLinea: boolean;

    constructor(valor: Expresion[], esLinea: boolean, linea: number, columna: number) {
        super(linea, columna);
        this.valor = valor;
        this.esLinea = esLinea;
    }
    compilar(entorno:Entorno){
        const generador = Generador.getInstancia();
        //console.log(this.valor);
        for(let val of this.valor){
            this.traducir(entorno, val);
        }
        if(this.esLinea){
            generador.addPrint('c',10);
        }
    }
    traducir(entorno:Entorno, val:Expresion){
        const valor = val.compilar(entorno);
        const generador = Generador.getInstancia();
        switch (valor.tipo.nombreTipo) {
            case Types.NUMBER:
                generador.addPrint('f', valor.getValor());
                break;
            case Types.BOOLEAN:
                const templabel = generador.newEtiqueta();
                //generador.addGoto(valor.getValor());
                // valor.getValor() ? generador.addGoto(this.valor.etiquetaVerdadero) : generador.addGoto(this.valor.etiquetaFalso);
                generador.addEtiqueta(valor.etiquetaVerdadero);
                generador.addImprimirTrue();
                generador.addGoto(templabel);
                generador.addEtiqueta(valor.etiquetaFalso);
                generador.addImprimirFalse();
                generador.addEtiqueta(templabel);
                break;
            case Types.STRING:
                //console.log(entorno.size);
                generador.addSiguienteEntorno(entorno.size);
                generador.addSetStack('p', valor.getValor());
                generador.addCall('nativa_imprimir_string');
                generador.addAnteriorEntorno(entorno.size);
                break;
            case Types.NULL:
                generador.addImprimirNull();
                break;
            default: 
                throw new Error_(this.linea,this.columna,'Semantico',`No se puede imprimir el tipo de dato ${valor.tipo.nombreTipo}`);
        }
        
    }
/*
    compilar(entorno: Entorno): void {
        const valor = this.valor.compilar(entorno);
        const generador = Generador.getInstancia();
        switch (valor.tipo.nombreTipo) {
            case Types.NUMBER:
                generador.addPrint('f', valor.getValor());
                break;
            case Types.BOOLEAN:
                const templabel = generador.newEtiqueta();
                //generador.addGoto(valor.getValor());
                // valor.getValor() ? generador.addGoto(this.valor.etiquetaVerdadero) : generador.addGoto(this.valor.etiquetaFalso);
                generador.addEtiqueta(valor.etiquetaVerdadero);
                generador.addImprimirTrue();
                generador.addGoto(templabel);
                generador.addEtiqueta(valor.etiquetaFalso);
                generador.addImprimirFalse();
                generador.addEtiqueta(templabel);
                break;
            case Types.STRING:
                console.log(entorno.size);
                generador.addSiguienteEntorno(entorno.size);
                generador.addSetStack('p', valor.getValor());
                generador.addCall('nativa_imprimir_string');
                generador.addAnteriorEntorno(entorno.size);
                break;
            case Types.NULL:
                generador.addImprimirNull();
                break;
            default: 
                throw new Error_(this.linea,this.columna,'Semantico',`No se puede imprimir el tipo de dato ${valor.tipo.nombreTipo}`);
        }
        if(this.esLinea){
            generador.addPrint('c',10);
        }
    }
    */
}