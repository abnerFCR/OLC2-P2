import { Entorno } from "../TablaSimbolos/Entorno";

export class Generador{

    private static generador: Generador;
    private temporal : number;
    private etiqueta : number;
    private codigo : string[];
    private almacenamientoTemp : Set<string>; //almacena los nombre de todas las variables temporales
    isFunc = '';

    private constructor(){
        this.temporal = this.etiqueta = 0;
        this.codigo = new Array();
        this.almacenamientoTemp = new Set();
    }

    public static getInstancia(){
        return this.generador || (this.generador = new this());
    }

    //obtenemos el array con los temporales
    public getAlmacenamientoTemp(){
        return this.almacenamientoTemp;
    }

    //limpiamos las temporales
    public limpiarAlmacenamientoTemp(){
        this.almacenamientoTemp.clear();
    }

    //ingresamos todas las temporales
    public setAlmacenamientoTemp(almacenamientoTemp : Set<string>){
        this.almacenamientoTemp = almacenamientoTemp;
    }

    //borra el codigo generado
    public limpiarCodigo(){
        this.temporal = this.etiqueta = 0;
        this.codigo = new Array();
        this.almacenamientoTemp = new Set();
    }

    //a;ade instrucciones de codigo
    public addCodigo(codigo : string){
        this.codigo.push(this.isFunc + codigo);
    }

    //obtiene el codigo final
    public getCodigo() : string{
        return this.codigo.join('\n');//obtiene el array de codigo en un solo string separandolo por una linea
    }

    //genera un temporal y lo guarda en la lista de temporales
    public newTemporal() : string{
        const temp = 'T' + this.temporal++
        this.almacenamientoTemp.add(temp);
        return temp;
    }

    //genera una etiqueta
    public newEtiqueta() : string{
        return 'L' + this.etiqueta++;
    }

    //a;ade una etiqueta al codigo final
    public addEtiqueta(etiqueta : string){
        this.codigo.push(`${this.isFunc}${etiqueta}:`);
    }

    //a;adimos una linea de expresion al codigo: 'objetivo= izquierda operador derecha'
    public addExpresion(objetivo : string, izquierda: any, derecha: any = '', operador: string = ''){
        this.codigo.push(`${this.isFunc}${objetivo} = ${izquierda} ${operador} ${derecha};`);
    }

    //a;adimos un goto a una etiqueta: 'goto L#;'
    public addGoto(etiqueta : string){
        this.codigo.push(`${this.isFunc}goto ${etiqueta};`);
    }

    //genera un if  : 'if(izquierda operador derecha) goto etiqueta#;'
    public addIf(izquierda: any, derecha: any, operador: string, etiqueta : string){
        this.codigo.push(`${this.isFunc}if (${izquierda} ${operador} ${derecha}) goto ${etiqueta};`);
    }

    //siguiente posicion en el heap
    public nextHeap(){
        this.codigo.push(this.isFunc + 'h = h + 1;');
    }

    //obtiene lo que esta guardado en una posicion en el HEAP: 'objetivo = Heap[index];'
    public addGetHeap(objetivo : any, index: any){
        this.codigo.push(`${this.isFunc}${objetivo} = Heap[${index}];`);
    }

    //poner una informacion en alguna posicion del HEAP: 'Heap[index]=valor;'
    public addSetHeap(index: any, valor : any){
        this.codigo.push(`${this.isFunc}Heap[${index}] = ${valor};`);
    }
    
    //obtiene lo que esta guardado en una posicion en el STACK: 'objetivo = Stack[index];'
    public addGetStack(objetivo : any, index: any){
        this.codigo.push(`${this.isFunc}${objetivo} = Stack[${index}];`);
    }

    //poner una informacion en alguna posicion del STACK: 'Stack[index]=valor;'
    public addSetStack(index: any, valor : any){
        this.codigo.push(`${this.isFunc}Stack[${index}] = ${valor};`);
    }

    //poner instruccion que reserva el espacio suficiente en el stack para que almacenemos las variables de un nuevo entorno
    public addSiguienteEntorno(tamanio: number){
        this.codigo.push(`${this.isFunc}p = p + ${tamanio};`);
    }

    //poner instruccion que nos regresa a la posicion del stack del entorno anterior
    public addAnteriorEntorno(size: number){
        this.codigo.push(`${this.isFunc}p = p - ${size};`);
    }

    //a;adir llamada 
    //TODO corregir porque asi no se llaman las funciones en C pero solo hay que poner 
    public addCall(id: string){
        this.codigo.push(`${this.isFunc}call ${id};`);
    }

    //esta funcion comienza un procedimiento por el momento solo esta  'public void id(){'
    //TODO todos los tipos aunque creo que no se puede por ser el codigo de 3 direcciones
    public addBegin(id: string, tipo:string="void"){
        this.codigo.push(`\npublic ${tipo} ${id} () {`);
    }

    //se a;ade final del procedimiento
    //TODO revisar junto al addBegin
    public addEnd(){
        this.codigo.push('}\n');
    }

    //esta funcion añade un print al codigo final sin salto de linea 'print(formato, valor)'
    public addPrint(formato: string, valor: any){
        this.codigo.push(`${this.isFunc}printf("%${formato}",${valor});`);
    }

    //esta funcion añade un print al codigo final con salto de linea 'print(formato, valor)'
    public addPrintln(formato: string, valor: any){
        this.codigo.push(`${this.isFunc}printf("%${formato}\n",${valor});`);
    }

    //a;ade instrucciones al codigo final para imprimir un true
    public addImprimirTrue(){
        this.addPrint('c','t'.charCodeAt(0));
        this.addPrint('c','r'.charCodeAt(0));
        this.addPrint('c','u'.charCodeAt(0));
        this.addPrint('c','e'.charCodeAt(0));
    }

    //a;ade instrucciones al codigo final para imprimir un false
    public addImprimirFalse(){
        this.addPrint('c','f'.charCodeAt(0));
        this.addPrint('c','a'.charCodeAt(0));
        this.addPrint('c','l'.charCodeAt(0));
        this.addPrint('c','s'.charCodeAt(0));
        this.addPrint('c','e'.charCodeAt(0));
    }

    //a;ade instrucciones al codigo final para imprimir un null
    public addImprimirNull(){
        this.addPrint('c','n'.charCodeAt(0));
        this.addPrint('c','u'.charCodeAt(0));
        this.addPrint('c','l'.charCodeAt(0));
        this.addPrint('c','l'.charCodeAt(0));
    }

    public addComentario(comentario: string){
        this.codigo.push(`${this.isFunc}/***** ${comentario} *****/`);
    }

    //libera o borra un temporal de nuestra lista de temporales
    public liberarTemporal(temporal: string){
        if(this.almacenamientoTemp.has(temporal)){
            this.almacenamientoTemp.delete(temporal);
        }
    }

    //a;ade un temporal a la lista de temporales
    public addTemporal(temporal: string){
        if(!this.almacenamientoTemp.has(temporal))
            this.almacenamientoTemp.add(temporal);
    }

    //salva un temporal en una posicion del stack entorno.size.
    public saveTemps(entorno: Entorno) : number{
        if(this.almacenamientoTemp.size > 0){
            const temp = this.newTemporal(); this.liberarTemporal(temp);
            let size = 0;

            this.addComentario('Inicia guardado de temporales');
            this.addExpresion(temp,'p',entorno.size,'+');
            this.almacenamientoTemp.forEach((valor)=>{
                size++;
                this.addSetStack(temp,valor);
                if(size !=  this.almacenamientoTemp.size)
                    this.addExpresion(temp,temp,'1','+');
            });
            this.addComentario('Fin guardado de temporales');
        }
        let ptr = entorno.size;
        entorno.size = ptr + this.almacenamientoTemp.size;
        return ptr;
    }

    //recupera las variables temporales que guarde en el stack
    public recoverTemps(enviorement: Entorno, posicion: number){
        if(this.almacenamientoTemp.size > 0){
            const temp = this.newTemporal(); this.liberarTemporal(temp);
            let size = 0;

            this.addComentario('Inicia recuperado de temporales');
            this.addExpresion(temp,'p',posicion,'+');
            this.almacenamientoTemp.forEach((value)=>{
                size++;
                this.addGetStack(value,temp);
                if(size !=  this.almacenamientoTemp.size)
                    this.addExpresion(temp,temp,'1','+');
            });
            this.addComentario('Finaliza recuperado de temporales');
            enviorement.size = posicion;
        }
    }
}