import { Expresion } from "../../Abstracto/Expresion"
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Retorno } from "../../Utils/Retorno";
import { Error_ } from 'src/interprete/Errores/Error';
import { Generador } from "../../Generador/Generador";
import { Types } from "../../Utils/Type";
import { Type } from '@angular/core';

export class AsignacionFuncion extends Expresion {
    private id: string;
    private anterior: Expresion | null;
    private parametros: Array<Expresion>;

    constructor(id: string, params: Array<Expresion>, anterior: Expresion | null, linea: number, columna: number) {
        super(linea, columna);
        this.id = id;
        this.anterior = anterior;
        this.parametros = params;
    }

    compilar(entorno: Entorno): Retorno {
        if (this.anterior == null) {
            const symFunc = entorno.buscarFuncion(this.id);
            if (symFunc == null)
                throw new Error_(this.linea, this.columna, 'Semantico', `No se encontro la funcion: ${this.id}`);
            const paramsValues = new Array<Retorno>();
            const generador = Generador.getInstancia();
            const size = generador.saveTemps(entorno); //Guardo temporales
            /*this.parametros.forEach((param)=>{
                paramsValues.push(param.compilar(entorno));
            })*/
            //TODO comprobar parametros correctos
            const temp = generador.newTemporal(); generador.liberarTemporal(temp);
            //Paso de parametros en cambio simulado
            /*
            if(paramsValues.length != 0){
                generador.addExpresion(temp,'p',entorno.size + 1,'+'); //+1 porque la posicion 0 es para el retorno;
                
                paramsValues.forEach((value,index)=>{
                    if(value.tipo.nombreTipo == Types.BOOLEAN){
                        let salida = generador.newEtiqueta();
                        let aux = generador.codigo.pop();
                        generador.addCodigo(aux);
                        generador.addEtiqueta(value.etiquetaVerdadero);
                        generador.addCodigo(aux);
                        generador.addSetStack(temp, 1);
                        generador.addGoto(salida);
                        generador.addEtiqueta(value.etiquetaFalso);
                        generador.addSetStack(temp,0);
                        generador.addEtiqueta(salida);
                    }else{
                        generador.addSetStack(temp,value.getValor());
                    }
                    if(index != paramsValues.length - 1)
                        generador.addExpresion(temp,temp,'1','+');
                });    
            }
            */
            if (this.parametros.length > 0) {
                generador.addExpresion(temp, 'p', entorno.size + 1, '+');
            }
            let banderaEntro = false;
            this.parametros.forEach((param) => {
                banderaEntro = true;
                let valor = param.compilar(entorno);
                if (valor.tipo.nombreTipo == Types.BOOLEAN) {
                    let salida = generador.newEtiqueta();
                    generador.addEtiqueta(valor.etiquetaVerdadero);
                    generador.addSetStack(temp, 1);
                    generador.addGoto(salida);
                    generador.addEtiqueta(valor.etiquetaFalso);
                    generador.addSetStack(temp, 0);
                    generador.addEtiqueta(salida);
                }else{
                    generador.addSetStack(temp,valor.getValor());
                }
                generador.addExpresion(temp, temp, 1, '+');
            });
            if(banderaEntro){
                generador.codigo.pop();  //el ciclo anterior deja un temp = temp + 1 extra cuando entra al mismo 
            }
            
            generador.addSiguienteEntorno(entorno.size);
            generador.addCall(symFunc.idUnico);
            generador.addGetStack(temp, 'p');
            generador.addAnteriorEntorno(entorno.size);
            generador.recoverTemps(entorno, size);
            generador.addTemporal(temp);

            if (symFunc.tipo.nombreTipo != Types.BOOLEAN) return new Retorno(temp, true, symFunc.tipo);

            const retorno = new Retorno('', false, symFunc.tipo);
            this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generador.newEtiqueta() : this.etiquetaVerdadero;
            this.etiquetaFalso = this.etiquetaFalso == '' ? generador.newEtiqueta() : this.etiquetaFalso;
            generador.addIf(temp, '1', '==', this.etiquetaVerdadero);
            generador.addGoto(this.etiquetaFalso);
            retorno.etiquetaVerdadero = this.etiquetaVerdadero;
            retorno.etiquetaFalso = this.etiquetaFalso;
            return retorno;
        }
        else {
            
        }
        throw new Error_(this.linea, this.columna, 'Semantico', 'Funcion no implementada');
    }
}