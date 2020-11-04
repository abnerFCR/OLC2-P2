import { Simbolo } from "../TablaSimbolos/Simbolo";
import { Type } from "./Type";
import { Generador } from "../Generador/Generador";

export class Retorno{
    //private valor : string;
    private valor : string;
    
    isTemp : boolean;
    tipo : Type;
    etiquetaVerdadero : string;
    etiquetaFalso : string;
    simbolo : Simbolo | null;

    constructor(valor: any, isTemp: boolean, tipo: Type, simbolo: Simbolo | null= null){
        this.valor = valor;
        this.isTemp = isTemp;
        this.tipo = tipo;
        this.simbolo = simbolo;
        this.etiquetaVerdadero = this.etiquetaFalso = '';
    }

    public getValor(){
        Generador.getInstancia().liberarTemporal(this.valor);
        return this.valor;
    }
}