%{
    const { errores } =require('../../interprete/Errores/Errores');
    const { Error_ } =require('../../interprete/Errores/Error');
    const { Suma } = require('../Expresion/Aritmetico/Suma');
    const { Resta } = require('../Expresion/Aritmetico/Resta');
    const { Inverso } = require('../Expresion/Aritmetico/Inverso');
    const { Residuo } = require('../Expresion/Aritmetico/Residuo');
    const { Multiplicacion } = require('../Expresion/Aritmetico/Multiplicacion');
    const { Division } = require('../Expresion/Aritmetico/Division');
    const { Potencia } = require('../Expresion/Aritmetico/Potencia');
    
    const { IgualIgual } = require('../Expresion/Relacional/Igual');
    const { NoIgual } = require('../Expresion/Relacional/NoIgual');
    const { MayorQue } = require('../Expresion/Relacional/Mayor');
    const { MenorQue } = require('../Expresion/Relacional/Menor');
    const { Ternario } = require('../Expresion/Relacional/Ternario');    

    const { And } = require('../Expresion/Logico/And');
    const { Or } = require('../Expresion/Logico/Or');
    const { Not } = require('../Expresion/Logico/Not');
    
    const { AccesoId } = require('../Expresion/Acceso/AccesoId');
    const { AsignacionId } = require('../Expresion/Asignacion/AsignacionId');
    const { AsignacionFuncion } = require('../Expresion/Asignacion/AsignacionFuncion');
    const { Length } = require('../Expresion/Funciones/Length');
    const { CharAt } = require('../Expresion/Funciones/CharAt');
    const { ToUpperCase } = require('../Expresion/Funciones/ToUpperCase');
    const { ToLowerCase } = require('../Expresion/Funciones/ToLowerCase');
    const { Concat } = require('../Expresion/Funciones/Concat');

    const { If } = require('../Instruccion/Control/If');
    const { DoWhile } = require('../Instruccion/Control/DoWhile');
    const { While } = require('../Instruccion/Control/While');
    const { For } = require('../Instruccion/Control/For');
    const { Switch } = require('../Instruccion/Control/Switch');
    const { Caso } = require('../Utils/Caso');
    
    const { Statement } = require('../Instruccion/Control/Statement');

    const { Declaracion } = require('../Instruccion/Variables/Declaracion');
    const { Asignacion } = require('../Instruccion/Variables/Asignacion');
    const { Continue } = require('../Instruccion/Transferencia/Continue');
    const { Break } = require('../Instruccion/Transferencia/Break');
    const { Return } = require('../Instruccion/Transferencia/Return');

    const { Types, Type } = require('../Utils/Type');
    const { PrimitivoL } = require('../Expresion/Literal/Primitivo');
    const { StringL } = require('../Expresion/Literal/String');

    const { Imprimir } = require('../Instruccion/Funciones/Imprimir');
    const { FuncionSt } = require('../Instruccion/Funciones/FuncionSt');

    const { Parametro } = require('../Utils/Parametro');

%}

%lex
%options case-insensitive
number  [0-9]+
decimal {number}"."{number}
//string  (\"[^"]*\")
identificador [a-zA-Z]([a-zA-Z]|[0-9])*
escapechar [\'\"\\bfnrtv]
escape \\{escapechar}
acceptedquote [^\"\\]+
acceptedquote2 [^\'\\]+
acceptedquote3 [^`\\]+
string (\"({escape}|{acceptedquote})*\")
string2 (\'({escape}|{acceptedquote2})*\')
string3 (\`({escape}|{acceptedquote3})*\`)

%%
\s+                   /* skip whitespace */ 
"/""/"([^\n])*([\n]|<<EOF>>)                  //console.log("imprime comentario "+yytext);
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] //console.log("imprime comentario Multilinea"+yytext);

//TIPOS DE DATOS / EXPRESIONES REGULARES

{decimal}               return 'DECIMAL'
{number}                return 'NUMBER'
{string}                return 'STRING'
{string2}                return 'STRING2'
{string3}                return 'STRING3'


//SIMBOLOS ARITMETICOS, COMA, PUNTOCOMA
"**"                     return '**'
"*"                     return '*'
"/"                     return '/'
";"                     return ';'
","                     return ','
"++"                    return '++'
"--"                    return '--'
"-"                     return '-'
"+"                     return '+'
"^"                     return '^'
"%"                     return '%'

//SIMBOLOS RELACIONALES Y LOGICOS
"<="                  return '<='
">="                  return '>='
"<"                   return '<'
">"                   return '>'
"=="                  return '=='
"!="                  return '!='
"||"                  return '||'
"&&"                  return '&&'
"!"                   return '!'
"?"                     return '?'

//SIMBOLOS DE ASIGNACION
"="                   return '='

//SIMBOLOS DE AGRUPACION
"("                     return '('
")"                     return ')' 
"{"                     return '{'
"}"                     return '}'
"["                     return '['
"]"                     return ']'

":"                     return ':'

//PALABRAS RESERVADAS
"if"                    return 'IF'
"else"                  return 'ELSE'
"while"                 return 'WHILE'
"true"                  return 'TRUE'
"false"                 return 'FALSE'
"console.log"           return 'CONSOLELOG'
"graficar_ts"           return 'GRAFICAR_TS'
"do"                    return 'DO'
"let"                   return 'LET'
"const"                 return 'CONST'
"number"                return 'TIPONUMBER'
"string"                return 'TIPOSTRING'
"boolean"               return 'TIPOBOOLEAN'
"switch"                return 'SWITCH'
"case"                  return 'CASE'
"default"               return 'DEFAULT'
"type"                  return 'TYPE'
"null"                  return 'NULL'
"break"                 return 'BREAK'
"continue"              return 'CONTINUE'
"for"                   return 'FOR'
"of"                   return 'OF'
"in"                    return 'IN'
"function"              return 'FUNCTION'
"void"                  return "TIPOVOID"
"return"                  return "RETURN"  
".push"                 return 'PUSH'
".pop"                  return 'POP'
".length"               return 'LENGTH'
".ToUpperCase"          return 'UPPERCASE'
".ToLowerCase"          return 'LOWERCASE'
'.charAt'               return 'CHARAT'
'.concat'               return 'CONCAT'
"."                     return '.'

([a-zA-Z_])[a-zA-Z0-9_ñÑ]*	return 'ID';
<<EOF>>		            return 'EOF'

.  { 
    //cuadro_texto.errores_sintacticos_lexicos='Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column+'\n'; 
    error=new Error_(yylloc.first_line, yylloc.first_column, 'Lexico','El caracter: " ' + yytext + ' ",  no pertenece al lenguaje');
    errores.push(error);
    //console.log(error);
}

/lex

%left '?'
%left '||'
%left '&&'
%left '==', '!='
%left '>=', '<=', '<', '>'
%left '+' '-' 
%left '*' '/' '%'
%right '**'
$right '!'
%left '++' '--'
%left 'LENGTH'
%left 'CONCAT'
%left 'CHARAT'
%left 'UPPERCASE'
%left 'LOWERCASE'

%start Init

%%

Init    
    : Instrucciones EOF 
    {
        return $1;
    } 
;

Instrucciones
    : Instrucciones Instruccion
    {
        $1.push($2);
        $$ = $1;
    }
    |Instruccion
    {
        $$=[$1];
    }
;

Instruccion
    : Imprimir
    {
        $$=$1;
    }
    |DeclaracionVariable 
    {
        $$ = $1;
    }
    |AsignacionVariable ';'
    {
        $$ = $1;
    }
    |IfSt
    {
        $$ = $1;
    }
    |WhileSt
    {
        $$ = $1;
    }
    |DoWhileSt
    {
        $$=$1;
    }
    |SwitchSt
    {
        $$ =$1;
    }
    |IncreDecre ';'
    {
        $$ = $1;
    }
    |DefinicionTypes ';'
    {
        
    }
    |'BREAK' ';'
    {
        $$ = new Break(@1.first_line, @1.first_column);
    }
    |'CONTINUE' ';'
    {
        $$ = new Continue(@1.first_line, @1.first_column);
    }
    |DeclaracionArreglos ';'
    {
        
    }
    |ForNormal 
    {
        $$ = $1;
    }
    |ForOf 
    {
        
    }
    |ForIn 
    {
                
    }
    |Funcion 
    {
        $$ = $1;
       
    }
    |ID '(' ListaExpr ')' ';'
    {
        $$ = new AsignacionFuncion($1, $3,null,  @1.first_line, @1.first_column);
    }
    |ID '('')' ';'
    {
        $$ = new AsignacionFuncion($1, [],null,  @1.first_line, @1.first_column);
        /*
    }
    |ID  '=' '{' ListaValoresTipo '}' ';'
    {
     */   
    }
    |'RETURN' Expr ';'
    {
        $$ = new Return($2, @1.first_line, @1.first_column);
    }
    |'RETURN' ';'
    {
        $$ = new Return(null, @1.first_line, @1.first_column);
    /*    
    }
    |AsigIndividual '=' Expr ';'
    {
        
    }
    |AsigIndividual '=' '['']' ';'
    {
        
    */
    }
    |error ';'
    {
        error=new Error_(@1.first_line, @1.first_column, 'Sintactico','El caracter: " ' + yytext + ' ",  no se esperaba');
        errores.push(error);
    }
    |error '}'
    {
        error=new Error_(@1.first_line,@1.first_column, 'Sintactico','El caracter: " ' + yytext + ' ",  no se esperaba');
        errores.push(error);
    }  
;


Funcion
    :'FUNCTION' ID '(' ListaParametros ')' TiposFuncion StatementFuncion
    {
        $$ = new FuncionSt($6,$2,$4,$7,@1.first_line,@1.first_column);  
                          //(tipo: Type,id: string, parametros: Array<Parametro>, cuerpo: Instruccion, linea: number, columna: number)
    }
    |'FUNCTION' ID '(' ')' TiposFuncion StatementFuncion
    {
        $$ = new FuncionSt($5,$2,[],$6,@1.first_line,@1.first_column); 
    }
;

ListaParametros
    :ListaParametros ',' ElementoParametro 
    {
        $1.push($3);
        $$ = $1;
    }
    |ElementoParametro
    {
        $$ = [$1];
    }
;

ElementoParametro
    :ID Tipo 
    {
        $$ = new Parametro($1, $2);
    }
    |ID  Tipo ListaCorh
    {
        $$ = new Parametro($1, new Type(Types.ARRAY));
    }
;

ListaCorh
    :ListaCorh '['']'
    |'['']'
;

TiposFuncion
    :Tipo
    {
        $$ = $1;
    }
    |Tipo ListaCorh
    {
        if($1.nombreTipo != Types.STRUCT)
        {
            $$ = new Type(Types.ARRAY, $1.nombreTipo);
        }
        else
        {
            $$ = new Type(Types.ARRAY, $1.nombreTipo);
        }
    }
;

Imprimir
    :CONSOLELOG '(' ListaExpr ')' ';'
    {
        $$ = new Imprimir($3, true, @1.first_line, @1.first_column);
    }
;

DeclaracionVariable
    : 'LET' ID Tipo ';' 
    {
        console.log($3.nombreTipo);
        console.log(Types.STRING);
        if($3.nombreTipo == Types.STRING){
            $$ =  new Declaracion(false, $3, [$2], new StringL(Types.STRING, '', @1.first_line, @1.first_column), @1.first_line, @1.first_column);
        }else{
            $$ =  new Declaracion(false, $3, [$2], null, @1.first_line, @1.first_column);
        }
        
    }
    | 'LET' ID  Tipo  '=' Expr ';' 
    {
        $$ =  new Declaracion(false, $3, [$2], $5, @1.first_line, @1.first_column);
    }
    | 'CONST' ID  Tipo  '=' Expr ';' 
    {
        $$ =  new Declaracion(true, $3, [$2], $5, @1.first_line, @1.first_column);
    }
; 

Tipo:
    |':' 'TIPOSTRING'
    {
        $$ = new Type(Types.STRING);
    }
    |':' 'TIPOBOOLEAN'
    {
        $$ = new Type(Types.BOOLEAN);
    }
    |':' 'TIPONUMBER'
    {
        $$ = new Type(Types.NUMBER);
    }
    |':' ID
    {
        $$ = new Type(Types.STRUCT, $2);
    }
    |':' 'TIPOVOID'
    {
        $$ = new Type(Types.VOID);
    }
;

AsignacionVariable
    : AsigIndividual '=' Expr 
    {
        $$ = new Asignacion($1, $3, @1.first_line, @1.first_column);
    }
;

IfSt 
    : 'IF' '(' Expr ')' Statement
    {
        $$ = new If($3, $5, null, @1.first_line, @1.first_column);
    }
    | 'IF' '(' Expr ')' Statement 'ELSE' Statement 
    {
        $$ = new If($3, $5, $7, @1.first_line, @1.first_column);
    }
    | 'IF' '(' Expr ')' Statement 'ELSE' IfSt 
    {
        $$ = new If($3, $5, $7, @1.first_line, @1.first_column);
    } 
;

WhileSt
    : 'WHILE' '(' Expr ')' Statement
    {
        $$ = new While($3, $5, @1.first_line, @1.first_column);
    }
;

DoWhileSt
    : 'DO' Statement 'WHILE' '(' Expr ')' ';'
    {
        $$ = new DoWhile($5,$2,@1.first_line, @1.first_column);
    }
;

ForNormal
    :'FOR' '(' DeclaracionVariable Expr ';' OpcAsignacion ')' Statement
    {
        $$ = new For($3, $4,$6,$8, @1.first_line, @1.first_column);
    }
;

OpcAsignacion
    :AsignacionVariable
    {
        $$ = $1;
    }
    |IncreDecre
    {
        $$ = $1;
    }
;

SwitchSt
    : 'SWITCH' '(' Expr ')' '{' ListaCasos '}' 
    {
        $$ = new Switch($3, $6, @1.first_line, @1.first_column);
    }
;

ListaCasos
    : ListaCasos Caso 
    {
        $1.push($2);
        $$ = $1;
    }
    |Caso 
    {
        $$ = [$1];
    }
;

Caso
    : 'CASE' Expr ':' Statement
    {
        $$ = new Caso($2, $4,false, @1.first_line, @1.first_column);
    }
    | 'DEFAULT' ':' Statement
    {
        $$ = new Caso(null, $3,true, @1.first_line, @1.first_column);
    }
    | 'CASE' Expr ':' Instrucciones
    {
        $$ = new Caso($2, $4,false, @1.first_line, @1.first_column);
    }
    | 'DEFAULT' ':' Instrucciones
    {
        $$ = new Caso(null, $3,true, @1.first_line, @1.first_column);
    }
;

IncreDecre
    : ID '++'
    {   
        var a = new AsignacionId($1, null, @1.first_line, @1.first_column);
        var b = new AccesoId($1, null, @1.first_line, @1.first_column);
        var c = new PrimitivoL(Types.NUMBER, '1', @1.first_line, @1.first_column);
        var res = new Suma(b,c,@1.first_line, @1.first_column);
        $$ = new Asignacion(a, res, @1.first_line, @1.first_column);
    }
    |ID '--'
    {
        var a = new AsignacionId($1, null, @1.first_line, @1.first_column);
        var b = new AccesoId($1, null, @1.first_line, @1.first_column);
        var c = new PrimitivoL(Types.NUMBER, '1', @1.first_line, @1.first_column);
        var res = new Resta(b,c,@1.first_line, @1.first_column);
        $$ = new Asignacion(a, res, @1.first_line, @1.first_column);
    }
;

Statement
    : '{' Instrucciones '}' 
    {
        $$ =  new Statement($2,@1.first_line,@1.first_column);
    }
    | '{' '}' 
    {
        $$ = new Statement(new Array(), @1.first_line, @1.first_column);
    }
;

ListaID :
    ListaID ',' ID
    {
        $1.push($2);
        $$ = $1;
    }
    |ID
    {
        $$ = [$1];
    }
;

ListaDeclaraciones
    :ListaDeclaraciones ',' ElementoDeclaracion
    {
        
    }
    |ElementoDeclaracion
    {
        
    }
;

ElementoDeclaracion
    :ID Tipo '=' Expr
    {
        
    }
    |ID ':' ID '=' '{' ListaValoresTipo '}'
    {

    }
;

ListaValoresTipo
    :ListaValoresTipo ',' ValorType
    {
    }
    |ValorType
    {
    }
;

ValorType
    :ID ':' Expr
    {
    }
    |ID ':' '{' ListaValoresTipo '}'
    {
    }
;

DefinicionTypes
    : 'TYPE' ID '=' '{' ListaDefiniciones '}'
    {

    }
;

ListaDefiniciones
    : ListaDefiniciones ',' DefinicionAtributo
    {

    }
    |DefinicionAtributo
    {

    }
;

DefinicionAtributo
    :ID ':' Tipo
    {
        
    }
;

DeclaracionArreglos
    :ListaDimensiones '=' '[' ValoresArreglo ']'
    {       
    }
    |ListaDimensiones '=' '[' ListaExpr ']'
    {
    }
    |ListaDimensiones '=' '['']'
    {
    }
    |ListaDimensiones
    {
    }
;

ListaDimensiones
    :ListaDimensiones '[' ']'
    {   
    } 
    |'LET' ID ':' Tipo '[' ']'
    {

    }
    |'CONST' ID ':' Tipo '[' ']'
    {

    }

;

ValoresArreglo
    :ValoresArreglo ',' ValorArreglo
    {
        
    }
    |ValorArreglo
    {

    }
;

ValorArreglo
    :'[' ListaExpr ']'
    {

    }
    |'[' ValoresArreglo ']'
    {   

    }
;

ListaExpr
    :ListaExpr ',' Expr
    {
        $1.push($3);
        $$ = $1;
    }
    |Expr
    {
        $$ = [$1];
    }
;

Expr
    : Expr '+' Expr
    {
        $$ = new Suma($1,$3,@1.first_line,@1.first_column);
    }       
    | Expr '-' Expr
    {
        $$ = new Resta($1,$3,@1.first_line,@1.first_column);
    }
    | Expr '*' Expr
    { 
        $$ = new Multiplicacion($1,$3,@1.first_line,@1.first_column);
    }       
    | Expr '/' Expr
    {
        $$ = new Division($1,$3,@1.first_line,@1.first_column);
    }
    | Expr '**' Expr
    {
        $$ = new Potencia($1,$3,@1.first_line,@1.first_column);
    }
    | Expr '%' Expr
    {
        $$ = new Residuo($1,$3,@1.first_line,@1.first_column);
    }
    | '-' Expr
    {
        $$ = new Inverso($2,@1.first_line,@1.first_column);
    }
    | Expr '++'
    {
    }
    | Expr '--' 
    {
    }
    | Expr '||' Expr
    {
        $$ = new Or($1,$3,@1.first_line, @1.first_column);
    }
    | Expr '&&' Expr
    {
        $$ = new And($1,$3,@1.first_line, @1.first_column); 
    }
    | '!' Expr
    { 
        $$ = new Not($2, @1.first_line, @1.first_column);
    }   
    | Expr '>=' Expr
    {
        $$ = new MayorQue(true,$1,$3,@1.first_line,@1.first_column);
    }
    | Expr '<=' Expr
    { 
        $$ = new MenorQue(true,$1,$3,@1.first_line,@1.first_column);
    }    
    | Expr '>' Expr
    {
        $$ = new MayorQue(false,$1,$3,@1.first_line,@1.first_column);
    }
    | Expr '<' Expr
    {
        $$ = new MenorQue(false,$1,$3,@1.first_line,@1.first_column);
    }
    | Expr '==' Expr
    {
        $$ = new IgualIgual($1,$3,@1.first_line,@1.first_column);
    }
    | Expr '!=' Expr
    { 
        $$ = new NoIgual($1,$3,@1.first_line,@1.first_column);
    }
    | F
    {
        $$=$1;
    }
;

F   : '(' Expr ')'
    { 
        $$ = $2;
    }
    | DECIMAL
    { 
        $$=new PrimitivoL(Types.NUMBER, $1, @1.first_line, @1.first_column);
    }
    | NUMBER
    { 
        $$=new PrimitivoL(Types.NUMBER, $1, @1.first_line, @1.first_column);
    }
    | STRING
    {
        $$ = new StringL(Types.STRING, $1, @1.first_line, @1.first_column);
    }
    | STRING2
    {
        $$ = new StringL(Types.STRING, $1, @1.first_line, @1.first_column);
    }
    | STRING3
    {
        $$ = new StringL(Types.STRING, $1, @1.first_line, @1.first_column);
    }
    | TRUE
    {
        $$=new PrimitivoL(Types.BOOLEAN, true, @1.first_line, @1.first_column);
    }
    | FALSE
    {
        $$=new PrimitivoL(Types.BOOLEAN, false, @1.first_line, @1.first_column);
    }
    |NuevoAcceso
    {
       
    }
    |NULL 
    {
        $$=new PrimitivoL(Types.NULL, -1, @1.first_line, @1.first_column);
    }
    |ID '(' ListaExpr ')' 
    {
        $$ = new AsignacionFuncion($1, $3,null,  @1.first_line, @1.first_column);
    }
    |ID '(' ')' 
    {
        $$ =  new AsignacionFuncion($1, [], null, @1. first_line, @1.first_column);
    }
    | Expr '?' Expr ':' Expr
    {
        $$ = new Ternario($1, $3, $5, @1.first_line, @1.first_column);
    }
    
;

NuevoAcceso
    :Acceso
    {/*
        $$ = $1;
    }
    |Accesos
    {
        $$ = $1;
    */}
    |ID FuncionArreglo
    {
    }
;

Acceso
    :ID
    {
        $$ = new AccesoId($1, null, @1.first_line, @1.first_column);
    }
    |Expr 'LENGTH'
    {
        $$ =  new Length($1, @1.first_line, @1.first_column);
    }
    |Expr 'CHARAT' '(' Expr ')'
    {
        console.log($2);
        $$ =  new CharAt($1,$4, @1.first_line, @1.first_column);
    }
    |Expr 'UPPERCASE' '(' ')'
    {
        $$ =  new ToUpperCase($1, @1.first_line, @1.first_column);
    }
    |Expr 'LOWERCASE' '(' ')'
    {
        $$ =  new ToLowerCase($1, @1.first_line, @1.first_column);
    }
    |Expr 'CONCAT' '(' Expr ')'
    {
        $$ =  new Concat($1,$4, @1.first_line, @1.first_column);
    }
;



Accesos
    :Acceso 'LENGTH' '('')' ';'
    {
        $$ =  new Length($1, @1.first_line, @1.first_column);
    }
    
;

AsigIndividual
    :AsigIndividual '.' ID 
    {
        $$ = new AsignacionId($3, $1, @1.first_line, @1.first_column);
    }
    |ID 
    {
        $$ = new AsignacionId($1, null, @1.first_line, @1.first_column);
    }
;

StatementFuncion
    : '{' InstruccionesFuncion '}' 
    {
        $$ = new Statement($2, @1.first_line, @1.first_column);
    }
    | '{' '}' 
    {
        $$ = new Statement(null, @1.first_line, @1.first_column);
    }
;

InstruccionesFuncion
    :InstruccionesFuncion InstruccionFuncion
    {
        $1.push($2);
        $$ = $1;
    }
    |InstruccionFuncion
    {
        $$ = [$1];
    }
;

InstruccionFuncion
    : Imprimir
    {
        $$ = $1;
    }
    |DeclaracionVariable
    {
        $$ = $1;

    }
    |AsignacionVariable ';'
    {
        $$ = $1;
    }
    |IfSt
    {
        $$ = $1;
    }
    |WhileSt
    {
        $$ = $1;
    }
    |DoWhileSt
    {
        $$= $1;
    }
    |SwitchSt
    {
        $$ = $1;
    }
    |IncreDecre ';'
    {
        $$ = $1;
    }
    |DefinicionTypes ';'
    {
    }
    |'BREAK' ';'
    {
        $$ = new Break(@1.first_line, @1.first_column);
    }
    |'CONTINUE' ';'
    {
        $$ = new Continue(@1.first_line, @1.first_column);
    }
    |DeclaracionArreglos ';'
    {
    }
    |ForNormal 
    {
        $$ =$1;
    }
    |ForOf 
    {
    }
    |ForIn
    {
        /*
    }
    |ID  '=' '{' ListaValoresTipo '}' ';'
    {
        */
    }
    |ID '(' ListaExpr ')' ';'
    {
        $$ =  new AsignacionFuncion($1, $3, null, @1. first_line, @1.first_column);
    }
    |ID '('')' ';'
    {
        $$ =  new AsignacionFuncion($1, [], null, @1. first_line, @1.first_column);
    }
    |'RETURN' Expr ';'
    {   
        $$ = new Return($2, @1.first_line, @1.first_column);
    }
    |'RETURN' ';'
    {
        $$ = new Return(null, @1.first_line, @1.first_column);
    }
    |error ';'
    {
        error=new Error_(@1.first_line, @1.first_column, 'Sintactico','El caracter: " ' + yytext + ' ",  no se esperaba(Una instruccion no pertenece a la funcion)');
        errores.push(error);
    }
    |error '}'
    {
        error=new Error_(@1.first_line,@1.first_column, 'Sintactico','El caracter: " ' + yytext + ' ",  no se esperaba (Una instruccion no pertenece a la funcion)');
        errores.push(error);
    }
    
;

ForOf
    :'FOR' '(' 'LET' ID 'OF' Expr')' Statement
    {
    }
    |'FOR' '(' 'CONST' ID 'OF' Expr')' Statement
    {
    }
;

ForIn
    :'FOR' '(' 'LET' ID 'IN' Expr')' Statement
    {
    }
    |'FOR' '(' 'CONST' ID 'IN' Expr')' Statement
    {
    }
;