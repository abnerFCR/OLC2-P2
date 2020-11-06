import { Instruccion } from "../../Abstracto/Instruccion";
import { Expresion } from "../../Abstracto/Expresion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Types } from "../../Utils/Type";
import { Generador } from "../../Generador/Generador";
import { Error_ } from 'src/interprete/Errores/Error';

export class If extends Instruccion {
    private condicion: Expresion;
    private instruccion: Instruccion;
    private elseI: Instruccion | null;

    constructor(condicion: Expresion, instruccion: Instruccion, elseI: Instruccion | null, linea: number, columna: number) {
        super(linea, columna);
        this.condicion = condicion;
        this.instruccion = instruccion;
        this.elseI = elseI;
    }

    compilar(entorno: Entorno) : void{
        const generator = Generador.getInstancia();
        generator.addComentario('Inicia If');
        const condicion = this.condicion?.compilar(entorno);
        const newEnv = new Entorno(entorno);
        if(condicion.tipo.nombreTipo == Types.BOOLEAN){
            generator.addEtiqueta(condicion.etiquetaVerdadero);
            this.instruccion.compilar(newEnv);
            if(this.elseI != null){
                const tempLbl = generator.newEtiqueta();
                generator.addGoto(tempLbl);
                generator.addEtiqueta(condicion.etiquetaFalso);
                this.elseI.compilar(entorno);
                generator.addEtiqueta(tempLbl);
            }
            else{
                generator.addEtiqueta(condicion.etiquetaFalso);
            }
            generator.addComentario('Fin If');
            return;
        }
        throw new Error_(this.linea,this.columna,'Semantico',`La condicion no es booleana: ${condicion?.tipo.nombreTipo}`);
    }
}