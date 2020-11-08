import { Instruccion } from "../../Abstracto/Instruccion";
import { Expresion } from "../../Abstracto/Expresion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Types } from "../../Utils/Type";
import { Error_ } from 'src/interprete/Errores/Error';
import { Generador } from "../../Generador/Generador";


export class While extends Instruccion {
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
        const etiquetaInicioWhile = generador.newEtiqueta();
        generador.addComentario('Inicia While');
        generador.addEtiqueta(etiquetaInicioWhile);
        const condition = this.condicion.compilar(entorno);
        if(condition.tipo.nombreTipo == Types.BOOLEAN){
            newEnv.break = condition.etiquetaFalso;
            newEnv.continue = etiquetaInicioWhile;
            generador.addEtiqueta(condition.etiquetaVerdadero);
            this.instruccion.compilar(newEnv);
            generador.addGoto(etiquetaInicioWhile);
            generador.addEtiqueta(condition.etiquetaFalso);
            generador.addComentario('Finaliza while');
            return;
        }
        throw new Error_(this.linea,this.columna,'Semantico',`La condicion no es booleana: ${condition?.tipo.nombreTipo}`);
    }
}
