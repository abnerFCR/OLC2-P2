import { Generador } from './Generador';

export class Nativas {  
    constructor(){

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
        generador.addComentario("-----INICIA CONVERTIR NUMBER STRING-----");
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
        generador.addComentario("-----FIN CONVERTIR NUMBER A STRING-----");   
    }

    
    public nativa_conca_string_number(){
        let generador = Generador.getInstancia();
        generador.addComentario("-----INICIA CONVERTIR NUMBER STRING-----");
        generador.addBegin("nativa_conca_number_string()","void");
    
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
        let tempInicioDouble = generador.newTemporal();
        generador.addExpresion(tempInicioDouble,'h')
        
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
        
        generador.addExpresion(temp1,'p', 1,'+');           //t1 = p+2
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


        generador.addExpresion(temp1,tempInicioDouble,2,'-');            //      t1 = tempn - 2 ;
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
}