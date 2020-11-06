import { errores } from 'src/interprete/Errores/Errores';
import { Instruccion } from "../../Abstracto/Instruccion";
import { Entorno } from "../../TablaSimbolos/Entorno";

export class Statement extends Instruccion {
    private instrucciones: Array<Instruccion> | null;

    constructor(instructions: Array<Instruccion> | null, linea: number, columna: number) {
        super(linea, columna);
        this.instrucciones = instructions;
    }

    compilar(entorno: Entorno): any {
        const newEnv = entorno.actualFunc == null ? new Entorno(entorno) : entorno;
        console.log(newEnv);
        this.instrucciones?.forEach((instruction) => {
            try {
                instruction.compilar(newEnv);
            } catch (error) {
                errores.push(error);
                //                console.log(error);
            }
        });
    }
}