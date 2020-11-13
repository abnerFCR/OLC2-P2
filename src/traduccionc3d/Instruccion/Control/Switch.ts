import { Caso } from '../../Utils/Caso';
import { Expresion } from 'src/traduccionc3d/Abstracto/Expresion';
import { Instruccion } from 'src/traduccionc3d/Abstracto/Instruccion';
import { Entorno } from 'src/traduccionc3d/TablaSimbolos/Entorno';
import { Generador } from 'src/traduccionc3d/Generador/Generador';
import { Error_ } from 'src/interprete/Errores/Error';


export class Switch extends Instruccion {

    private evaluador: Expresion;
    private casos: Caso[];

    constructor(evaluador: Expresion, casos: Caso[], linea: number, columna: number) {
        super(linea, columna);
        this.evaluador = evaluador;
        this.casos = casos;
    }

    public compilar(entorno: Entorno) {

        let generador = Generador.getInstancia();
        let etiquetaFinal = generador.newEtiqueta();
        let valorEvaluador = this.evaluador.compilar(entorno);
        let etiquetaCondiciones = generador.newEtiqueta();

        //TODO revisar los entornos 
        //const newEnv = new Entorno(entorno);

        generador.addComentario('Inicia Switch');
        entorno.break = etiquetaFinal;
        generador.addGoto(etiquetaCondiciones);
        for (let caso of this.casos) {
            caso.compilar(entorno);
        }
        generador.addGoto(etiquetaFinal);
        generador.addEtiqueta(etiquetaCondiciones);
        for (let caso of this.casos) {
            if (caso.valor == null) {
                generador.addGoto(caso.etiquetaInicio);
            } else {
                let valorCaso = caso.valor.compilar(entorno);
                if(valorCaso.tipo.nombreTipo != valorEvaluador.tipo.nombreTipo){
                    throw new Error_(this.linea, this.columna,'Semantico',`El tipo de dato de cada caso debe ser igual al tipo de dato del evaluador en el switch`);
                }
                generador.addIf(valorCaso.getValor(), valorEvaluador.getValor(), '==', caso.etiquetaInicio);

            }
        }
        generador.addEtiqueta(etiquetaFinal);
        generador.addComentario('Finaliza switch');
    }
}