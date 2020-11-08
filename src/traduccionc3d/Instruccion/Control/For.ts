import { Expresion } from 'src/traduccionc3d/Abstracto/Expresion';
import { Instruccion } from 'src/traduccionc3d/Abstracto/Instruccion';
import { Generador } from 'src/traduccionc3d/Generador/Generador';
import { Entorno } from 'src/traduccionc3d/TablaSimbolos/Entorno';
import { Types } from 'src/traduccionc3d/Utils/Type';
import { Error_ } from 'src/interprete/Errores/Error';

export class For extends Instruccion{

    private condicion:Expresion;
    private instrucciones:Instruccion;
    private declaracion:Instruccion;
    private increDecre:Expresion;

    constructor(declaracion:Instruccion, condicion:Expresion, increDecre:Expresion, instrucciones:Instruccion, linea:number, columna:number){
        super(linea,columna);
        this.declaracion = declaracion;
        this.condicion = condicion;
        this.increDecre = increDecre;
        this.instrucciones = instrucciones;
    }

    public compilar(entorno: Entorno) {
        let generador = Generador.getInstancia();
        const newEnv = new Entorno(entorno);
        let declaracion = this.declaracion.compilar(newEnv);
        let etiquetaInicio = generador.newEtiqueta();

        generador.addComentario('Inicia For');
        generador.addEtiqueta(etiquetaInicio);
        let condicion = this.condicion.compilar(newEnv);
        if(condicion.tipo.nombreTipo == Types.BOOLEAN){
            newEnv.break = condicion.etiquetaFalso;
            newEnv.continue = etiquetaInicio;
            generador.addEtiqueta(condicion.etiquetaVerdadero);
            this.instrucciones.compilar(newEnv);
            this.increDecre.compilar(newEnv);
            generador.addGoto(etiquetaInicio);
            generador.addEtiqueta(condicion.etiquetaFalso);
            generador.addComentario('Finaliza For');
            return;
        }
        throw new Error_(this.linea,this.columna,'Semantico',`La condicion no es booleana: ${condicion?.tipo.nombreTipo}`);

    }

    
}