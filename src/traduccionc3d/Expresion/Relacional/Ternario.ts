import { expressionType } from '@angular/compiler/src/output/output_ast';
import { Error_ } from 'src/interprete/Errores/Error';
import { Expresion } from 'src/traduccionc3d/Abstracto/Expresion';
import { Generador } from 'src/traduccionc3d/Generador/Generador';
import { Entorno } from 'src/traduccionc3d/TablaSimbolos/Entorno';
import { Retorno } from 'src/traduccionc3d/Utils/Retorno';
import { Types } from 'src/traduccionc3d/Utils/Type';


export class Ternario extends Expresion{

    public condicion:Expresion;
    public expresionSi:Expresion|null;
    public expresionNo:Expresion|null;
    constructor(condicion:Expresion, expresionSi:Expresion, expresionNo:Expresion, linea:number, columna:number){
        super(linea, columna);
        this.condicion = condicion;
        this.expresionNo = expresionNo;
        this.expresionSi = expresionSi;
    }
    compilar(entorno: Entorno):Retorno{
        const generador = Generador.getInstancia();
        generador.addComentario('Inicia Ternario');
        let condicion = this.condicion.compilar(entorno);
        let retorno:Retorno;
        if(condicion.tipo.nombreTipo == Types.BOOLEAN){
            let temp = generador.newTemporal();
            let etiquetaSalida = generador.newEtiqueta();
            generador.addEtiqueta(condicion.etiquetaVerdadero);
            let si = this.expresionSi.compilar(entorno);
            generador.addExpresion(temp,si.getValor());
            generador.addGoto(etiquetaSalida);

            generador.addEtiqueta(condicion.etiquetaFalso);
            let no = this.expresionNo.compilar(entorno);
            generador.addExpresion(temp,no.getValor());
            
            generador.addEtiqueta(etiquetaSalida);
            generador.addComentario("Termina Ternario")   
            return new Retorno(temp,true,si.tipo);
        }
        throw new Error_(this.linea, this.columna, 'Semantico', `No se puede operar un ternario sin una condicion`);
    }
    
}