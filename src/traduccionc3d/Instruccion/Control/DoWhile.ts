import { Instruccion } from "../../Abstracto/Instruccion";
import { Expresion } from "../../Abstracto/Expresion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Types } from "../../Utils/Type";
import { Error } from "../../Utils/Error";
import { Generador } from "../../Generador/Generador";

export class DoWhile extends Instruccion {
    private condicion: Expresion;
    private instruccion: Instruccion;

    constructor(condicion: Expresion, instruccion: Instruccion, linea: number, columna: number) {
        super(linea, columna);
        this.condicion = condicion;
        this.instruccion = instruccion;
    }

    compilar(entorno: Entorno) : void{
        const generador = Generador.getInstancia();
        const newEnv = new Entorno(entorno);
        generador.addComentario('Inicia DoWhile');
        newEnv.continue = this.condicion.etiquetaVerdadero = generador.newEtiqueta();
        newEnv.break = this.condicion.etiquetaFalso = generador.newEtiqueta();
        generador.addEtiqueta(this.condicion.etiquetaVerdadero);
        this.instruccion.compilar(newEnv);
        const condicion = this.condicion.compilar(entorno);
        if(condicion.tipo.nombreTipo == Types.BOOLEAN){
            generador.addEtiqueta(condicion.etiquetaFalso);
            generador.addComentario('Finaliza DoWhile');
            return;
        }
        throw new Error(this.linea,this.columna,'Semantico',`La condicion no es booleana: ${condicion?.tipo.nombreTipo}`);
    }
}