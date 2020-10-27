import { Instruccion } from "../../Abstracto/Instruccion";
import { Expresion } from "../../Abstracto/Expresion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Types } from "../../Utils/Type";
import { Generador } from "../../Generador/Generador";
import { Error } from "../../Utils/Error";

export class Imprimir extends Instruccion {
    private valor: Expresion;
    private esLinea: boolean;

    constructor(valor: Expresion, esLinea: boolean, linea: number, columna: number) {
        super(linea, columna);
        this.valor = valor;
        this.esLinea = esLinea;
    }

    compilar(entorno: Entorno): void {
        const valor = this.valor.compilar(entorno);
        const generador = Generador.getInstancia();
        switch (valor.tipo.nombreTipo) {
            case Types.NUMBER:
                generador.addPrint('d', valor.getValor());
                break;
            case Types.BOOLEAN:
                const templabel = generador.newEtiqueta();
                generador.addEtiqueta(valor.etiquetaVerdadero);
                generador.addImprimirTrue();
                generador.addGoto(templabel);
                generador.addEtiqueta(valor.etiquetaFalso);
                generador.addImprimirFalse();
                generador.addEtiqueta(templabel);
                break;
                //TODO nativa imprimir string
            case Types.STRING:
                generador.addSiguienteEntorno(entorno.size);
                generador.addSetStack('p', valor.getValor());
                generador.addCall('native_print_str');
                generador.addAnteriorEntorno(entorno.size);
                break;
            case Types.NULL:
                generador.addImprimirNull();
                break;
            default: 
                throw new Error(this.linea,this.columna,'Semantico',`No se puede imprimir el tipo de dato ${valor.tipo.nombreTipo}`);
        }
        if(this.esLinea){
            generador.addPrint('c',10);
        }
    }
}