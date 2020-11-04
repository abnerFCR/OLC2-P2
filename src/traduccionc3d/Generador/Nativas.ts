import { Generador } from './Generador';

export class Nativas {  
    constructor(){
        this.nativa_imprimir_string();
        this.nativa_conca_string_string();
        this.nativa_conca_number_string(); 
        this.nativa_conca_string_number();
        this.nativa_conca_string_boolean();
        this.nativa_conca_boolean_string();
        this.nativa_potencia();
        this.nativa_comparar_string();
    }

    public nativa_imprimir_string(){

        let generador = Generador.getInstancia();
        generador.addComentario("-----EMPIEZA IMPRIMIR STRING-----");
        generador.addBegin("nativa_imprimir_string()","void");
        let temp = generador.newTemporal();
        generador.liberarTemporal(temp);
        let nuevaEtqAuxEnt:string = generador.newEtiqueta();
        let nuevaEtqAuxSal:string = generador.newEtiqueta();
        let nuevaEtqAuxIns:string = generador.newEtiqueta(); 
        
        generador.addGetStack(temp,"p");                                    //  temp = stack[p]
        generador.addEtiqueta(nuevaEtqAuxEnt);                              //  Le:
        let temporalIterador  = generador.newTemporal();
        generador.liberarTemporal(temporalIterador);                    
        generador.addGetHeap(temporalIterador,temp);                        //  Ti = Heap[Temp]
        generador.addIf(temporalIterador,-1,"==",nuevaEtqAuxSal);           //  if(Ti == -1) goto Ls:
        generador.addGoto(nuevaEtqAuxIns);                                  //  goto Li:
        generador.addEtiqueta(nuevaEtqAuxIns);                              //  Li:
        let accesoIterador = generador.newAcceso();
        generador.addExpresion(accesoIterador,temporalIterador);
        generador.addPrint("c",accesoIterador);                             //      print("%c",Ti)
        //temp = generador.newTemporal();
        generador.addExpresion(temp,temp,1,"+");                            //      temp = temp + 1;
        generador.addGoto(nuevaEtqAuxEnt);                                  //      goto Le      
        generador.addEtiqueta(nuevaEtqAuxSal);                              //  Ls:
        generador.addReturnVoid();
        generador.addEnd();
        generador.addComentario("-----TERMINA IMPRIMIR STRING-----");
  
    }

    public nativa_conca_string_string(){
        
        let generador = Generador.getInstancia();
        generador.addComentario("-----INICIA CONCATENACION STRING STRING-----");
        generador.addBegin("nativa_conca_string_string()","void");
        
        let temp1 =generador.newTemporal();
        generador.liberarTemporal(temp1);
        generador.addExpresion(temp1,'p', 1,'+');           //t1 = p+1
        generador.addGetStack(temp1,temp1);                 //t1 = stack[t1]
        generador.addSetStack('p','h');

        let etiqEnt = generador.newEtiqueta();
        let etiqSal = generador.newEtiqueta();
        let etiqIns = generador.newEtiqueta();
        generador.addEtiqueta(etiqEnt);                     //Le:
        let temp2 = generador.newTemporal();
        generador.liberarTemporal(temp2);
        generador.addGetHeap(temp2,temp1);                  //t2 = heap[t1]
        generador.addIf(temp2,-1,'!=',etiqIns);             //if(t2!=-1) goto Li
        generador.addGoto(etiqSal);                         //goto Ls
        generador.addEtiqueta(etiqIns);                     //Li:
        generador.addSetHeap('h',temp2);                    //heap[h]=t2
        generador.nextHeap();                               //h = h+1
        generador.addExpresion(temp1,temp1,1,'+');          //t1 = t1 + 1
        generador.addGoto(etiqEnt)                          //goto Le
        generador.addEtiqueta(etiqSal);                     //Ls:


        generador.addExpresion(temp1,'p', 2,'+');           //t1 = p+2
        generador.addGetStack(temp1,temp1);                 //t1 = stack[t1]

        etiqEnt = generador.newEtiqueta();
        etiqSal = generador.newEtiqueta();
        etiqIns = generador.newEtiqueta();
        generador.addEtiqueta(etiqEnt);                     //Le:
        temp2 = generador.newTemporal();
        generador.liberarTemporal(temp2);
        generador.addGetHeap(temp2,temp1);                  //t2 = heap[t1]
        generador.addIf(temp2,-1,'!=',etiqIns);             //if(t2!=-1) goto Li
        generador.addGoto(etiqSal);                         //goto Ls
        generador.addEtiqueta(etiqIns);                     //Li:
        generador.addSetHeap('h',temp2);                    //heap[h]=t2
        generador.nextHeap();                               //h = h+1
        generador.addExpresion(temp1,temp1,1,'+');          //t1 = t1 + 1
        generador.addGoto(etiqEnt)                          //goto Le
        generador.addEtiqueta(etiqSal);                     //Ls:
        generador.addSetHeap('h',-1);
        generador.nextHeap();
        generador.addEnd();
        generador.addComentario("-----FIN CONCATENACION STRING STRING-----");      

    }

    public nativa_conca_number_string(){
        let generador = Generador.getInstancia();
        generador.addComentario("-----INICIA CONCATENACION NUMBER STRING-----");
        generador.addBegin("nativa_conca_number_string()","void");
    
        let etiquetaS = generador.newEtiqueta();
        let temp1 = generador.newTemporal();
        generador.liberarTemporal(temp1);
        let tempN = generador.newTemporal();
        generador.liberarTemporal(tempN);

        
        generador.addExpresion(temp1,'p',1,'+');            //      t1 = p + 1
        generador.addGetStack(temp1,temp1);                 //      t1 = stack[t1]
        generador.addExpresion(tempN,temp1);                //      tn = t1;
        generador.addIf(temp1,0,'>',etiquetaS);             //      if(t1>0) goto Ls
        generador.addExpresion(temp1,temp1,-1,'*');         //      t1 = t1 * -1
        generador.addEtiqueta(etiquetaS);                   //  Ls:
        let etiqueta1 = generador.newEtiqueta();
        let etiqueta2 = generador.newEtiqueta();
        let etiqueta3 = generador.newEtiqueta();
        let temp2 = generador.newTemporal();
        generador.liberarTemporal(temp2);
        generador.addExpresion(temp2,0);                    //      t2 = 0
        generador.addEtiqueta(etiqueta1);                   //  L1:
        let temp3 = generador.newTemporal();
        generador.liberarTemporal(temp3);          
        generador.addCodigo(`${temp3}=fmod(${temp1},1);`);  //      t3 = fmod(t1, 1);
        generador.addIf(temp3,0,'!=',etiqueta2);            //      if(t3 != 0) goto L2: 
        generador.addGoto(etiqueta3);                       //      goto L3
        generador.addEtiqueta(etiqueta2);                   //  L2:
        generador.addExpresion(temp1,temp1,10,'*');         //      t1 = t1 * 10
        generador.addExpresion(temp2, temp2,1,'+');         //      t2 = t2 + 1
        generador.addGoto(etiqueta1);                       //      goto L1    
        generador.addEtiqueta(etiqueta3);                   //  L3:                     //cuando esta aca es un entero con t2 posiciones que se movieron del punto
        //generador.addPrintln('f',temp1);
        //generador.addPrintln('f',temp2);
        
        generador.addCodigo(`${temp3}=fmod(${temp1},10);`); //      t3 = fmod(t1, 10)
        let tempR1 = generador.newAcceso();
        generador.addExpresion(tempR1,temp1,10,'/');        //      t1 = t1 / 10
        generador.addExpresion(temp1,tempR1);               //      t1 = t1
        generador.addExpresion(temp3,temp3,48,'+');         //      t3 = t3 + 48            numero ascii
        generador.addSetHeap('h',temp3);                    //      heap[h] = t3
        generador.nextHeap();                               //      h = h + 1
        generador.addExpresion(temp2,temp2,1,'-');          //      t2 = t2 - 1
        let etiqueta4 = generador.newEtiqueta();            
        let etiqueta5 = generador.newEtiqueta();
        generador.addIf(temp2,0,'>',etiqueta3);             //      if(t2 > 0) goto L3
        generador.addIf(temp2,0,'==',etiqueta4);            //      if(t2==0)  goto L4
        generador.addGoto(etiqueta5);                       //      goto L5
        generador.addEtiqueta(etiqueta4);                   //  L4:
        generador.addSetHeap('h',46);                       //      heap[h] = '.'
        generador.nextHeap();                               //      h = h + 1
        generador.addEtiqueta(etiqueta5);                   //  L5: 
        generador.addCodigo(`${temp3}=fmod(${tempR1},10);`);//      t3 = fmod(t1, 10);
        generador.addExpresion(temp3,temp3,48,'+');         //      t3 = t3 + 48            numero ascii
        generador.addSetHeap('h',temp3);                   //       heap[h] = t3;
        generador.nextHeap();                               //      h = h + 1 ;
        generador.addExpresion(tempR1, tempR1,10,'/');      //      t1 = t1 / 10;
        let etiqueta6 = generador.newEtiqueta();
        generador.addIf(tempR1,0,'==',etiqueta6);           //      if(t1 == 0) goto L6
        generador.addGoto(etiqueta5);                       //      goto L5:
        generador.addEtiqueta(etiqueta6);                   //      L6:
        let etiquetaN = generador.newEtiqueta();
        
        generador.addIf(tempN,0,'>',etiquetaN);             //      if(tn > 0) goto Ln
        generador.addSetHeap('h',45);                       //      heap[h]='-'
        generador.nextHeap();                               //      h = h + 1;
        generador.addEtiqueta(etiquetaN);                   //  Ln:
        generador.addSetHeap('h',-1);                       //      heap[h]=-1
        generador.nextHeap();                               //      h = h + 1;

        let inicioCadena =generador.newTemporal();          
        generador.liberarTemporal(inicioCadena);
        let nuevaEtiqueta =generador.newEtiqueta();
        let etiquetaS2 = generador.newEtiqueta();
        generador.addExpresion(inicioCadena,'h');           //      ic = h
        generador.addExpresion(temp1,'h',2,'-');            //      t1 = h - 2 ;
        generador.addEtiqueta(nuevaEtiqueta);               //   Nl:
        generador.addGetHeap(temp2,temp1);                  //      t2 = Heap[t1]
        generador.addIf(temp2,-1,'==',etiquetaS2);          //      if(t2 == -1) goto S2
        generador.addExpresion(temp1,temp1,1,'-');          //      t1 = t1 - 1
        generador.addSetHeap('h',temp2);                    //      Heap[h] = t2;
        generador.nextHeap();                               //      h = h + 1
        generador.addGoto(nuevaEtiqueta);                   //      goto Nl
        generador.addEtiqueta(etiquetaS2)                   //  S2:
        //generador.addSetHeap('h',-1);                       //      Heap[h] = -1;
        //generador.nextHeap();                               //      h = h + 1
        //generador.addSetStack('p',inicioCadena);
        
        generador.addExpresion(temp1,'p', 2,'+');           //t1 = p+2
        generador.addGetStack(temp1,temp1);                 //t1 = stack[t1]

        let etiqEnt = generador.newEtiqueta();
        let etiqSal = generador.newEtiqueta();
        let etiqIns = generador.newEtiqueta();
        generador.addEtiqueta(etiqEnt);                     //Le:
        temp2 = generador.newTemporal();
        generador.liberarTemporal(temp2);
        generador.addGetHeap(temp2,temp1);                  //t2 = heap[t1]
        generador.addIf(temp2,-1,'!=',etiqIns);             //if(t2!=-1) goto Li
        generador.addGoto(etiqSal);                         //goto Ls
        generador.addEtiqueta(etiqIns);                     //Li:
        generador.addSetHeap('h',temp2);                    //heap[h]=t2
        generador.nextHeap();                               //h = h+1
        generador.addExpresion(temp1,temp1,1,'+');          //t1 = t1 + 1
        generador.addGoto(etiqEnt)                          //goto Le
        generador.addEtiqueta(etiqSal);                     //Ls:
        generador.addSetHeap('h',-1);
        generador.nextHeap();
        generador.addSetStack('p',inicioCadena);

        generador.addEnd();
        generador.addComentario("-----FIN CONCATENAR NUMBER A STRING-----");   
    }

    
    public nativa_conca_string_number(){
        let generador = Generador.getInstancia();
        generador.addComentario("-----INICIA CONCATENACION STRING NUMBER-----");
        generador.addBegin("nativa_conca_string_number()","void");

        //conversion
        let etiquetaS = generador.newEtiqueta();
        let temp1 = generador.newTemporal();
        generador.liberarTemporal(temp1);
        let tempN = generador.newTemporal();
        generador.liberarTemporal(tempN);

        
        generador.addExpresion(temp1,'p',2,'+');            //      t1 = p + 1
        generador.addGetStack(temp1,temp1);                 //      t1 = stack[t1]
        generador.addExpresion(tempN,temp1);                //      tn = t1;
        generador.addIf(temp1,0,'>',etiquetaS);             //      if(t1>0) goto Ls
        generador.addExpresion(temp1,temp1,-1,'*');         //      t1 = t1 * -1
        generador.addEtiqueta(etiquetaS);                   //  Ls:
        let etiqueta1 = generador.newEtiqueta();
        let etiqueta2 = generador.newEtiqueta();
        let etiqueta3 = generador.newEtiqueta();
        let temp2 = generador.newTemporal();
        generador.liberarTemporal(temp2);
        generador.addExpresion(temp2,0);                    //      t2 = 0
        generador.addEtiqueta(etiqueta1);                   //  L1:
        let temp3 = generador.newTemporal();
        generador.liberarTemporal(temp3);          
        generador.addCodigo(`${temp3}=fmod(${temp1},1);`);  //      t3 = fmod(t1, 1);
        generador.addIf(temp3,0,'!=',etiqueta2);            //      if(t3 != 0) goto L2: 
        generador.addGoto(etiqueta3);                       //      goto L3
        generador.addEtiqueta(etiqueta2);                   //  L2:
        generador.addExpresion(temp1,temp1,10,'*');         //      t1 = t1 * 10
        generador.addExpresion(temp2, temp2,1,'+');         //      t2 = t2 + 1
        generador.addGoto(etiqueta1);                       //      goto L1    
        generador.addEtiqueta(etiqueta3);                   //  L3:                     //cuando esta aca es un entero con t2 posiciones que se movieron del punto
        //generador.addPrintln('f',temp1);
        //generador.addPrintln('f',temp2);
        
        generador.addCodigo(`${temp3}=fmod(${temp1},10);`); //      t3 = fmod(t1, 10)
        let tempR1 = generador.newAcceso();
        generador.addExpresion(tempR1,temp1,10,'/');        //      t1 = t1 / 10
        generador.addExpresion(temp1,tempR1);               //      t1 = t1
        generador.addExpresion(temp3,temp3,48,'+');         //      t3 = t3 + 48            numero ascii
        generador.addSetHeap('h',temp3);                    //      heap[h] = t3
        generador.nextHeap();                               //      h = h + 1
        generador.addExpresion(temp2,temp2,1,'-');          //      t2 = t2 - 1
        let etiqueta4 = generador.newEtiqueta();            
        let etiqueta5 = generador.newEtiqueta();
        generador.addIf(temp2,0,'>',etiqueta3);             //      if(t2 > 0) goto L3
        generador.addIf(temp2,0,'==',etiqueta4);            //      if(t2==0)  goto L4
        generador.addGoto(etiqueta5);                       //      goto L5
        generador.addEtiqueta(etiqueta4);                   //  L4:
        generador.addSetHeap('h',46);                       //      heap[h] = '.'
        generador.nextHeap();                               //      h = h + 1
        generador.addEtiqueta(etiqueta5);                   //  L5: 
        generador.addCodigo(`${temp3}=fmod(${tempR1},10);`);//      t3 = fmod(t1, 10);
        generador.addExpresion(temp3,temp3,48,'+');         //      t3 = t3 + 48            numero ascii
        generador.addSetHeap('h',temp3);                   //       heap[h] = t3;
        generador.nextHeap();                               //      h = h + 1 ;
        generador.addExpresion(tempR1, tempR1,10,'/');      //      t1 = t1 / 10;
        let etiqueta6 = generador.newEtiqueta();
        generador.addIf(tempR1,0,'==',etiqueta6);           //      if(t1 == 0) goto L6
        generador.addGoto(etiqueta5);                       //      goto L5:
        generador.addEtiqueta(etiqueta6);                   //      L6:
        let etiquetaN = generador.newEtiqueta();
        
        generador.addIf(tempN,0,'>',etiquetaN);             //      if(tn > 0) goto Ln
        generador.addSetHeap('h',45);                       //      heap[h]='-'
        generador.nextHeap();                               //      h = h + 1;
        generador.addEtiqueta(etiquetaN);                   //  Ln:
        generador.addSetHeap('h',-1);                       //      heap[h]=-1
        generador.nextHeap();                               //      h = h + 1;
        //fin conversion (queda al revez)

        let inicioNumero = generador.newTemporal();
        generador.liberarTemporal(inicioNumero);
        generador.addExpresion(inicioNumero, 'h');

        let inicioCadena =generador.newTemporal();          
        generador.liberarTemporal(inicioCadena);
        let nuevaEtiqueta =generador.newEtiqueta();
        let etiquetaS2 = generador.newEtiqueta();
        generador.addExpresion(inicioCadena,'h');           //      ic = h
        
        let temp1s =generador.newTemporal();
        generador.liberarTemporal(temp1s);
        generador.addExpresion(temp1s,'p', 1,'+');           //t1 = p+1
        generador.addGetStack(temp1s,temp1s);                 //t1 = stack[t1]
        generador.addSetStack('p','h');

        let etiqEnt = generador.newEtiqueta();
        let etiqSal = generador.newEtiqueta();
        let etiqIns = generador.newEtiqueta();
        generador.addEtiqueta(etiqEnt);                     //Le:
        let temp2s = generador.newTemporal();
        generador.liberarTemporal(temp2s);
        generador.addGetHeap(temp2s,temp1s);                  //t2 = heap[t1]
        generador.addIf(temp2s,-1,'!=',etiqIns);             //if(t2!=-1) goto Li
        generador.addGoto(etiqSal);                         //goto Ls
        generador.addEtiqueta(etiqIns);                     //Li:
        generador.addSetHeap('h',temp2s);                    //heap[h]=t2
        generador.nextHeap();                               //h = h+1
        generador.addExpresion(temp1s,temp1s,1,'+');          //t1 = t1 + 1
        generador.addGoto(etiqEnt)                          //goto Le
        generador.addEtiqueta(etiqSal);                     //Ls:
        //ACA YA TENGO EL STRING EN EL HEAP


        generador.addExpresion(temp1, inicioNumero,2,'-');            //      t1 = h - 2 ;
        generador.addEtiqueta(nuevaEtiqueta);               //   Nl:
        generador.addGetHeap(temp2,temp1);                  //      t2 = Heap[t1]
        generador.addIf(temp2,-1,'==',etiquetaS2);          //      if(t2 == -1) goto S2
        generador.addExpresion(temp1,temp1,1,'-');          //      t1 = t1 - 1
        generador.addSetHeap('h',temp2);                    //      Heap[h] = t2;
        generador.nextHeap();                               //      h = h + 1
        generador.addGoto(nuevaEtiqueta);                   //      goto Nl
        generador.addEtiqueta(etiquetaS2)                   //  S2:
        
        
        generador.addSetHeap('h',-1);
        generador.nextHeap();
        generador.addSetStack('p',inicioCadena);
        
        generador.addEnd();
        generador.addComentario("-----FIN CONVERTIR NUMBER A STRING-----");   
    }

    public nativa_conca_boolean_string(){
        let generador = Generador.getInstancia();
        generador.addComentario("-----INICIA CONCATENACION BOOLEAN-STRING -----");
        generador.addBegin("nativa_conca_boolean_string()","void");
        let etiquetaTrue = generador.newEtiqueta();
        let etiquetaSalida = generador.newEtiqueta();
        let temp1 =generador.newTemporal();
        generador.liberarTemporal(temp1);
        generador.addSetStack('p','h');                     // aca envio la posicion en que iniciara la cadena
        generador.addExpresion(temp1,'p',1,'+');            // t1 = p + 1
        generador.addGetStack(temp1,temp1);                 //  t1 = stack[t1]
        generador.addIf(temp1,1,'==',etiquetaTrue);         //  if(temp1 == 1) goto Lv
        


        generador.addSetHeap('h',102);                      //  heap[h]=102
        generador.nextHeap();                               //  h = h + 1

        generador.addSetHeap('h',97);                      //  heap[h]=97
        generador.nextHeap();                               //  h = h + 1

        generador.addSetHeap('h',108);                      //  heap[h]=108
        generador.nextHeap();                               //  h = h + 1

        generador.addSetHeap('h',115);                      //  heap[h]=115
        generador.nextHeap();                               //  h = h + 1

        generador.addSetHeap('h',101);                      //  heap[h]=101
        generador.nextHeap();                               //  h = h + 1
        generador.addGoto(etiquetaSalida);                   //  goto Ls

        generador.addEtiqueta(etiquetaTrue);

        generador.addSetHeap('h',116);                      //  heap[h]=97
        generador.nextHeap();                               //  h = h + 1

        generador.addSetHeap('h',114);                      //  heap[h]=108
        generador.nextHeap();                               //  h = h + 1

        generador.addSetHeap('h',117);                      //  heap[h]=115
        generador.nextHeap();                               //  h = h + 1

        generador.addSetHeap('h',101);                      //  heap[h]=101
        generador.nextHeap();                               //  h = h + 1
        
        generador.addEtiqueta(etiquetaSalida);


        //aca tendria el valor booleano

        let tempR = generador.newTemporal();
        generador.liberarTemporal(tempR);
        generador.addExpresion(temp1,'p', 2,'+');           //t1 = p+2
        generador.addGetStack(temp1,temp1);                 //t1 = stack[t1]

        let etiqEnt = generador.newEtiqueta();
        let etiqSal = generador.newEtiqueta();
        let etiqIns = generador.newEtiqueta();
        generador.addEtiqueta(etiqEnt);                     //Le:
        let temp2 = generador.newTemporal();
        generador.liberarTemporal(temp2);
        generador.addGetHeap(temp2,temp1);                  //t2 = heap[t1]
        generador.addIf(temp2,-1,'!=',etiqIns);             //if(t2!=-1) goto Li
        generador.addGoto(etiqSal);                         //goto Ls
        generador.addEtiqueta(etiqIns);                     //Li:
        generador.addSetHeap('h',temp2);                    //heap[h]=t2
        generador.nextHeap();                               //h = h+1
        generador.addExpresion(temp1,temp1,1,'+');          //t1 = t1 + 1
        generador.addGoto(etiqEnt)                          //goto Le
        generador.addEtiqueta(etiqSal);                     //Ls:
        generador.addSetHeap('h',-1);                      //  heap[h]=101
        generador.nextHeap();                               //  h = h + 1
        generador.addReturnVoid();
        generador.addEnd();
        generador.addComentario("-----FIN CONVERTIR BOOLEAN-STRING -----");   
    }

    public nativa_conca_string_boolean(){
        let generador = Generador.getInstancia();
        generador.addComentario("-----INICIA CONCATENACION STRING- BOOLEAN-----");
        generador.addBegin("nativa_conca_string_boolean()","void");

        let temp1 =generador.newTemporal();
        generador.liberarTemporal(temp1);

        let tempR = generador.newTemporal();
        generador.liberarTemporal(tempR);
        generador.addExpresion(temp1,'p', 1,'+');           //t1 = p+1
        generador.addGetStack(temp1,temp1);                 //t1 = stack[t1]
        generador.addSetStack('p','h');                     // aca envio la posicion en que iniciara la cadena

        let etiqEnt = generador.newEtiqueta();
        let etiqSal = generador.newEtiqueta();
        let etiqIns = generador.newEtiqueta();
        generador.addEtiqueta(etiqEnt);                     //Le:
        let temp2 = generador.newTemporal();
        generador.liberarTemporal(temp2);
        generador.addGetHeap(temp2,temp1);                  //t2 = heap[t1]
        generador.addIf(temp2,-1,'!=',etiqIns);             //if(t2!=-1) goto Li
        generador.addGoto(etiqSal);                         //goto Ls
        generador.addEtiqueta(etiqIns);                     //Li:
        generador.addSetHeap('h',temp2);                    //heap[h]=t2
        generador.nextHeap();                               //h = h+1
        generador.addExpresion(temp1,temp1,1,'+');          //t1 = t1 + 1
        generador.addGoto(etiqEnt)                          //goto Le
        generador.addEtiqueta(etiqSal);                     //Ls:
        //aca ya tengo el string

        let etiquetaTrue = generador.newEtiqueta();
        let etiquetaSalida = generador.newEtiqueta();
        generador.addExpresion(temp1,'p',2,'+');            // t1 = p + 2
        generador.addGetStack(temp1,temp1);                 //  t1 = stack[t1]
        generador.addIf(temp1,1,'==',etiquetaTrue);         //  if(temp1 == 1) goto Lv
        
        generador.addSetHeap('h',102);                      //  heap[h]=102
        generador.nextHeap();                               //  h = h + 1

        generador.addSetHeap('h',97);                      //  heap[h]=97
        generador.nextHeap();                               //  h = h + 1

        generador.addSetHeap('h',108);                      //  heap[h]=108
        generador.nextHeap();                               //  h = h + 1

        generador.addSetHeap('h',115);                      //  heap[h]=115
        generador.nextHeap();                               //  h = h + 1

        generador.addSetHeap('h',101);                      //  heap[h]=101
        generador.nextHeap();                               //  h = h + 1
        generador.addGoto(etiquetaSalida);                   //  goto Ls

        generador.addEtiqueta(etiquetaTrue);

        generador.addSetHeap('h',116);                      //  heap[h]=97
        generador.nextHeap();                               //  h = h + 1

        generador.addSetHeap('h',114);                      //  heap[h]=108
        generador.nextHeap();                               //  h = h + 1

        generador.addSetHeap('h',117);                      //  heap[h]=115
        generador.nextHeap();                               //  h = h + 1

        generador.addSetHeap('h',101);                      //  heap[h]=101
        generador.nextHeap();                               //  h = h + 1
        
        generador.addEtiqueta(etiquetaSalida);

        generador.addSetHeap('h',-1);                      //  heap[h]=101
        generador.nextHeap();                               //  h = h + 1

        generador.addEnd();
        generador.addComentario("-----FIN CONVERTIR STRING - BOOLEAN -----");   
    }

    public nativa_potencia(){

        let generador = Generador.getInstancia();
        generador.addComentario("-----INICIA POTENCIA-----");
        generador.addBegin("nativa_potencia()","void");
        
        let resultado = generador.newTemporal();
        let multiplicador = generador.newTemporal();
        let temp1 = generador.newTemporal();
        let contador = generador.newTemporal();

        generador.liberarTemporal(resultado);
        generador.liberarTemporal(multiplicador);
        generador.liberarTemporal(temp1);
        generador.liberarTemporal(contador);

        let etiquetaEntrada = generador.newEtiqueta();
        let etiquetaInstrucciones = generador.newEtiqueta();
        let etiquetaSalida = generador.newEtiqueta();

        generador.addExpresion(temp1,'p',2,'+');
        generador.addGetStack(contador,temp1);

        generador.addExpresion(resultado,0);
        generador.addIf(contador,0,'==',etiquetaSalida);

        generador.addExpresion(temp1,'p',1,'+');
        generador.addGetStack(resultado,temp1);
        generador.addExpresion(multiplicador,resultado);

        generador.addExpresion(contador,contador, 1,'-');
        generador.addEtiqueta(etiquetaEntrada);
        generador.addIf(contador,0,'>',etiquetaInstrucciones);
        generador.addGoto(etiquetaSalida);
        
        generador.addEtiqueta(etiquetaInstrucciones);
        generador.addExpresion(resultado,resultado,multiplicador,'*');
        generador.addExpresion(contador,contador,1,'-');
        generador.addGoto(etiquetaEntrada);
        
        generador.addEtiqueta(etiquetaSalida);
        generador.addSetStack('p',resultado);
        generador.addReturnVoid();
        generador.addEnd();
        generador.addComentario("-----TERMINA POTENCIA -----");
    }

    public nativa_comparar_string(){

        let generador = Generador.getInstancia();
        generador.addComentario("-----INICIA COMPARAR STRING-----");
        generador.addBegin("nativa_comparar_string()","void");
        
        let resultado = generador.newTemporal();
        generador.liberarTemporal(resultado);

        let temp1 =generador.newTemporal();
        let temp2 =generador.newTemporal();
        generador.liberarTemporal(temp1);
        generador.liberarTemporal(temp2);

        generador.addExpresion(resultado,0);

        generador.addExpresion(temp1,'p',1,'+');
        generador.addGetStack(temp1,temp1);

        generador.addExpresion(temp2,'p',2,'+');
        generador.addGetStack(temp2,temp2);

        let char1 =generador.newTemporal();
        let char2 =generador.newTemporal();
        generador.liberarTemporal(char1);
        generador.liberarTemporal(char2);

        let etiquetaInicio =generador.newEtiqueta();
        let etiquetaSi = generador.newEtiqueta();
        let etiquetaSalida = generador.newEtiqueta();

        generador.addEtiqueta(etiquetaInicio);
        
        generador.addGetHeap(char1,temp1);
        generador.addGetHeap(char2,temp2);

        generador.addIf(char1,char2,'!=',etiquetaSalida);
        generador.addIf(char1,-1,'==',etiquetaSi);
        
        generador.addExpresion(temp1,temp1,1,'+');
        generador.addExpresion(temp2,temp2,1,'+');
        generador.addGoto(etiquetaInicio);
        
        generador.addEtiqueta(etiquetaSi);
        generador.addExpresion(resultado,1);

        generador.addEtiqueta(etiquetaSalida);

        generador.addSetStack('p',resultado);
        generador.addReturnVoid();
        generador.addEnd();
        generador.addComentario("-----TERMINA STRING -----");
    }

}

