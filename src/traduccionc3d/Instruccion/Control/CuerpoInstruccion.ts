import { Instruccion } from "../../Abstracto/Instruccion";
import { Entorno } from "../../TablaSimbolos/Entorno";

export class CuerpoInstruccion extends Instruccion {
    private instrucciones: Array<Instruccion> | null;

    constructor(instructions: Array<Instruccion> | null, linea: number, columna: number) {
        super(linea, columna);
        this.instrucciones = instructions;
    }

    compilar(entorno: Entorno): any {
        const newEnv = entorno.actualFunc == null ? new Entorno(entorno) : entorno;
        this.instrucciones?.forEach((instruction)=>{
            try {
                instruction.compilar(newEnv);
            } catch (error) {
                //TODO hacer push del error a la lista de errores
                console.log(error);
            }
        });
    }
}