import { Instruccion } from "../../Abstracto/Instruccion";
import { Type, Types } from "../../Utils/Type";
import { Expresion } from "../../Abstracto/Expresion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Generador } from "../../Generador/Generador";
import { Error_ } from 'src/interprete/Errores/Error';
import { PrimitivoL } from 'src/traduccionc3d/Expresion/Literal/Primitivo';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export class Declaracion extends Instruccion {
    private tipo: Type;
    private listaId: Array<string>;
    private valor: Expresion;
    private constante:boolean;

    constructor(constante:boolean, tipo: Type, listaId: Array<string>, valor: Expresion|null, linea: number, columna: number) {
        super(linea, columna);
        this.tipo = tipo;
        this.listaId = listaId;
        this.constante = constante;
        if(valor == null){
            if(tipo.nombreTipo == Types.NUMBER){
                this.valor = new PrimitivoL(Types.NUMBER,0,linea,columna);
            }else if(tipo.nombreTipo == Types.BOOLEAN){
                this.valor = new PrimitivoL(Types.BOOLEAN, false,linea,columna);
            }else{
                this.valor = new PrimitivoL(Types.NULL,null,linea,columna);    
            }
        }else{
            this.valor = valor;
        }
    }

    compilar(entorno: Entorno): void {
        const generador = Generador.getInstancia();
        const valor = this.valor.compilar(entorno);
        if(!this.mismoTipo(this.tipo,valor.tipo)){
            throw new Error_(this.linea,this.columna,'Semantico',`Tipos de datos diferentes ${this.tipo.nombreTipo}, ${valor.tipo.nombreTipo}`);
        }
        this.validarTipo(entorno);

        this.listaId.forEach((id)=>{
            /*let ref = false;
            if(this.tipo.nombreTipo == Types.STRING){
                ref =true;
            }*/
            const nuevaVariable = entorno.addVar(id,valor.tipo.nombreTipo == Types.NULL ? this.tipo : valor.tipo,this.constante,false);
            if(!nuevaVariable) throw new Error_(this.linea,this.columna,'Semantico',`La variable: ${id} ya existe en este ambito;`);
            //console.log('Estoy en declaracion', valor.etiquetaVerdadero, this.tipo.nombreTipo, Types.BOOLEAN, );
            if(nuevaVariable.isGlobal){
                if(this.tipo.nombreTipo == Types.BOOLEAN){
                    const templabel = generador.newEtiqueta();
                    generador.addEtiqueta(valor.etiquetaVerdadero);
                    //console.log('-->',valor.etiquetaVerdadero);
                    generador.addSetStack(nuevaVariable.posicion,'1');
                    generador.addGoto(templabel);
                    generador.addEtiqueta(valor.etiquetaFalso);
                    generador.addSetStack(nuevaVariable.posicion,'0');
                    generador.addEtiqueta(templabel);
                }
                else{
                    generador.addSetStack(nuevaVariable.posicion,valor.getValor());
                }
            }
            else{
                const temp = generador.newTemporal(); generador.liberarTemporal(temp);
                
                if(this.tipo.nombreTipo == Types.BOOLEAN){
                    const templabel = generador.newEtiqueta();
                    generador.addEtiqueta(valor.etiquetaVerdadero);
                    generador.addExpresion(temp,'p',nuevaVariable.posicion,'+');
                    generador.addSetStack(temp,'1');
                    generador.addGoto(templabel);
                    generador.addEtiqueta(valor.etiquetaFalso);
                    generador.addExpresion(temp,'p',nuevaVariable.posicion,'+');
                    generador.addSetStack(temp,'0');
                    generador.addEtiqueta(templabel);
                }
                else{
                    generador.addExpresion(temp,'p',nuevaVariable.posicion,'+');
                    generador.addSetStack(temp,valor.getValor());
                }
            }
        });
    }

    private validarTipo(entorno: Entorno){
        if(this.tipo.nombreTipo == Types.STRUCT){
            const struct = entorno.buscarStruct(this.tipo.tipoIdStruct);
            if(!struct)
                throw new Error_(this.linea,this.columna,'Semantico',`No existe el struct ${this.tipo.tipoIdStruct}`);
            this.tipo.struct = struct;
        }
    }
}

/**/