#include<math.h>
#include<stdio.h>
int A0=0, A1=0, A2=0;
double T0=0, T1=0, T2=0, T3=0, T4=0, T5=0, T6=0, T7=0, T8=0, T9=0, T10=0, T11=0, T12=0, T13=0, T14=0, T15=0, T16=0, T17=0, T18=0, T19=0, T20=0, T21=0, T22=0, T23=0, T24=0, T25=0, T26=0, T27=0, T28=0, T29=0, T30=0, T31=0, T32=0, T33=0, T34=0, T35=0, T36=0, T37=0, T38=0, T39=0, T40=0, T41=0, T42=0, T43=0, T44=0, T45=0, T46=0, T47=0, T48=0, T49=0, T50=0, T51=0, T52=0, T53=0, T54=0, T55=0, T56=0, T57=0, T58=0, T59=0, T60=0, T61=0, T62=0, T63=0, T64=0, T65=0, T66=0, T67=0, T68=0, T69=0, T70=0, T71=0, T72=0, T73=0, T74=0, T75=0, T76=0, T77=0, T78=0, T79=0, T80=0, T81=0, T82=0, T83=0, T84=0, T85=0, T86=0, T87=0, T88=0, T89=0, T90=0, T91=0, T92=0, T93=0, T94=0, T95=0, T96=0, T97=0, T98=0, T99=0, T100=0, T101=0, T102=0, T103=0, T104=0, T105=0, T106=0, T107=0, T108=0, T109=0, T110=0, T111=0, T112=0, T113=0, T114=0, T115=0, T116=0, T117=0, T118=0, T119=0, T120=0, T121=0, T122=0, T123=0, T124=0, T125=0, T126=0, T127=0, T128=0, T129=0, T130=0, T131=0, T132=0, T133=0, T134=0, T135=0, T136=0, T137=0, T138=0, T139=0, T140=0, T141=0, T142=0, T143=0, T144=0, T145=0, T146=0, T147=0, T148=0, T149=0, T150=0, T151=0, T152=0, T153=0, T154=0, T155=0, T156=0, T157=0, T158=0, T159=0, T160=0, T161=0, T162=0, T163=0, T164=0, T165=0, T166=0, T167=0, T168=0, T169=0, T170=0, T171=0, T172=0, T173=0, T174=0, T175=0, T176=0, T177=0, T178=0, T179=0, T180=0, T181=0, T182=0, T183=0, T184=0, T185=0, T186=0, T187=0, T188=0, T189=0, T190=0, T191=0, T192=0, T193=0, T194=0, T195=0, T196=0, T197=0, T198=0, T199=0, T200=0, T201=0, T202=0, T203=0, T204=0, T205=0, T206=0, T207=0, T208=0, T209=0, T210=0, T211=0, T212=0, T213=0, T214=0, T215=0, T216=0, T217=0, T218=0, T219=0, T220=0, T221=0, T222=0, T223=0, T224=0, T225=0, T226=0, T227=0, T228=0, T229=0, T230=0;
int h = 0;
int p = 0;
double Heap[200000];
double Stack[200000];
/***** -----EMPIEZA IMPRIMIR STRING----- *****/

void nativa_imprimir_string() {
T0 = Stack[(int)p];
L0:
T1 = Heap[(int)T0];
if (T1 == -1) goto L1;
goto L2;
L2:
A0 = T1  ;
printf("%c",A0);
T0 = T0 + 1;
goto L0;
L1:
return;
}

/***** -----TERMINA IMPRIMIR STRING----- *****/
/***** -----INICIA CONCATENACION STRING STRING----- *****/

void nativa_conca_string_string() {
T2 = p + 1;
T2 = Stack[(int)T2];
Stack[(int)p] = h;
L3:
T3 = Heap[(int)T2];
if (T3 != -1) goto L5;
goto L4;
L5:
Heap[(int)h] = T3;
h = h + 1;
T2 = T2 + 1;
goto L3;
L4:
T2 = p + 2;
T2 = Stack[(int)T2];
L6:
T4 = Heap[(int)T2];
if (T4 != -1) goto L8;
goto L7;
L8:
Heap[(int)h] = T4;
h = h + 1;
T2 = T2 + 1;
goto L6;
L7:
Heap[(int)h] = -1;
h = h + 1;
}

/***** -----FIN CONCATENACION STRING STRING----- *****/
/***** -----INICIA CONCATENACION NUMBER STRING----- *****/

void nativa_conca_number_string() {
T5 = p + 1;
T5 = Stack[(int)T5];
T6 = T5  ;
if (T5 > 0) goto L9;
T5 = T5 * -1;
L9:
T7 = 0  ;
L10:
T8=fmod(T5,1);
if (T8 != 0) goto L11;
goto L12;
L11:
T5 = T5 * 10;
T7 = T7 + 1;
goto L10;
L12:
T8=fmod(T5,10);
A1 = T5 / 10;
T5 = A1  ;
T8 = T8 + 48;
Heap[(int)h] = T8;
h = h + 1;
T7 = T7 - 1;
if (T7 > 0) goto L12;
if (T7 == 0) goto L13;
goto L14;
L13:
Heap[(int)h] = 46;
h = h + 1;
L14:
T8=fmod(A1,10);
T8 = T8 + 48;
Heap[(int)h] = T8;
h = h + 1;
A1 = A1 / 10;
if (A1 == 0) goto L15;
goto L14;
L15:
if (T6 > 0) goto L16;
Heap[(int)h] = 45;
h = h + 1;
L16:
Heap[(int)h] = -1;
h = h + 1;
T9 = h  ;
T5 = h - 2;
L17:
T7 = Heap[(int)T5];
if (T7 == -1) goto L18;
T5 = T5 - 1;
Heap[(int)h] = T7;
h = h + 1;
goto L17;
L18:
T5 = p + 2;
T5 = Stack[(int)T5];
L19:
T10 = Heap[(int)T5];
if (T10 != -1) goto L21;
goto L20;
L21:
Heap[(int)h] = T10;
h = h + 1;
T5 = T5 + 1;
goto L19;
L20:
Heap[(int)h] = -1;
h = h + 1;
Stack[(int)p] = T9;
}

/***** -----FIN CONCATENAR NUMBER A STRING----- *****/
/***** -----INICIA CONCATENACION STRING NUMBER----- *****/

void nativa_conca_string_number() {
T11 = p + 2;
T11 = Stack[(int)T11];
T12 = T11  ;
if (T11 > 0) goto L22;
T11 = T11 * -1;
L22:
T13 = 0  ;
L23:
T14=fmod(T11,1);
if (T14 != 0) goto L24;
goto L25;
L24:
T11 = T11 * 10;
T13 = T13 + 1;
goto L23;
L25:
T14=fmod(T11,10);
A2 = T11 / 10;
T11 = A2  ;
T14 = T14 + 48;
Heap[(int)h] = T14;
h = h + 1;
T13 = T13 - 1;
if (T13 > 0) goto L25;
if (T13 == 0) goto L26;
goto L27;
L26:
Heap[(int)h] = 46;
h = h + 1;
L27:
T14=fmod(A2,10);
T14 = T14 + 48;
Heap[(int)h] = T14;
h = h + 1;
A2 = A2 / 10;
if (A2 == 0) goto L28;
goto L27;
L28:
if (T12 > 0) goto L29;
Heap[(int)h] = 45;
h = h + 1;
L29:
Heap[(int)h] = -1;
h = h + 1;
T15 = h  ;
T16 = h  ;
T17 = p + 1;
T17 = Stack[(int)T17];
Stack[(int)p] = h;
L32:
T18 = Heap[(int)T17];
if (T18 != -1) goto L34;
goto L33;
L34:
Heap[(int)h] = T18;
h = h + 1;
T17 = T17 + 1;
goto L32;
L33:
T11 = T15 - 2;
L30:
T13 = Heap[(int)T11];
if (T13 == -1) goto L31;
T11 = T11 - 1;
Heap[(int)h] = T13;
h = h + 1;
goto L30;
L31:
Heap[(int)h] = -1;
h = h + 1;
Stack[(int)p] = T16;
}

/***** -----FIN CONVERTIR NUMBER A STRING----- *****/
/***** -----INICIA CONCATENACION STRING- BOOLEAN----- *****/

void nativa_conca_string_boolean() {
T19 = p + 1;
T19 = Stack[(int)T19];
Stack[(int)p] = h;
L35:
T21 = Heap[(int)T19];
if (T21 != -1) goto L37;
goto L36;
L37:
Heap[(int)h] = T21;
h = h + 1;
T19 = T19 + 1;
goto L35;
L36:
T19 = p + 2;
T19 = Stack[(int)T19];
if (T19 == 1) goto L38;
Heap[(int)h] = 102;
h = h + 1;
Heap[(int)h] = 97;
h = h + 1;
Heap[(int)h] = 108;
h = h + 1;
Heap[(int)h] = 115;
h = h + 1;
Heap[(int)h] = 101;
h = h + 1;
goto L39;
L38:
Heap[(int)h] = 116;
h = h + 1;
Heap[(int)h] = 114;
h = h + 1;
Heap[(int)h] = 117;
h = h + 1;
Heap[(int)h] = 101;
h = h + 1;
L39:
Heap[(int)h] = -1;
h = h + 1;
}

/***** -----FIN CONVERTIR STRING - BOOLEAN ----- *****/
/***** -----INICIA CONCATENACION BOOLEAN-STRING ----- *****/

void nativa_conca_boolean_string() {
Stack[(int)p] = h;
T22 = p + 1;
T22 = Stack[(int)T22];
if (T22 == 1) goto L40;
Heap[(int)h] = 102;
h = h + 1;
Heap[(int)h] = 97;
h = h + 1;
Heap[(int)h] = 108;
h = h + 1;
Heap[(int)h] = 115;
h = h + 1;
Heap[(int)h] = 101;
h = h + 1;
goto L41;
L40:
Heap[(int)h] = 116;
h = h + 1;
Heap[(int)h] = 114;
h = h + 1;
Heap[(int)h] = 117;
h = h + 1;
Heap[(int)h] = 101;
h = h + 1;
L41:
T22 = p + 2;
T22 = Stack[(int)T22];
L42:
T24 = Heap[(int)T22];
if (T24 != -1) goto L44;
goto L43;
L44:
Heap[(int)h] = T24;
h = h + 1;
T22 = T22 + 1;
goto L42;
L43:
Heap[(int)h] = -1;
h = h + 1;
return;
}

/***** -----FIN CONVERTIR BOOLEAN-STRING ----- *****/
/***** -----INICIA POTENCIA----- *****/

void nativa_potencia() {
T27 = p + 2;
T28 = Stack[(int)T27];
T25 = 1  ;
if (T28 == 0) goto L47;
T27 = p + 1;
T25 = Stack[(int)T27];
T26 = T25  ;
T28 = T28 - 1;
L45:
if (T28 > 0) goto L46;
goto L47;
L46:
T25 = T25 * T26;
T28 = T28 - 1;
goto L45;
L47:
Stack[(int)p] = T25;
return;
}

/***** -----TERMINA POTENCIA ----- *****/
/***** -----INICIA COMPARAR STRING----- *****/

void nativa_comparar_string() {
T29 = 0  ;
T30 = p + 1;
T30 = Stack[(int)T30];
T31 = p + 2;
T31 = Stack[(int)T31];
L48:
T32 = Heap[(int)T30];
T33 = Heap[(int)T31];
if (T32 != T33) goto L50;
if (T32 == -1) goto L49;
T30 = T30 + 1;
T31 = T31 + 1;
goto L48;
L49:
T29 = 1  ;
L50:
Stack[(int)p] = T29;
return;
}

/***** -----TERMINA STRING ----- *****/
/***** -----INICIA LENGTH----- *****/

void nativa_length() {
T35 = 0  ;
T34 = p + 1;
T34 = Stack[(int)T34];
L51:
T37 = Heap[(int)T34];
if (T37 != -1) goto L53;
goto L52;
L53:
T35 = T35 + 1;
T34 = T34 + 1;
goto L51;
L52:
Stack[(int)p] = T35;
return;
}

/***** -----FIN LENGTH----- *****/
/***** -----INICIA TO LOWERCASE----- *****/

void nativa_to_lowerCase() {
T38 = p + 1;
T38 = Stack[(int)T38];
Stack[(int)p] = h;
L54:
T40 = Heap[(int)T38];
if (T40 != -1) goto L56;
goto L55;
L56:
if (T40 > 90) goto L57;
if (T40 < 65) goto L57;
T40 = T40 + 32;
L57:
Heap[(int)h] = T40;
h = h + 1;
T38 = T38 + 1;
goto L54;
L55:
Heap[(int)h] = -1;
h = h + 1;
return;
}

/***** -----FIN TO LOWERCASE----- *****/
/***** -----INICIA TO UPPERCASE----- *****/

void nativa_to_upperCase() {
T41 = p + 1;
T41 = Stack[(int)T41];
Stack[(int)p] = h;
L58:
T43 = Heap[(int)T41];
if (T43 != -1) goto L60;
goto L59;
L60:
if (T43 > 122) goto L61;
if (T43 < 97) goto L61;
T43 = T43 - 32;
L61:
Heap[(int)h] = T43;
h = h + 1;
T41 = T41 + 1;
goto L58;
L59:
Heap[(int)h] = -1;
h = h + 1;
return;
}

/***** -----FIN TO UPPERCASE----- *****/
/***** -----INICIA CHAR AT----- *****/

void nativa_charAt() {
T45 = 0  ;
T44 = p + 1;
T44 = Stack[(int)T44];
T46 = p + 2;
T46 = Stack[(int)T46];
L62:
T48 = Heap[(int)T44];
if (T48 != -1) goto L64;
goto L63;
L64:
if (T45 == T46) goto L63;
T45 = T45 + 1;
T44 = T44 + 1;
goto L62;
L63:
Stack[(int)p] = h;
Heap[(int)h] = T48;
h = h + 1;
Heap[(int)h] = -1;
h = h + 1;
return;
}

/***** -----FIN CHAR AT----- *****/

void main() {
p = p + 0;
main_arreglos_empty();
T49 = Stack[(int)p];
p = p - 0;
/***** Inicia salvacion de temporales en el stack *****/
T50 = p + 0;
Stack[(int)T50] = T49;
/***** Finalizando salvacion de temporales en el stack *****/
T51 = p + 2;
Stack[(int)T51] = 2;
p = p + 1;
main_switchpro_number();
T51 = Stack[(int)p];
p = p - 1;
/***** Inician recuperacion de temporales del stack *****/
T52 = p + 0;
T49 = Stack[(int)T52];
/***** Finaliza la recuperacion de temporales del stack *****/
return;
}


void main_arreglos_empty() {
	T53 = h  ;
	Heap[(int)h] = 83;
	h = h + 1;
	Heap[(int)h] = 69;
	h = h + 1;
	Heap[(int)h] = 78;
	h = h + 1;
	Heap[(int)h] = 84;
	h = h + 1;
	Heap[(int)h] = 69;
	h = h + 1;
	Heap[(int)h] = 78;
	h = h + 1;
	Heap[(int)h] = 67;
	h = h + 1;
	Heap[(int)h] = 73;
	h = h + 1;
	Heap[(int)h] = 65;
	h = h + 1;
	Heap[(int)h] = 83;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = 69;
	h = h + 1;
	Heap[(int)h] = 83;
	h = h + 1;
	Heap[(int)h] = 67;
	h = h + 1;
	Heap[(int)h] = 65;
	h = h + 1;
	Heap[(int)h] = 80;
	h = h + 1;
	Heap[(int)h] = 69;
	h = h + 1;
	Heap[(int)h] = 10;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 34;
	h = h + 1;
	Heap[(int)h] = 84;
	h = h + 1;
	Heap[(int)h] = 65;
	h = h + 1;
	Heap[(int)h] = 66;
	h = h + 1;
	Heap[(int)h] = 34;
	h = h + 1;
	Heap[(int)h] = 13;
	h = h + 1;
	Heap[(int)h] = 83;
	h = h + 1;
	Heap[(int)h] = 65;
	h = h + 1;
	Heap[(int)h] = 76;
	h = h + 1;
	Heap[(int)h] = 84;
	h = h + 1;
	Heap[(int)h] = 79;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = 68;
	h = h + 1;
	Heap[(int)h] = 69;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = 76;
	h = h + 1;
	Heap[(int)h] = 73;
	h = h + 1;
	Heap[(int)h] = 78;
	h = h + 1;
	Heap[(int)h] = 69;
	h = h + 1;
	Heap[(int)h] = 65;
	h = h + 1;
	Heap[(int)h] = -1;
	h = h + 1;
	p = p + 1;
	Stack[(int)p] = T53;
	nativa_imprimir_string();
	p = p - 1;
	printf("%c",10);
	T54 = h  ;
	Heap[(int)h] = 84;
	h = h + 1;
	Heap[(int)h] = 65;
	h = h + 1;
	Heap[(int)h] = 66;
	h = h + 1;
	Heap[(int)h] = 76;
	h = h + 1;
	Heap[(int)h] = 69;
	h = h + 1;
	Heap[(int)h] = 82;
	h = h + 1;
	Heap[(int)h] = 79;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = 66;
	h = h + 1;
	Heap[(int)h] = 73;
	h = h + 1;
	Heap[(int)h] = 78;
	h = h + 1;
	Heap[(int)h] = 65;
	h = h + 1;
	Heap[(int)h] = 82;
	h = h + 1;
	Heap[(int)h] = 73;
	h = h + 1;
	Heap[(int)h] = 79;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = 67;
	h = h + 1;
	Heap[(int)h] = 79;
	h = h + 1;
	Heap[(int)h] = 78;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = 84;
	h = h + 1;
	Heap[(int)h] = 65;
	h = h + 1;
	Heap[(int)h] = 66;
	h = h + 1;
	Heap[(int)h] = 85;
	h = h + 1;
	Heap[(int)h] = 76;
	h = h + 1;
	Heap[(int)h] = 65;
	h = h + 1;
	Heap[(int)h] = 67;
	h = h + 1;
	Heap[(int)h] = 73;
	h = h + 1;
	Heap[(int)h] = 79;
	h = h + 1;
	Heap[(int)h] = 78;
	h = h + 1;
	Heap[(int)h] = 69;
	h = h + 1;
	Heap[(int)h] = 83;
	h = h + 1;
	Heap[(int)h] = -1;
	h = h + 1;
	p = p + 1;
	Stack[(int)p] = T54;
	nativa_imprimir_string();
	p = p - 1;
	printf("%c",10);
	T55 = h  ;
	Heap[(int)h] = 48;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 49;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 48;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 49;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 48;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 49;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 48;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 49;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 48;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 49;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 48;
	h = h + 1;
	Heap[(int)h] = -1;
	h = h + 1;
	p = p + 1;
	Stack[(int)p] = T55;
	nativa_imprimir_string();
	p = p - 1;
	printf("%c",10);
	T56 = h  ;
	Heap[(int)h] = 49;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 48;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 49;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 48;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 49;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 48;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 49;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 48;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 49;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 48;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 49;
	h = h + 1;
	Heap[(int)h] = -1;
	h = h + 1;
	p = p + 1;
	Stack[(int)p] = T56;
	nativa_imprimir_string();
	p = p - 1;
	printf("%c",10);
	T57 = h  ;
	Heap[(int)h] = 48;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 49;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 48;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 49;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 48;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 49;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 48;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 49;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 48;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 49;
	h = h + 1;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 48;
	h = h + 1;
	Heap[(int)h] = -1;
	h = h + 1;
	p = p + 1;
	Stack[(int)p] = T57;
	nativa_imprimir_string();
	p = p - 1;
	printf("%c",10);
	T58 = h  ;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = 67;
	h = h + 1;
	Heap[(int)h] = 105;
	h = h + 1;
	Heap[(int)h] = 99;
	h = h + 1;
	Heap[(int)h] = 108;
	h = h + 1;
	Heap[(int)h] = 111;
	h = h + 1;
	Heap[(int)h] = 115;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = -1;
	h = h + 1;
	p = p + 1;
	Stack[(int)p] = T58;
	nativa_imprimir_string();
	p = p - 1;
	printf("%c",10);
	T59 = p + 1;
	Stack[(int)T59] = 0;
	T60 = h  ;
	Heap[(int)h] = 68;
	h = h + 1;
	Heap[(int)h] = 79;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = 87;
	h = h + 1;
	Heap[(int)h] = 72;
	h = h + 1;
	Heap[(int)h] = 73;
	h = h + 1;
	Heap[(int)h] = 76;
	h = h + 1;
	Heap[(int)h] = 69;
	h = h + 1;
	Heap[(int)h] = 10;
	h = h + 1;
	Heap[(int)h] = -1;
	h = h + 1;
	T61 = p + 2;
	Stack[(int)T61] = T60;
	/***** Inicia DoWhile *****/
	L66:
	T62 = p + 1;
	T64 = p + 1;
	T63 = Stack[(int)T64];
	T65 = T63 + 1;
	Stack[(int)T62] = T65;
	/***** Inicia If *****/
	T67 = p + 1;
	T66 = Stack[(int)T67];
	if (T66 > 0) goto L70;
	goto L69;
	L70:
	T69 = p + 1;
	T68 = Stack[(int)T69];
	if (T68 <= 5) goto L68;
	goto L69;
	L68:
	T70 = p + 2;
	T72 = p + 2;
	T71 = Stack[(int)T72];
	T73 = h  ;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = 67;
	h = h + 1;
	Heap[(int)h] = 73;
	h = h + 1;
	Heap[(int)h] = 78;
	h = h + 1;
	Heap[(int)h] = 67;
	h = h + 1;
	Heap[(int)h] = 79;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = 86;
	h = h + 1;
	Heap[(int)h] = 69;
	h = h + 1;
	Heap[(int)h] = 67;
	h = h + 1;
	Heap[(int)h] = 69;
	h = h + 1;
	Heap[(int)h] = 83;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = 69;
	h = h + 1;
	Heap[(int)h] = 83;
	h = h + 1;
	Heap[(int)h] = 84;
	h = h + 1;
	Heap[(int)h] = 79;
	h = h + 1;
	Heap[(int)h] = 10;
	h = h + 1;
	Heap[(int)h] = -1;
	h = h + 1;
	T75 = p + 4;
	Stack[(int)T75] = T71;
	T75 = T75 + 1;
	Stack[(int)T75] = T73;
	p = p + 3;
	nativa_conca_string_string();
	T74 = Stack[(int)p];
	p = p - 3;
	Stack[(int)T70] = T74;
	L69:
	/***** Fin If *****/
	/***** Inicia If *****/
	T77 = p + 1;
	T76 = Stack[(int)T77];
	if (T76 > 5) goto L73;
	goto L72;
	L73:
	T79 = p + 1;
	T78 = Stack[(int)T79];
	if (T78 <= 10) goto L71;
	goto L72;
	L71:
	/***** Inicia If *****/
	T81 = p + 1;
	T80 = Stack[(int)T81];
	if (T80 == 6) goto L74;
	goto L75;
	L74:
	T82 = p + 2;
	T84 = p + 2;
	T83 = Stack[(int)T84];
	T85 = h  ;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = -1;
	h = h + 1;
	T87 = p + 4;
	Stack[(int)T87] = T83;
	T87 = T87 + 1;
	Stack[(int)T87] = T85;
	p = p + 3;
	nativa_conca_string_string();
	T86 = Stack[(int)p];
	p = p - 3;
	Stack[(int)T82] = T86;
	L75:
	/***** Fin If *****/
	T88 = p + 2;
	T90 = p + 2;
	T89 = Stack[(int)T90];
	T92 = p + 1;
	T91 = Stack[(int)T92];
	T94 = p + 4;
	Stack[(int)T94] = T89;
	T94 = T94 + 1;
	Stack[(int)T94] = T91;
	p = p + 3;
	nativa_conca_string_number();
	T93 = Stack[(int)p];
	p = p - 3;
	T95 = h  ;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = -1;
	h = h + 1;
	T97 = p + 4;
	Stack[(int)T97] = T93;
	T97 = T97 + 1;
	Stack[(int)T97] = T95;
	p = p + 3;
	nativa_conca_string_string();
	T96 = Stack[(int)p];
	p = p - 3;
	Stack[(int)T88] = T96;
	/***** Inicia If *****/
	T99 = p + 1;
	T98 = Stack[(int)T99];
	if (T98 == 10) goto L76;
	goto L77;
	L76:
	T100 = p + 2;
	T102 = p + 2;
	T101 = Stack[(int)T102];
	T103 = h  ;
	Heap[(int)h] = 10;
	h = h + 1;
	Heap[(int)h] = -1;
	h = h + 1;
	T105 = p + 4;
	Stack[(int)T105] = T101;
	T105 = T105 + 1;
	Stack[(int)T105] = T103;
	p = p + 3;
	nativa_conca_string_string();
	T104 = Stack[(int)p];
	p = p - 3;
	Stack[(int)T100] = T104;
	L77:
	/***** Fin If *****/
	L72:
	/***** Fin If *****/
	/***** Inicia If *****/
	T107 = p + 1;
	T106 = Stack[(int)T107];
	if (T106 > 10) goto L80;
	goto L79;
	L80:
	T109 = p + 1;
	T108 = Stack[(int)T109];
	if (T108 <= 15) goto L78;
	goto L79;
	L78:
	/***** Inicia If *****/
	T111 = p + 1;
	T110 = Stack[(int)T111];
	if (T110 == 11) goto L81;
	goto L82;
	L81:
	T112 = p + 2;
	T114 = p + 2;
	T113 = Stack[(int)T114];
	T115 = h  ;
	Heap[(int)h] = 9;
	h = h + 1;
	Heap[(int)h] = -1;
	h = h + 1;
	T117 = p + 4;
	Stack[(int)T117] = T113;
	T117 = T117 + 1;
	Stack[(int)T117] = T115;
	p = p + 3;
	nativa_conca_string_string();
	T116 = Stack[(int)p];
	p = p - 3;
	Stack[(int)T112] = T116;
	L82:
	/***** Fin If *****/
	T118 = p + 2;
	T120 = p + 2;
	T119 = Stack[(int)T120];
	T122 = p + 1;
	T121 = Stack[(int)T122];
	T123 = T121 + 1;
	T125 = p + 4;
	Stack[(int)T125] = T119;
	T125 = T125 + 1;
	Stack[(int)T125] = T123;
	p = p + 3;
	nativa_conca_string_number();
	T124 = Stack[(int)p];
	p = p - 3;
	T126 = h  ;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = -1;
	h = h + 1;
	T128 = p + 4;
	Stack[(int)T128] = T124;
	T128 = T128 + 1;
	Stack[(int)T128] = T126;
	p = p + 3;
	nativa_conca_string_string();
	T127 = Stack[(int)p];
	p = p - 3;
	Stack[(int)T118] = T127;
	L79:
	/***** Fin If *****/
	T130 = p + 1;
	T129 = Stack[(int)T130];
	if (T129 < 15) goto L66;
	goto L67;
	L67:
	/***** Finaliza DoWhile *****/
	T132 = p + 2;
	T131 = Stack[(int)T132];
	p = p + 3;
	Stack[(int)p] = T131;
	nativa_imprimir_string();
	p = p - 3;
	printf("%c",10);
	T133 = h  ;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = 87;
	h = h + 1;
	Heap[(int)h] = 72;
	h = h + 1;
	Heap[(int)h] = 73;
	h = h + 1;
	Heap[(int)h] = 76;
	h = h + 1;
	Heap[(int)h] = 69;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = 65;
	h = h + 1;
	Heap[(int)h] = 78;
	h = h + 1;
	Heap[(int)h] = 73;
	h = h + 1;
	Heap[(int)h] = 68;
	h = h + 1;
	Heap[(int)h] = 65;
	h = h + 1;
	Heap[(int)h] = 68;
	h = h + 1;
	Heap[(int)h] = 79;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = -1;
	h = h + 1;
	p = p + 3;
	Stack[(int)p] = T133;
	nativa_imprimir_string();
	p = p - 3;
	printf("%c",10);
	T134 = p + 1;
	Stack[(int)T134] = 0;
	T135 = p + 3;
	Stack[(int)T135] = 0;
	/***** Inicia While *****/
	L83:
	T137 = p + 1;
	T136 = Stack[(int)T137];
	if (T136 < 5) goto L84;
	goto L85;
	L84:
	T138 = p + 3;
	Stack[(int)T138] = 0;
	T139 = h  ;
	Heap[(int)h] = 84;
	h = h + 1;
	Heap[(int)h] = 65;
	h = h + 1;
	Heap[(int)h] = 66;
	h = h + 1;
	Heap[(int)h] = 76;
	h = h + 1;
	Heap[(int)h] = 65;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = 68;
	h = h + 1;
	Heap[(int)h] = 69;
	h = h + 1;
	Heap[(int)h] = 76;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = -1;
	h = h + 1;
	T141 = p + 1;
	T140 = Stack[(int)T141];
	T143 = p + 5;
	Stack[(int)T143] = T139;
	T143 = T143 + 1;
	Stack[(int)T143] = T140;
	p = p + 4;
	nativa_conca_string_number();
	T142 = Stack[(int)p];
	p = p - 4;
	p = p + 4;
	Stack[(int)p] = T142;
	nativa_imprimir_string();
	p = p - 4;
	printf("%c",10);
	/***** Inicia While *****/
	L86:
	T145 = p + 3;
	T144 = Stack[(int)T145];
	if (T144 < 5) goto L87;
	goto L88;
	L87:
	T147 = p + 1;
	T146 = Stack[(int)T147];
	T148 = h  ;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = 120;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = -1;
	h = h + 1;
	/***** **inicia concatenacion *****/
	T150 = p + 5;
	Stack[(int)T150] = T146;
	T150 = T150 + 1;
	Stack[(int)T150] = T148;
	p = p + 4;
	nativa_conca_number_string();
	T149 = Stack[(int)p];
	p = p - 4;
	/***** termina contatenacion *****/
	T152 = p + 3;
	T151 = Stack[(int)T152];
	T154 = p + 5;
	Stack[(int)T154] = T149;
	T154 = T154 + 1;
	Stack[(int)T154] = T151;
	p = p + 4;
	nativa_conca_string_number();
	T153 = Stack[(int)p];
	p = p - 4;
	T155 = h  ;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = 61;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = -1;
	h = h + 1;
	T157 = p + 5;
	Stack[(int)T157] = T153;
	T157 = T157 + 1;
	Stack[(int)T157] = T155;
	p = p + 4;
	nativa_conca_string_string();
	T156 = Stack[(int)p];
	p = p - 4;
	T159 = p + 1;
	T158 = Stack[(int)T159];
	T161 = p + 3;
	T160 = Stack[(int)T161];
	T162 = T158 * T160;
	T164 = p + 5;
	Stack[(int)T164] = T156;
	T164 = T164 + 1;
	Stack[(int)T164] = T162;
	p = p + 4;
	nativa_conca_string_number();
	T163 = Stack[(int)p];
	p = p - 4;
	T165 = h  ;
	Heap[(int)h] = 10;
	h = h + 1;
	Heap[(int)h] = -1;
	h = h + 1;
	T167 = p + 5;
	Stack[(int)T167] = T163;
	T167 = T167 + 1;
	Stack[(int)T167] = T165;
	p = p + 4;
	nativa_conca_string_string();
	T166 = Stack[(int)p];
	p = p - 4;
	p = p + 4;
	Stack[(int)p] = T166;
	nativa_imprimir_string();
	p = p - 4;
	printf("%c",10);
	T168 = p + 3;
	T170 = p + 3;
	T169 = Stack[(int)T170];
	T171 = T169 + 1;
	Stack[(int)T168] = T171;
	goto L86;
	L88:
	/***** Finaliza While *****/
	T172 = p + 1;
	T174 = p + 1;
	T173 = Stack[(int)T174];
	T175 = T173 + 1;
	Stack[(int)T172] = T175;
	goto L83;
	L85:
	/***** Finaliza While *****/
	T176 = h  ;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = 70;
	h = h + 1;
	Heap[(int)h] = 79;
	h = h + 1;
	Heap[(int)h] = 82;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = 65;
	h = h + 1;
	Heap[(int)h] = 78;
	h = h + 1;
	Heap[(int)h] = 73;
	h = h + 1;
	Heap[(int)h] = 68;
	h = h + 1;
	Heap[(int)h] = 65;
	h = h + 1;
	Heap[(int)h] = 68;
	h = h + 1;
	Heap[(int)h] = 79;
	h = h + 1;
	Heap[(int)h] = 83;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = -1;
	h = h + 1;
	p = p + 4;
	Stack[(int)p] = T176;
	nativa_imprimir_string();
	p = p - 4;
	printf("%c",10);
	T177 = p + 4;
	Stack[(int)T177] = 0;
	/***** Inicia For *****/
	L89:
	T179 = p + 4;
	T178 = Stack[(int)T179];
	if (T178 < 10) goto L90;
	goto L91;
	L90:
	T180 = h  ;
	Heap[(int)h] = -1;
	h = h + 1;
	T181 = p + 5;
	Stack[(int)T181] = T180;
	T182 = p + 6;
	Stack[(int)T182] = 0;
	/***** Inicia For *****/
	L92:
	T184 = p + 6;
	T183 = Stack[(int)T184];
	T186 = p + 4;
	T185 = Stack[(int)T186];
	T187 = 10 - T185;
	if (T183 < T187) goto L93;
	goto L94;
	L93:
	T188 = p + 5;
	T190 = p + 5;
	T189 = Stack[(int)T190];
	T191 = h  ;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = -1;
	h = h + 1;
	T193 = p + 8;
	Stack[(int)T193] = T189;
	T193 = T193 + 1;
	Stack[(int)T193] = T191;
	p = p + 7;
	nativa_conca_string_string();
	T192 = Stack[(int)p];
	p = p - 7;
	Stack[(int)T188] = T192;
	T194 = p + 6;
	T196 = p + 6;
	T195 = Stack[(int)T196];
	T197 = T195 + 1;
	Stack[(int)T194] = T197;
	goto L92;
	L94:
	/***** Finaliza For *****/
	T198 = p + 6;
	Stack[(int)T198] = 0;
	/***** Inicia For *****/
	L95:
	T200 = p + 6;
	T199 = Stack[(int)T200];
	T202 = p + 4;
	T201 = Stack[(int)T202];
	if (T199 <= T201) goto L96;
	goto L97;
	L96:
	T203 = p + 5;
	T205 = p + 5;
	T204 = Stack[(int)T205];
	T206 = h  ;
	Heap[(int)h] = 42;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = -1;
	h = h + 1;
	T208 = p + 8;
	Stack[(int)T208] = T204;
	T208 = T208 + 1;
	Stack[(int)T208] = T206;
	p = p + 7;
	nativa_conca_string_string();
	T207 = Stack[(int)p];
	p = p - 7;
	Stack[(int)T203] = T207;
	T209 = p + 6;
	T211 = p + 6;
	T210 = Stack[(int)T211];
	T212 = T210 + 1;
	Stack[(int)T209] = T212;
	goto L95;
	L97:
	/***** Finaliza For *****/
	T214 = p + 5;
	T213 = Stack[(int)T214];
	p = p + 6;
	Stack[(int)p] = T213;
	nativa_imprimir_string();
	p = p - 6;
	printf("%c",10);
	T215 = p + 4;
	T217 = p + 4;
	T216 = Stack[(int)T217];
	T218 = T216 + 1;
	Stack[(int)T215] = T218;
	goto L89;
	L91:
	/***** Finaliza For *****/
	L65:
return;
}


void main_switchpro_number() {
	T220 = p + 1;
	T219 = Stack[(int)T220];
	/***** Inicia Switch *****/
	goto L100;
	L101:
	T221 = h  ;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 110;
	h = h + 1;
	Heap[(int)h] = 58;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = 49;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = -1;
	h = h + 1;
	p = p + 2;
	Stack[(int)p] = T221;
	nativa_imprimir_string();
	p = p - 2;
	printf("%c",10);
	/***** Inicia salvacion de temporales en el stack *****/
	T222 = p + 2;
	Stack[(int)T222] = T219;
	/***** Finalizando salvacion de temporales en el stack *****/
	T223 = p + 4;
	Stack[(int)T223] = 5;
	p = p + 3;
	main_switchpro_number();
	T223 = Stack[(int)p];
	p = p - 3;
	/***** Inician recuperacion de temporales del stack *****/
	T224 = p + 2;
	T219 = Stack[(int)T224];
	/***** Finaliza la recuperacion de temporales del stack *****/
	goto L99;
	L102:
	T225 = h  ;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 110;
	h = h + 1;
	Heap[(int)h] = 58;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = 50;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = 45;
	h = h + 1;
	Heap[(int)h] = -1;
	h = h + 1;
	p = p + 2;
	Stack[(int)p] = T225;
	nativa_imprimir_string();
	p = p - 2;
	printf("%c",10);
	/***** Inicia salvacion de temporales en el stack *****/
	T226 = p + 2;
	Stack[(int)T226] = T219;
	T226 = T226 + 1;
	Stack[(int)T226] = T223;
	/***** Finalizando salvacion de temporales en el stack *****/
	T227 = p + 5;
	Stack[(int)T227] = 1;
	p = p + 4;
	main_switchpro_number();
	T227 = Stack[(int)p];
	p = p - 4;
	/***** Inician recuperacion de temporales del stack *****/
	T228 = p + 2;
	T219 = Stack[(int)T228];
	T228 = T228 + 1;
	T223 = Stack[(int)T228];
	/***** Finaliza la recuperacion de temporales del stack *****/
	goto L99;
	L103:
	T230 = p + 1;
	T229 = Stack[(int)T230];
	printf("%f",T229);
	printf("%c",10);
	goto L99;
	L100:
	if (1 == T219) goto L101;
	if (2 == T219) goto L102;
	goto L103;
	L99:
	/***** Finaliza switch *****/
	L98:
return;
}