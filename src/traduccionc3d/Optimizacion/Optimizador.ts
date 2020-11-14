
export class Optimizador{


    constructor(){

    }
    public regla1(codigo:string[]):string[]{
        let salida:string[]=[];
        for(let i:number = 0 ; i<codigo.length ; i++){
    
            let instruccionActual:string = codigo[i].trim();
            if(instruccionActual.substring(0,4)=='goto'){
                salida.push(instruccionActual);
                for(let j = i+1; j<codigo.length-1;j++){
                    let instruccionSiguiente = codigo[j].trim();
                    if(instruccionSiguiente.substring(0,1)=='L'){
                        i=j;
                        salida.push(instruccionSiguiente);
                        break;
                    }else{
                        salida.push('');

                    }
                }
            }else{
                salida.push(instruccionActual);
            }
        }
        return salida;
    } 

    public regla34(codigo:string[]):string[]{
        let salida:string[] = [];
        for(let i:number = 0 ; i<codigo.length ; i++){
    
            let instruccionActual:string = codigo[i].trim();
            if(instruccionActual.substring(0,2)=='if'){
                let partesIf:string[] = instruccionActual.split('(');       // If | condicion ) goto etiqueta
                let partesIf2:string[] = partesIf[1].split(')');            // condicion | etiqueta
                
                let operadores:string[]=['>','<','>=',"<=",'==','!=']

                for(let j = 0; j< operadores.length ; j++){
                    

                    if(partesIf2[0].match(operadores[j]) != undefined){
                        let partesOperacion:string[] = partesIf2[0].split(operadores[j]); 
                        //console.log(partesOperacion[0], partesOperacion[1]);
                        if(!isNaN(parseInt(partesOperacion[0])) &&  !isNaN(parseInt(partesOperacion[1]))){
                            console.log('Optimizando');
                            switch(j){
                                case 0:{
                                    if(parseInt(partesOperacion[0]) > parseInt(partesOperacion[1])){
                                        if(codigo[i+1].trim().substring(0,4)=='goto'){
                                            salida.push(instruccionActual);
                                            codigo[i+1]='';
                                        }
                                    }else{
                                        continue;
                                    }
                                    break;
                                }
                                case 1:{
                                    if(parseInt(partesOperacion[0]) < parseInt(partesOperacion[1])){
                                        if(codigo[i+1].trim().substring(0,4)=='goto'){
                                            salida.push(instruccionActual);
                                            codigo[i+1]='';
                                        }
                                    }else{
                                        continue;
                                    }
                                    break;
                                }
                                case 2:{
                                    if(parseInt(partesOperacion[0]) >= parseInt(partesOperacion[1])){
                                        if(codigo[i+1].trim().substring(0,4)=='goto'){
                                            salida.push(instruccionActual);
                                            codigo[i+1]='';
                                        }
                                    }else{
                                        continue;
                                    }
                                    break;
                                }
                                case 3:{
                                    if(parseInt(partesOperacion[0]) <= parseInt(partesOperacion[1])){
                                        if(codigo[i+1].trim().substring(0,4)=='goto'){
                                            salida.push(instruccionActual);
                                            codigo[i+1]='';
                                        }
                                    }else{
                                        continue;
                                    }
                                    break;
                                }
                                case 4:{
                                    if(parseInt(partesOperacion[0]) == parseInt(partesOperacion[1])){
                                        if(codigo[i+1].trim().substring(0,4)=='goto'){
                                            salida.push(instruccionActual);
                                            codigo[i+1]='';
                                        }
                                    }else{
                                        continue;
                                    }
                                    break;
                                }
                                case 5:{
                                    if(parseInt(partesOperacion[0]) != parseInt(partesOperacion[1])){
                                        if(codigo[i+1].trim().substring(0,4)=='goto'){
                                            salida.push(instruccionActual);
                                            codigo[i+1]='';
                                        }
                                    }else{
                                        continue;
                                    }
                                    break;
                                }
                            }
                        }else{
                            salida.push(instruccionActual);
                            break;
                        }
                    }
                }
                

            }else{
                salida.push(instruccionActual);
            }
        }
        return salida;
        
    }
}

