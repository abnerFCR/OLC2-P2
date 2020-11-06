import { Instruccion } from "../../Abstracto/Instruccion";
import { Expresion } from "../../Abstracto/Expresion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Error_ } from 'src/interprete/Errores/Error';
import { Types, Type } from "../../Utils/Type";
import { Generador } from "../../Generador/Generador";
import { Retorno } from "../../Utils/Retorno";

export class Return extends Instruccion {
    private valor: Expresion | null;

    constructor(valor: Expresion | null, linea: number, columna: number) {
        super(linea, columna);
        this.valor = valor;
    }

    compilar(entorno: Entorno): void {
        const valor = this.valor?.compilar(entorno) || new Retorno('0', false, new Type(Types.VOID));
        const symFunc = entorno.actualFunc;
        const generator = Generador.getInstancia();

        if (symFunc == null)
            throw new Error_(this.linea, this.columna, 'Semantico', 'Return fuera de una funcion');

        if (!this.mismoTipo(symFunc.tipo, valor.tipo))
            throw new Error_(this.linea, this.columna, 'Semantico', `Se esperaba ${symFunc.tipo.nombreTipo} y se obtuvo ${valor.tipo.nombreTipo}`);

        if(symFunc.tipo.nombreTipo == Types.BOOLEAN){
            const templabel = generator.newEtiqueta();
            generator.addEtiqueta(valor.etiquetaVerdadero);
            generator.addSetStack('p', '1');
            generator.addGoto(templabel);
            generator.addEtiqueta(valor.etiquetaFalso);
            generator.addSetStack('p', '0');
            generator.addEtiqueta(templabel);
        } 
        else if (symFunc.tipo.nombreTipo != Types.VOID)
            generator.addSetStack('p', valor.getValor());

        generator.addGoto(entorno.return || '');
    }
}