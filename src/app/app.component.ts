import { Component } from '@angular/core';
import { parser } from '../interprete/Grammar/Grammar.js';
import { parser3 } from '../interprete/Grammar/Grammar3.js';
//import { Entorno } from '../interprete/Simbolo/Entorno';
import { cuadro_texto, prueba } from "../interprete/Abstracto/Retorno";
import { errores } from '../interprete/Errores/Errores';

import "codemirror/lib/codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/javascript-hint";
import { Router } from '@angular/router';
import { parserT } from '../traduccionc3d/Grammar/Grammar.js';
import { Generador } from '../traduccionc3d/Generador/Generador';
import { Nativas } from 'src/traduccionc3d/Generador/Nativas';
import { Entorno } from 'src/traduccionc3d/TablaSimbolos/Entorno';
import { FuncionSt } from 'src/traduccionc3d/Instruccion/Funciones/FuncionSt';
import { Declaracion } from 'src/traduccionc3d/Instruccion/Variables/Declaracion';
import { StructSt } from 'src/traduccionc3d/Instruccion/Funciones/StructSt';
import { Optimizador } from 'src/traduccionc3d/Optimizacion/Optimizador';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'interprete-web';
  entrada = 'console.log(!(!(16 == 16 && (false == true)) && !(true)));';
  traduccion = "";
  consola_salida = "";

  txt_c3d="";
  txt_c3d_optimizado="";
  constructor(private router:Router){

  }
  options_entrada: any = {
    lineNumbers: true,
    theme: 'dracula',
    lineWrapping: true,
    indentWithTabs: true,
    mode: 'javascript',
    styleActiveLine: true
  };
  options_salida: any = {
    lineNumbers: true,
    theme: 'mbo',
    lineWrapping: true,
    indentWithTabs: true,
    mode: 'javascript',
    styleActiveLine: true
  };
  options_c3d: any = {
    lineNumbers: true,
    theme: 'abcdef',
    lineWrapping: true,
    indentWithTabs: true,
    mode: 'javascript',
    styleActiveLine: true
  };
  options_consola: any = {
    lineNumbers: true,
    theme: 'abcdef',
    lineWrapping: true,
    indentWithTabs: true,
    mode: '',
    styleActiveLine: true
  };

  
  public ejecutar() {
    cuadro_texto.entrada = this.entrada.toString();
    errores.length = 0;
    const env = new Entorno(null);
    this.consola_salida = "";
    cuadro_texto.salida = "";
    cuadro_texto.simbolos =[];
    const ast = parser.parse(this.entrada.toString());
    /*
    for(const instr of ast){
      try{
        if(instr instanceof Funcion){
          instr.ejecutar(env);
        }
      }catch{
        errores.push();
      }
    }
    console.log(env);

    for (const instr of ast) {
      try {
        if(instr instanceof Funcion){
          
        }else{
          instr.ejecutar(env);
        }
      } catch (error) {
        errores.push(error);
      }
    }
    console.log(env);
    this.imprimirErrores();
    */
  }

  public traducir(){
    
    cuadro_texto.entrada = this.entrada.toString();
    errores.length = 0;
    const env = new Entorno(null);
    this.consola_salida = "";
    cuadro_texto.traducir = "";
    cuadro_texto.salida = "";
    cuadro_texto.simbolos =[];
    const textoTraducido = parser3.parse(this.entrada.toString());
    this.traduccion = textoTraducido;

  }

  
  public ejecutarTraduccion() {
    cuadro_texto.entrada = this.entrada.toString();
    errores.length = 0;
    this.consola_salida = "";
    cuadro_texto.salida = "";
    cuadro_texto.simbolos =[];

    const ast = parserT.parse(this.traduccion);
    let env:Entorno = new Entorno(null);
    console.log(ast);
    Generador.getInstancia().limpiarGenerador();
    let nativas  = new Nativas();
    
    for(const instr of ast){
      try{
        if(instr instanceof FuncionSt || instr instanceof StructSt){
          instr.compilar(env);
        }
      }catch(err){
        errores.push(err);
      }
    }

    Generador.getInstancia().addBegin('main()','void');
    for(const instr of ast){
      try{
        if(!(instr instanceof StructSt) &&  !(instr instanceof FuncionSt)){
          instr.compilar(env);
        }
      }catch(err){
        errores.push(err);
      }
    }

    Generador.getInstancia().addReturnVoid();
    Generador.getInstancia().addEnd();
    
    for(const instr of ast){
      try{
        if((instr instanceof FuncionSt)){
          instr.compilar(env);
        }
      }catch(err){
        errores.push(err);
      }
    }
    Generador.getInstancia().addEncabezado();
    console.log(Generador.getInstancia().getAlmacenamientoTemp());
    this.txt_c3d = Generador.getInstancia().getCodigo();
    this.imprimirErrores();
    console.log(Generador.getInstancia().getCodigo());
    
  
    
  }

  public imprimirErrores() {
    for (const err of errores) {
      this.consola_salida = this.consola_salida + "-----------------------**** ERROR ****-----------------------------------------\n";
      this.consola_salida = this.consola_salida + '[X]   ->   ' + err.mensaje + '.  Fila: ' + err.linea + ', Columna: ' + err.columna + '\n';
      this.consola_salida = this.consola_salida + "-------------------------------------------------------------------------------\n";
    }
    this.consola_salida = this.consola_salida + cuadro_texto.salida;
  }

  public reportes(){
    this.router.navigate(['/reportes']);
  }

  public generarC3D(){
    cuadro_texto.entrada = this.entrada.toString();
    errores.length = 0;
    this.consola_salida = "";
    cuadro_texto.salida = "";
    cuadro_texto.simbolos =[];

    const ast = parserT.parse(this.entrada);
    let env:Entorno = new Entorno(null);
    console.log(ast);
    Generador.getInstancia().limpiarGenerador();
    let nativas  = new Nativas();
    
    for(const instr of ast){
      try{
        if(instr instanceof FuncionSt || instr instanceof StructSt){
          instr.compilar(env);
        }
      }catch(err){
        errores.push(err);
      }
    }

    Generador.getInstancia().addBegin('main()','void');
    for(const instr of ast){
      try{
        if(!(instr instanceof StructSt) &&  !(instr instanceof FuncionSt)){
          instr.compilar(env);
        }
      }catch(err){
        errores.push(err);
      }
    }

    Generador.getInstancia().addReturnVoid();
    Generador.getInstancia().addEnd();
    
    for(const instr of ast){
      try{
        if((instr instanceof FuncionSt)){
          instr.compilar(env);
        }
      }catch(err){
        errores.push(err);
      }
    }
    Generador.getInstancia().addEncabezado();
    console.log(Generador.getInstancia().getAlmacenamientoTemp());
    this.txt_c3d = Generador.getInstancia().getCodigo();
    this.imprimirErrores();
    console.log(Generador.getInstancia().getCodigo());
    
  }

  public optimizar(){
    let optimizador = new Optimizador();

    this.txt_c3d_optimizado=optimizador.regla1(Generador.getInstancia().codigo).join('\n');
    this.txt_c3d_optimizado=optimizador.regla34(Generador.getInstancia().codigo).join('\n');
    
    //this.txt_c3d_optimizado = optimizador.regla34(this.txt_c3d.split('\n')).join('\n');
    console.log(this.txt_c3d_optimizado);
  }
}




