import { Instruccion } from "../../Abstracto/Instruccion";
import { Type, Types } from "../../Utils/Type";
import { Expresion } from "../../Abstracto/Expresion";
import { Entorno } from "../../TablaSimbolos/Entorno";
import { Generador } from "../../Generador/Generador";
import { Error } from "../../Utils/Error";

export class Declaracion extends Instruccion {
    private tipo: Type;
    private listaId: Array<string>;
    private valor: Expresion;

    constructor(tipo: Type, listaId: Array<string>, valor: Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.tipo = tipo;
        this.listaId = listaId;
        this.valor = valor;
    }

    compilar(entorno: Entorno): void {
        const generator = Generador.getInstancia();
        const valor = this.valor.compilar(entorno);
        if(!this.mismoTipo(this.tipo,valor.tipo)){
            throw new Error(this.linea,this.columna,'Semantico',`Tipos de datos diferentes ${this.tipo.nombreTipo}, ${valor.tipo.nombreTipo}`);
        }
        this.validarTipo(entorno);
        this.listaId.forEach((id)=>{
            const nuevaVariable = entorno.addVar(id,valor.tipo.nombreTipo == Types.NULL ? this.tipo : valor.tipo,false,false);
            if(!nuevaVariable) throw new Error(this.linea,this.columna,'Semantico',`La variable: ${id} ya existe en este ambito;`);
        
            if(nuevaVariable.isGlobal){
                if(this.tipo.nombreTipo == Types.BOOLEAN){
                    const templabel = generator.newEtiqueta();
                    generator.addEtiqueta(valor.etiquetaVerdadero);
                    generator.addSetStack(nuevaVariable.posicion,'1');
                    generator.addGoto(templabel);
                    generator.addEtiqueta(valor.etiquetaFalso);
                    generator.addSetStack(nuevaVariable.posicion,'0');
                    generator.addEtiqueta(templabel);
                }
                else{
                    generator.addSetStack(nuevaVariable.posicion,valor.getValor());
                }
            }
            else{
                const temp = generator.newTemporal(); generator.liberarTemporal(temp);
                generator.addExpresion(temp,'p',nuevaVariable.posicion,'+');
                if(this.tipo.nombreTipo == Types.BOOLEAN){
                    const templabel = generator.newEtiqueta();
                    generator.addEtiqueta(valor.etiquetaVerdadero);
                    generator.addSetStack(temp,'1');
                    generator.addGoto(templabel);
                    generator.addEtiqueta(valor.etiquetaFalso);
                    generator.addSetStack(temp,'0');
                    generator.addEtiqueta(templabel);
                }
                else{
                    generator.addSetStack(temp,valor.getValor());
                }
            }
        });
    }

    private validarTipo(entorno: Entorno){
        if(this.tipo.nombreTipo == Types.STRUCT){
            const struct = entorno.buscarStruct(this.tipo.tipoIdStruct);
            if(!struct)
                throw new Error(this.linea,this.columna,'Semantico',`No existe el struct ${this.tipo.tipoIdStruct}`);
            this.tipo.struct = struct;
        }
    }
}

/**/