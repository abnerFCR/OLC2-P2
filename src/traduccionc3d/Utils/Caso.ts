import { Error_ } from 'src/interprete/Errores/Error';
import { Expresion } from '../Abstracto/Expresion';
import { Instruccion } from '../Abstracto/Instruccion';
import { Generador } from '../Generador/Generador';
import { Entorno } from '../TablaSimbolos/Entorno';
import { Types } from './Type';

export class Caso extends Instruccion{

    public valor:Expresion |null;
    private instrucciones:Instruccion|Instruccion[];
    public etiquetaInicio:string;
    public defecto:boolean;

    constructor(valor:Expresion |null, instrucciones:Instruccion | Instruccion[], defecto:boolean, linea:number, columna:number){
        super(linea, columna);
        this.valor = valor;
        this.instrucciones = instrucciones;
        this.defecto = defecto;
    }

    public compilar(entorno: Entorno) {

        let generador = Generador.getInstancia();
        this.etiquetaInicio  = generador.newEtiqueta();
        //let etiquetaFinal = generador.newEtiqueta();
        generador.addEtiqueta(this.etiquetaInicio);
        
        if(this.instrucciones instanceof Instruccion){
            this.instrucciones.compilar(entorno);   
        }else{
            for(let instruccion of this.instrucciones){
                instruccion.compilar(entorno);
            }
        }
    }   
}


