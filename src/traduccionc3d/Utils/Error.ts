
export class Error{
    private linea : number;
    private columna : number;
    private tipo : string;
    private descripcion : string;

    constructor(linea: number, columna: number, tipo: string, descripcion: string){
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.descripcion = descripcion;
    }

    public toString() : string{
        return `Error ${this.tipo} en la (${this.linea},${this.columna}) = ${this.descripcion}`;
    }
}