import { Expresion } from "../../Abstracto/Expresion"
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Retorno } from "../../Utils/Retorno";
import { Error } from "../../Utils/Error";
import { Generador } from "../../Generador/Generador";
import { Types } from "../../Utils/Type";

export class AsignacionFuncion extends Expresion{
    private id: string;
    private anterior: Expresion | null;
    private params: Array<Expresion>;

    constructor(id: string, params: Array<Expresion>, anterrior: Expresion | null,linea : number, columna: number){
        super(linea,columna);
        this.id = id;
        this.anterior = anterrior;
        this.params = params;
    }

    compilar(enviorement: Entorno) : Retorno{
        if(this.anterior == null){
            const symFunc = enviorement.buscarFuncion(this.id);
            if(symFunc == null)
                throw new Error(this.linea,this.columna,'Semantico',`No se encontro la funcion: ${this.id}`);
            const paramsValues = new Array<Retorno>();
            const generator = Generador.getInstancia();
            const size = generator.saveTemps(enviorement); //Guardo temporales
            this.params.forEach((param)=>{
                paramsValues.push(param.compilar(enviorement));
            })
            //TODO comprobar parametros correctos
            const temp = generator.newTemporal(); generator.liberarTemporal(temp);
            //Paso de parametros en cambio simulado
            if(paramsValues.length != 0){
                generator.addExpresion(temp,'p',enviorement.size + 1,'+'); //+1 porque la posicion 0 es para el retorno;
                paramsValues.forEach((value,index)=>{
                    //TODO paso de parametros booleanos
                    generator.addSetStack(temp,value.getValor());
                    if(index != paramsValues.length - 1)
                        generator.addExpresion(temp,temp,'1','+');
                });    
            }

            generator.addSiguienteEntorno(enviorement.size);
            generator.addCall(symFunc.idUnico);
            generator.addGetStack(temp,'p');
            generator.addAnteriorEntorno(enviorement.size);
            generator.recoverTemps(enviorement,size);
            generator.addTemporal(temp);

            if (symFunc.tipo.nombreTipo != Types.BOOLEAN) return new Retorno(temp,true,symFunc.tipo);

            const retorno = new Retorno('', false, symFunc.tipo);
            this.etiquetaVerdadero = this.etiquetaVerdadero == '' ? generator.newEtiqueta() : this.etiquetaVerdadero;
            this.etiquetaFalso = this.etiquetaFalso == '' ? generator.newEtiqueta() : this.etiquetaFalso;
            generator.addIf(temp, '1', '==', this.etiquetaVerdadero);
            generator.addGoto(this.etiquetaFalso);
            retorno.etiquetaVerdadero = this.etiquetaVerdadero;
            retorno.etiquetaFalso = this.etiquetaFalso;
            return retorno;
        }
        else{

        }
        throw new Error(this.linea,this.columna,'Semantico','Funcion no implementada');
    }
}