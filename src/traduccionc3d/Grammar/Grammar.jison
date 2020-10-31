%{
    const { errores } =require('../../interprete/Errores/Errores');
    const { Error_ } =require('../../interprete/Errores/Error');
    const { Suma } = require('../Expresion/Aritmetico/Suma');
    const { Types, Type } = require('../Utils/Type');
    const { PrimitivoL } = require('../Expresion/Literal/Primitivo');
    const { StringL } = require('../Expresion/Literal/String');
    const { Imprimir } = require('../Instruccion/Funciones/Imprimir');
%}

%lex
%options case-sensitive
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
        
    }
    |AsignacionVariable ';'
    {
        
    }
    |IfSt
    {
        
    }
    |WhileSt
    {
        
    }
    |DoWhileSt
    {
        
    }
    |SwitchSt
    {
        
    }
    |IncreDecre ';'
    {
        
    }
    |DefinicionTypes ';'
    {
        
    }
    |GraficarTs ';'
    {
        
    }
    |'BREAK' ';'
    {
        
    }
    |'CONTINUE' ';'
    {
        
    }
    |DeclaracionArreglos ';'
    {
        
    }
    |ForNormal 
    {
        
    }
    |ForOf 
    {
        
    }
    |ForIn 
    {
                
    }
    |Funcion 
    {
        
    }
    |ID '(' ListaExpr ')' ';'
    {
        
    }
    |ID '('')' ';'
    {
        
    }
    |ID  '=' '{' ListaValoresTipo '}' ';'
    {
        
    }
    |'RETURN' Expr ';'
    {
        
    }
    |'RETURN' ';'
    {
        
    }
    |AsigIndividual '=' Expr ';'
    {
        
    }
    |AsigIndividual '=' '['']' ';'
    {
        
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
    :'FUNCTION' ID '(' ListaParametros ')' ':' TiposFuncion StatementFuncion
    {
        
    }
    |'FUNCTION' ID '(' ListaParametros ')' StatementFuncion
    {
        
    }
    |'FUNCTION' ID '(' ')' ':' TiposFuncion StatementFuncion
    {
        
    }
    |'FUNCTION' ID '(' ')' StatementFuncion
    {
        
    }
;

ListaParametros
    :ElementoParametro ListaParametrosPrima
    {
        
    }
;

ListaParametrosPrima
    : ',' ElementoParametro ListaParametrosPrima
    {
        
    }
    |{}
;

ElementoParametro
    :ElementoDeclaracion
    {
        
    }
    |ID ':' Tipos ListaCorh
    {
        
    }
;

ListaCorh
    :ListaCorh '['']'
    |'['']'
;

TiposFuncion
    :TipoNormal
    {
        
    }
    |'TIPOVOID'
    {
        
    }
    |ID
    {
        
    }
    |TipoNormal ListaCorh
    {
        
    }
;

Imprimir
    :CONSOLELOG '(' ListaExpr ')' ';'
    {
        $$ = new Imprimir($3, true, @1.first_line, @1.first_column);
    }
;

GraficarTs
    :'GRAFICAR_TS' '(' ')'
    {
        
    }
;

DeclaracionVariable
    : 'LET' ListaDeclaraciones ';' 
    {
        $$= new Declaracion('let', $2, @1.first_line, @1.first_column);
    }
    | 'CONST' ListaDeclaraciones ';'
    {
        $$ = new Declaracion('const',$2, @1.first_line, @1.first_column);
    }   
; 

AsignacionVariable
    : ID '=' Expr 
    {
        
    }
;

IfSt
    : 'IF' '(' Expr ')' Statement ElseSt
    {
        
    }
;

ElseSt
    : 'ELSE' Statement
    {
        
    } 
    | 'ELSE' IfSt
    {
        
    }
    | 
    {
            
    }
;

WhileSt
    : 'WHILE' '(' Expr ')' Statement
    {
        
    }
;

DoWhileSt
    : 'DO' Statement 'WHILE' '(' Expr ')' ';'
    {
        
    }
;

ForNormal
    :'FOR' '(' DeclaracionVariable Expr ';' OpcAsignacion ')' Statement
    {
        
    }
;

OpcAsignacion
    :AsignacionVariable
    {
        
    }
    |IncreDecre
    {
        
    }
;

SwitchSt
    : 'SWITCH' '(' Expr ')' '{' ListaCasos '}' 
    {
        
    }
;

ListaCasos
    : ListaCasos Caso 
    {
        
    }
    |Caso 
    {
        
    }
;

Caso
    : 'CASE' Expr ':' Statement
    {
        
    }
    | 'DEFAULT' ':' Statement
    {
        
    }
    | 'CASE' Expr ':' Instrucciones
    {
        
    }
    | 'DEFAULT' ':' Instrucciones
    {
        
    }
;

IncreDecre
    : ID '++'
    {   
        
    }
    |ID '--'
    {
        
    }
;

Statement
    : '{' Instrucciones '}' 
    {
        
    }
    | '{' '}' 
    {
        
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
    :ID ':' TipoNormal '=' Expr
    {
        
    }
    |ID ':' TipoNormal
    {
        
    }
    |ID ':' ID
    {
        
    }
    |ID ':' ID '=' '{' ListaValoresTipo '}'
    {

    }
    |ID ':' ID '=' Expr
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

TipoNormal
    :'TIPOSTRING'
    {
    }
    |'TIPOBOOLEAN'
    {
    }
    |'TIPONUMBER'
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
    :ID ':' ID
    {

    }
    |ID ':' TipoNormal
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
    |'LET' ID ':' Tipos '[' ']'
    {

    }
    |'CONST' ID ':' Tipos '[' ']'
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

    }
    |Expr
    {
        $$ = $1;
    }
;

Tipos
    :TipoNormal
    {

    }
    |ID
    {
    }
;

Expr
    : Expr '+' Expr
    {
        $$ = new Suma($1,$3,@1.first_line,@1.first_column);
    }       
    | Expr '-' Expr
    {
    }
    | Expr '*' Expr
    { 
    }       
    | Expr '/' Expr
    {
    }
    | Expr '**' Expr
    {
    }
    | Expr '%' Expr
    {
    }
    | '-' Expr
    {
    }
    | Expr '++'
    {
    }
    | Expr '--' 
    {
    }
    | Expr '||' Expr
    {
    }
    | Expr '&&' Expr
    { 
    }
    | '!' Expr
    { 
    }   
    | Expr '>=' Expr
    {
    }
    | Expr '<=' Expr
    { 
    }    
    | Expr '>' Expr
    {
    }
    | Expr '<' Expr
    {
    }
    | Expr '==' Expr
    {
    }
    | Expr '!=' Expr
    { 
    }
    | F
    {
        $$=$1;
    }
;


F   : '(' Expr ')'
    { 
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
        $$=new PrimitivoL(Types.BOOLEAN, $1, @1.first_line, @1.first_column);
    }
    | FALSE
    {
        $$=new PrimitivoL(Types.BOOLEAN, $1, @1.first_line, @1.first_column);
    }
    |NuevoAcceso
    {
       
    }
    |NULL 
    {
    }
    |ID '(' ListaExpr ')' 
    {
    }
    |ID '(' ')' 
    {
    }
    | Expr '?' Expr ':' Expr
    {
    }
    
;

NuevoAcceso
    :Accesos
    {
    }
    |Acceso
    {
    }
    |ID FuncionArreglo
    {
    }
;
Acceso
    :ID
    {
    }
;

Accesos
    :Accesos '.' ID
    {
    }
    |Accesos '[' Expr ']'
    {
    }
    |Accesos '[' Expr ']' FuncionArreglo
    {
    }
    |ID '.' ID 
    {
    }
    |ID '[' Expr ']' FuncionArreglo
    {
    }
    |ID '[' Expr ']'
    {
    }
    
;

FuncionArreglo
    :'POP' '(' ')' 
    {
    }
    |'PUSH' '(' Expr ')'
    {
    }
    |'LENGTH'
    {
    }
;


AsigIndividual
    :AsigIndividual '[' Expr ']' 
    {
    }
    |ID '[' Expr ']'
    {
    }
    |AsigIndividual '.' ID 
    {
    }
    |ID '.' ID
    {
    }
;

StatementFuncion
    : '{' InstruccionesFuncion '}' 
    {
    }
    | '{' '}' 
    {
    }
;

InstruccionesFuncion
    :InstruccionFuncion InstruccionesFuncionPrima
    {
        
    }
;
InstruccionesFuncionPrima
    :InstruccionFuncion InstruccionesFuncionPrima
    { 
    }
    |
    {
    }
;

InstruccionFuncion
    : Imprimir
    {
    }
    |DeclaracionVariable
    {

    }
    |AsignacionVariable ';'
    {
        
    }
    |IfSt
    {
    }
    |WhileSt
    {
    }
    |DoWhileSt
    {
    }
    |SwitchSt
    {
    }
    |IncreDecre ';'
    {
    }
    |DefinicionTypes ';'
    {
    }
    |GraficarTs ';'
    {
    }
    |'BREAK' ';'
    {
    }
    |'CONTINUE' ';'
    {
    }
    |DeclaracionArreglos ';'
    {
    }
    |ForNormal 
    {
    }
    |ForOf 
    {
    }
    |ForIn
    {
    }
    |ID  '=' '{' ListaValoresTipo '}' ';'
    {
    }
    |ID '(' ListaExpr ')' ';'
    {
    }
    |ID '('')' ';'
    {
    }
    |AsigIndividual '=' Expr ';'
    {
    }
    |'RETURN' Expr ';'
    {
    }
    |'RETURN' ';'
    {
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