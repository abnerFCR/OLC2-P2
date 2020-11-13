#include<math.h>
#include<stdio.h>
int A0=0, A1=0, A2=0, A3=0, A4=0, A5=0, A6=0, A7=0, A8=0;
double T0=0, T1=0, T2=0, T3=0, T4=0, T5=0, T6=0, T7=0, T8=0, T9=0, T10=0, T11=0, T12=0, T13=0, T14=0, T15=0, T16=0, T17=0, T18=0, T19=0, T20=0, T21=0, T22=0, T23=0, T24=0, T25=0, T26=0, T27=0, T28=0, T29=0, T30=0, T31=0, T32=0, T33=0, T34=0, T35=0, T36=0, T37=0, T38=0, T39=0, T40=0, T41=0, T42=0, T43=0, T44=0, T45=0, T46=0, T47=0, T48=0, T49=0, T50=0, T51=0, T52=0, T53=0, T54=0, T55=0, T56=0, T57=0, T58=0, T59=0, T60=0, T61=0, T62=0, T63=0, T64=0, T65=0, T66=0, T67=0, T68=0, T69=0, T70=0, T71=0, T72=0, T73=0, T74=0, T75=0, T76=0, T77=0, T78=0, T79=0, T80=0, T81=0, T82=0, T83=0, T84=0, T85=0, T86=0, T87=0, T88=0, T89=0, T90=0, T91=0, T92=0, T93=0, T94=0, T95=0, T96=0, T97=0, T98=0, T99=0, T100=0, T101=0, T102=0, T103=0, T104=0, T105=0, T106=0, T107=0, T108=0, T109=0, T110=0, T111=0, T112=0, T113=0, T114=0, T115=0, T116=0, T117=0, T118=0, T119=0, T120=0, T121=0, T122=0, T123=0, T124=0, T125=0, T126=0, T127=0, T128=0, T129=0, T130=0, T131=0, T132=0, T133=0, T134=0, T135=0, T136=0, T137=0, T138=0, T139=0, T140=0, T141=0, T142=0, T143=0, T144=0, T145=0, T146=0, T147=0, T148=0, T149=0, T150=0, T151=0, T152=0, T153=0, T154=0, T155=0, T156=0, T157=0, T158=0, T159=0, T160=0, T161=0, T162=0, T163=0, T164=0, T165=0, T166=0, T167=0, T168=0, T169=0, T170=0, T171=0, T172=0, T173=0, T174=0, T175=0, T176=0, T177=0, T178=0, T179=0, T180=0, T181=0, T182=0, T183=0, T184=0, T185=0, T186=0, T187=0, T188=0, T189=0, T190=0, T191=0, T192=0, T193=0, T194=0, T195=0, T196=0, T197=0, T198=0, T199=0, T200=0, T201=0, T202=0, T203=0, T204=0, T205=0, T206=0, T207=0, T208=0, T209=0, T210=0, T211=0, T212=0, T213=0, T214=0, T215=0, T216=0, T217=0, T218=0, T219=0, T220=0, T221=0, T222=0, T223=0, T224=0, T225=0, T226=0, T227=0, T228=0, T229=0, T230=0, T231=0, T232=0, T233=0, T234=0, T235=0, T236=0, T237=0, T238=0, T239=0, T240=0, T241=0, T242=0, T243=0, T244=0, T245=0, T246=0, T247=0, T248=0, T249=0, T250=0, T251=0, T252=0, T253=0, T254=0, T255=0, T256=0, T257=0, T258=0, T259=0, T260=0, T261=0, T262=0, T263=0, T264=0, T265=0, T266=0, T267=0, T268=0, T269=0, T270=0, T271=0, T272=0;
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
A6 = T1  ;
printf("%c",A6);
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
A7 = T5 / 10;
T5 = A7  ;
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
T8=fmod(A7,10);
T8 = T8 + 48;
Heap[(int)h] = T8;
h = h + 1;
A7 = A7 / 10;
if (A7 == 0) goto L15;
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
A8 = T11 / 10;
T11 = A8  ;
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
T14=fmod(A8,10);
T14 = T14 + 48;
Heap[(int)h] = T14;
h = h + 1;
A8 = A8 / 10;
if (A8 == 0) goto L28;
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
T25 = 0  ;
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
main_menu_empty();
T49 = Stack[(int)p];
p = p - 0;
return;
}


void main_fibonacci_number() {
	/***** Inicia If *****/
	T51 = p + 1;
	T50 = Stack[(int)T51];
	if (T50 <= 1) goto L66;
	goto L67;
	L66:
	T53 = p + 1;
	T52 = Stack[(int)T53];
	Stack[(int)p] = T52;
	goto L65;
	L67:
	/***** Fin If *****/
	T54 = p + 3;
	T56 = p + 1;
	T55 = Stack[(int)T56];
	T57 = T55 - 1;
	Stack[(int)T54] = T57;
	p = p + 2;
	main_fibonacci_number();
	T54 = Stack[(int)p];
	p = p - 2;
	/***** Inicia salvacion de temporales en el stack *****/
	T58 = p + 2;
	Stack[(int)T58] = T54;
	/***** Finalizando salvacion de temporales en el stack *****/
	T59 = p + 4;
	T61 = p + 1;
	T60 = Stack[(int)T61];
	T62 = T60 - 2;
	Stack[(int)T59] = T62;
	p = p + 3;
	main_fibonacci_number();
	T59 = Stack[(int)p];
	p = p - 3;
	/***** Inician recuperacion de temporales del stack *****/
	T63 = p + 2;
	T54 = Stack[(int)T63];
	/***** Finaliza la recuperacion de temporales del stack *****/
	T64 = T54 + T59;
	Stack[(int)p] = T64;
	goto L65;
	L65:
return;
}


void main_hanoi_number_number_number_number() {
	/***** Inicia If *****/
	T66 = p + 1;
	T65 = Stack[(int)T66];
	if (T65 == 1) goto L69;
	goto L70;
	L69:
	T67 = h  ;
	Heap[(int)h] = 77;
	h = h + 1;
	Heap[(int)h] = 111;
	h = h + 1;
	Heap[(int)h] = 118;
	h = h + 1;
	Heap[(int)h] = 101;
	h = h + 1;
	Heap[(int)h] = 114;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = 100;
	h = h + 1;
	Heap[(int)h] = 105;
	h = h + 1;
	Heap[(int)h] = 115;
	h = h + 1;
	Heap[(int)h] = 99;
	h = h + 1;
	Heap[(int)h] = 111;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = 100;
	h = h + 1;
	Heap[(int)h] = 101;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = -1;
	h = h + 1;
	T69 = p + 2;
	T68 = Stack[(int)T69];
	T71 = p + 6;
	Stack[(int)T71] = T67;
	T71 = T71 + 1;
	Stack[(int)T71] = T68;
	p = p + 5;
	nativa_conca_string_number();
	T70 = Stack[(int)p];
	p = p - 5;
	T72 = h  ;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = 97;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = -1;
	h = h + 1;
	T74 = p + 6;
	Stack[(int)T74] = T70;
	T74 = T74 + 1;
	Stack[(int)T74] = T72;
	p = p + 5;
	nativa_conca_string_string();
	T73 = Stack[(int)p];
	p = p - 5;
	T76 = p + 4;
	T75 = Stack[(int)T76];
	T78 = p + 6;
	Stack[(int)T78] = T73;
	T78 = T78 + 1;
	Stack[(int)T78] = T75;
	p = p + 5;
	nativa_conca_string_number();
	T77 = Stack[(int)p];
	p = p - 5;
	p = p + 5;
	Stack[(int)p] = T77;
	nativa_imprimir_string();
	p = p - 5;
	printf("%c",10);
	goto L71;
	L70:
	T79 = p + 6;
	T81 = p + 1;
	T80 = Stack[(int)T81];
	T82 = T80 - 1;
	Stack[(int)T79] = T82;
	T79 = T79 + 1;
	T84 = p + 2;
	T83 = Stack[(int)T84];
	Stack[(int)T79] = T83;
	T79 = T79 + 1;
	T86 = p + 4;
	T85 = Stack[(int)T86];
	Stack[(int)T79] = T85;
	T79 = T79 + 1;
	T88 = p + 3;
	T87 = Stack[(int)T88];
	Stack[(int)T79] = T87;
	p = p + 5;
	main_hanoi_number_number_number_number();
	T79 = Stack[(int)p];
	p = p - 5;
	T89 = h  ;
	Heap[(int)h] = 77;
	h = h + 1;
	Heap[(int)h] = 111;
	h = h + 1;
	Heap[(int)h] = 118;
	h = h + 1;
	Heap[(int)h] = 101;
	h = h + 1;
	Heap[(int)h] = 114;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = 100;
	h = h + 1;
	Heap[(int)h] = 105;
	h = h + 1;
	Heap[(int)h] = 115;
	h = h + 1;
	Heap[(int)h] = 99;
	h = h + 1;
	Heap[(int)h] = 111;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = 100;
	h = h + 1;
	Heap[(int)h] = 101;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = -1;
	h = h + 1;
	T91 = p + 2;
	T90 = Stack[(int)T91];
	T93 = p + 6;
	Stack[(int)T93] = T89;
	T93 = T93 + 1;
	Stack[(int)T93] = T90;
	p = p + 5;
	nativa_conca_string_number();
	T92 = Stack[(int)p];
	p = p - 5;
	T94 = h  ;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = 97;
	h = h + 1;
	Heap[(int)h] = 32;
	h = h + 1;
	Heap[(int)h] = -1;
	h = h + 1;
	T96 = p + 6;
	Stack[(int)T96] = T92;
	T96 = T96 + 1;
	Stack[(int)T96] = T94;
	p = p + 5;
	nativa_conca_string_string();
	T95 = Stack[(int)p];
	p = p - 5;
	T98 = p + 4;
	T97 = Stack[(int)T98];
	T100 = p + 6;
	Stack[(int)T100] = T95;
	T100 = T100 + 1;
	Stack[(int)T100] = T97;
	p = p + 5;
	nativa_conca_string_number();
	T99 = Stack[(int)p];
	p = p - 5;
	p = p + 5;
	Stack[(int)p] = T99;
	nativa_imprimir_string();
	p = p - 5;
	printf("%c",10);
	/***** Inicia salvacion de temporales en el stack *****/
	T101 = p + 5;
	Stack[(int)T101] = T79;
	/***** Finalizando salvacion de temporales en el stack *****/
	T102 = p + 7;
	T104 = p + 1;
	T103 = Stack[(int)T104];
	T105 = T103 - 1;
	Stack[(int)T102] = T105;
	T102 = T102 + 1;
	T107 = p + 3;
	T106 = Stack[(int)T107];
	Stack[(int)T102] = T106;
	T102 = T102 + 1;
	T109 = p + 2;
	T108 = Stack[(int)T109];
	Stack[(int)T102] = T108;
	T102 = T102 + 1;
	T111 = p + 4;
	T110 = Stack[(int)T111];
	Stack[(int)T102] = T110;
	p = p + 6;
	main_hanoi_number_number_number_number();
	T102 = Stack[(int)p];
	p = p - 6;
	/***** Inician recuperacion de temporales del stack *****/
	T112 = p + 5;
	T79 = Stack[(int)T112];
	/***** Finaliza la recuperacion de temporales del stack *****/
	L71:
	/***** Fin If *****/
	L68:
return;
}


void main_ackermann_number_number() {
	/***** Inicia If *****/
	T114 = p + 1;
	T113 = Stack[(int)T114];
	if (T113 == 0) goto L73;
	goto L74;
	L73:
	T116 = p + 2;
	T115 = Stack[(int)T116];
	T117 = T115 + 1;
	Stack[(int)p] = T117;
	goto L72;
	goto L75;
	L74:
	/***** Inicia If *****/
	T119 = p + 1;
	T118 = Stack[(int)T119];
	if (T118 > 0) goto L78;
	goto L77;
	L78:
	T121 = p + 2;
	T120 = Stack[(int)T121];
	if (T120 == 0) goto L76;
	goto L77;
	L76:
	T122 = p + 4;
	T124 = p + 1;
	T123 = Stack[(int)T124];
	T125 = T123 - 1;
	Stack[(int)T122] = T125;
	T122 = T122 + 1;
	Stack[(int)T122] = 1;
	p = p + 3;
	main_ackermann_number_number();
	T122 = Stack[(int)p];
	p = p - 3;
	T126 = p + 3;
	Stack[(int)T126] = T122;
	T128 = p + 3;
	T127 = Stack[(int)T128];
	Stack[(int)p] = T127;
	goto L72;
	goto L79;
	L77:
	T129 = p + 4;
	T131 = p + 1;
	T130 = Stack[(int)T131];
	Stack[(int)T129] = T130;
	T129 = T129 + 1;
	T133 = p + 2;
	T132 = Stack[(int)T133];
	T134 = T132 - 1;
	Stack[(int)T129] = T134;
	p = p + 3;
	main_ackermann_number_number();
	T129 = Stack[(int)p];
	p = p - 3;
	T135 = p + 3;
	Stack[(int)T135] = T129;
	T136 = p + 5;
	T138 = p + 1;
	T137 = Stack[(int)T138];
	T139 = T137 - 1;
	Stack[(int)T136] = T139;
	T136 = T136 + 1;
	T141 = p + 3;
	T140 = Stack[(int)T141];
	Stack[(int)T136] = T140;
	p = p + 4;
	main_ackermann_number_number();
	T136 = Stack[(int)p];
	p = p - 4;
	T142 = p + 4;
	Stack[(int)T142] = T136;
	T144 = p + 4;
	T143 = Stack[(int)T144];
	Stack[(int)p] = T143;
	goto L72;
	L79:
	/***** Fin If *****/
	L75:
	/***** Fin If *****/
	L72:
return;
}


void main_par_number() {
	/***** Inicia Ternario *****/
	T146 = p + 1;
	T145 = Stack[(int)T146];
	if (T145 == 0) goto L81;
	goto L82;
	L81:
	T147 = 1  ;
	goto L83;
	L82:
	/***** Inicia salvacion de temporales en el stack *****/
	T148 = p + 2;
	Stack[(int)T148] = T147;
	/***** Finalizando salvacion de temporales en el stack *****/
	T149 = p + 4;
	T151 = p + 1;
	T150 = Stack[(int)T151];
	T152 = T150 - 1;
	Stack[(int)T149] = T152;
	p = p + 3;
	main_impar_number();
	T149 = Stack[(int)p];
	p = p - 3;
	/***** Inician recuperacion de temporales del stack *****/
	T153 = p + 2;
	T147 = Stack[(int)T153];
	/***** Finaliza la recuperacion de temporales del stack *****/
	T147 = T149  ;
	L83:
	/***** Termina Ternario *****/
	Stack[(int)p] = T147;
	goto L80;
	L80:
return;
}


void main_impar_number() {
	/***** Inicia Ternario *****/
	T155 = p + 1;
	T154 = Stack[(int)T155];
	if (T154 == 0) goto L85;
	goto L86;
	L85:
	T156 = 0  ;
	goto L87;
	L86:
	/***** Inicia salvacion de temporales en el stack *****/
	T157 = p + 2;
	Stack[(int)T157] = T156;
	/***** Finalizando salvacion de temporales en el stack *****/
	T158 = p + 4;
	T160 = p + 1;
	T159 = Stack[(int)T160];
	T161 = T159 - 1;
	Stack[(int)T158] = T161;
	p = p + 3;
	main_par_number();
	T158 = Stack[(int)p];
	p = p - 3;
	/***** Inician recuperacion de temporales del stack *****/
	T162 = p + 2;
	T156 = Stack[(int)T162];
	/***** Finaliza la recuperacion de temporales del stack *****/
	T156 = T158  ;
	L87:
	/***** Termina Ternario *****/
	Stack[(int)p] = T156;
	goto L84;
	L84:
return;
}


void main_hofstaderMasculino_number() {
	/***** Inicia If *****/
	T164 = p + 1;
	T163 = Stack[(int)T164];
	if (T163 < 0) goto L89;
	goto L90;
	L89:
	Stack[(int)p] = 0;
	goto L88;
	goto L91;
	L90:
	/***** Inicia If *****/
	T166 = p + 1;
	T165 = Stack[(int)T166];
	if (T165 != 0) goto L92;
	goto L93;
	L92:
	T168 = p + 1;
	T167 = Stack[(int)T168];
	/***** Inicia salvacion de temporales en el stack *****/
	T169 = p + 2;
	Stack[(int)T169] = T167;
	/***** Finalizando salvacion de temporales en el stack *****/
	T170 = p + 4;
	T172 = p + 1;
	T171 = Stack[(int)T172];
	T173 = T171 - 1;
	Stack[(int)T170] = T173;
	p = p + 3;
	main_hofstaderMasculino_number();
	T170 = Stack[(int)p];
	p = p - 3;
	/***** Inician recuperacion de temporales del stack *****/
	T174 = p + 2;
	T167 = Stack[(int)T174];
	/***** Finaliza la recuperacion de temporales del stack *****/
	T175 = T167 - T170;
	Stack[(int)p] = T175;
	goto L88;
	goto L94;
	L93:
	Stack[(int)p] = 0;
	goto L88;
	L94:
	/***** Fin If *****/
	L91:
	/***** Fin If *****/
	L88:
return;
}


void main_factorial_number() {
	T177 = p + 1;
	T176 = Stack[(int)T177];
	/***** Inicia Switch *****/
	goto L97;
	L98:
	Stack[(int)p] = 1;
	goto L95;
	L99:
	T179 = p + 1;
	T178 = Stack[(int)T179];
	/***** Inicia salvacion de temporales en el stack *****/
	T180 = p + 2;
	Stack[(int)T180] = T176;
	T180 = T180 + 1;
	Stack[(int)T180] = T178;
	/***** Finalizando salvacion de temporales en el stack *****/
	T181 = p + 5;
	T183 = p + 1;
	T182 = Stack[(int)T183];
	T184 = T182 - 1;
	Stack[(int)T181] = T184;
	p = p + 4;
	main_factorial_number();
	T181 = Stack[(int)p];
	p = p - 4;
	/***** Inician recuperacion de temporales del stack *****/
	T185 = p + 2;
	T176 = Stack[(int)T185];
	T185 = T185 + 1;
	T178 = Stack[(int)T185];
	/***** Finaliza la recuperacion de temporales del stack *****/
	T186 = T178 * T181;
	Stack[(int)p] = T186;
	goto L95;
	goto L96;
	L97:
	if (0 == T176) goto L98;
	goto L99;
	L96:
	/***** Finaliza switch *****/
	L95:
return;
}


void main_potencia_number_number() {
	T188 = p + 2;
	T187 = Stack[(int)T188];
	/***** Inicia Switch *****/
	goto L102;
	L103:
	Stack[(int)p] = 1;
	goto L100;
	L104:
	T190 = p + 1;
	T189 = Stack[(int)T190];
	/***** Inicia salvacion de temporales en el stack *****/
	T191 = p + 3;
	Stack[(int)T191] = T187;
	T191 = T191 + 1;
	Stack[(int)T191] = T189;
	/***** Finalizando salvacion de temporales en el stack *****/
	T192 = p + 6;
	T194 = p + 1;
	T193 = Stack[(int)T194];
	Stack[(int)T192] = T193;
	T192 = T192 + 1;
	T196 = p + 2;
	T195 = Stack[(int)T196];
	T197 = T195 - 1;
	Stack[(int)T192] = T197;
	p = p + 5;
	main_potencia_number_number();
	T192 = Stack[(int)p];
	p = p - 5;
	/***** Inician recuperacion de temporales del stack *****/
	T198 = p + 3;
	T187 = Stack[(int)T198];
	T198 = T198 + 1;
	T189 = Stack[(int)T198];
	/***** Finaliza la recuperacion de temporales del stack *****/
	T199 = T189 * T192;
	Stack[(int)p] = T199;
	goto L100;
	goto L101;
	L102:
	if (0 == T187) goto L103;
	goto L104;
	L101:
	/***** Finaliza switch *****/
	L100:
return;
}


void main_modulo_number_number() {
	/***** Inicia Ternario *****/
	T201 = p + 1;
	T200 = Stack[(int)T201];
	T203 = p + 2;
	T202 = Stack[(int)T203];
	if (T200 < T202) goto L106;
	goto L107;
	L106:
	T206 = p + 1;
	T205 = Stack[(int)T206];
	T204 = T205  ;
	goto L108;
	L107:
	/***** Inicia salvacion de temporales en el stack *****/
	T207 = p + 3;
	Stack[(int)T207] = T204;
	/***** Finalizando salvacion de temporales en el stack *****/
	T208 = p + 5;
	T210 = p + 1;
	T209 = Stack[(int)T210];
	T212 = p + 2;
	T211 = Stack[(int)T212];
	T213 = T209 - T211;
	Stack[(int)T208] = T213;
	T208 = T208 + 1;
	T215 = p + 2;
	T214 = Stack[(int)T215];
	Stack[(int)T208] = T214;
	p = p + 4;
	main_modulo_number_number();
	T208 = Stack[(int)p];
	p = p - 4;
	/***** Inician recuperacion de temporales del stack *****/
	T216 = p + 3;
	T204 = Stack[(int)T216];
	/***** Finaliza la recuperacion de temporales del stack *****/
	T204 = T208  ;
	L108:
	/***** Termina Ternario *****/
	Stack[(int)p] = T204;
	goto L105;
	L105:
return;
}


void main_mcd_number_number() {
	/***** Inicia Ternario *****/
	T218 = p + 2;
	T217 = Stack[(int)T218];
	if (T217 == 0) goto L110;
	goto L111;
	L110:
	T221 = p + 1;
	T220 = Stack[(int)T221];
	T219 = T220  ;
	goto L112;
	L111:
	/***** Inicia salvacion de temporales en el stack *****/
	T222 = p + 3;
	Stack[(int)T222] = T219;
	/***** Finalizando salvacion de temporales en el stack *****/
	T223 = p + 5;
	T225 = p + 2;
	T224 = Stack[(int)T225];
	Stack[(int)T223] = T224;
	T223 = T223 + 1;
	/***** Inicia salvacion de temporales en el stack *****/
	T226 = p + 4;
	Stack[(int)T226] = T219;
	/***** Finalizando salvacion de temporales en el stack *****/
	T227 = p + 6;
	T229 = p + 1;
	T228 = Stack[(int)T229];
	Stack[(int)T227] = T228;
	T227 = T227 + 1;
	T231 = p + 2;
	T230 = Stack[(int)T231];
	Stack[(int)T227] = T230;
	p = p + 5;
	main_modulo_number_number();
	T227 = Stack[(int)p];
	p = p - 5;
	/***** Inician recuperacion de temporales del stack *****/
	T232 = p + 4;
	T219 = Stack[(int)T232];
	/***** Finaliza la recuperacion de temporales del stack *****/
	Stack[(int)T223] = T227;
	p = p + 4;
	main_mcd_number_number();
	T223 = Stack[(int)p];
	p = p - 4;
	/***** Inician recuperacion de temporales del stack *****/
	T233 = p + 3;
	T219 = Stack[(int)T233];
	/***** Finaliza la recuperacion de temporales del stack *****/
	T219 = T223  ;
	L112:
	/***** Termina Ternario *****/
	Stack[(int)p] = T219;
	goto L109;
	L109:
return;
}


void main_multiplicacion_number_number() {
	/***** Inicia If *****/
	T235 = p + 2;
	T234 = Stack[(int)T235];
	if (T234 == 0) goto L114;
	goto L115;
	L114:
	Stack[(int)p] = 0;
	goto L113;
	L115:
	/***** Fin If *****/
	T237 = p + 1;
	T236 = Stack[(int)T237];
	/***** Inicia salvacion de temporales en el stack *****/
	T238 = p + 3;
	Stack[(int)T238] = T236;
	/***** Finalizando salvacion de temporales en el stack *****/
	T239 = p + 5;
	T241 = p + 1;
	T240 = Stack[(int)T241];
	Stack[(int)T239] = T240;
	T239 = T239 + 1;
	T243 = p + 2;
	T242 = Stack[(int)T243];
	T244 = T242 - 1;
	Stack[(int)T239] = T244;
	p = p + 4;
	main_multiplicacion_number_number();
	T239 = Stack[(int)p];
	p = p - 4;
	/***** Inician recuperacion de temporales del stack *****/
	T245 = p + 3;
	T236 = Stack[(int)T245];
	/***** Finaliza la recuperacion de temporales del stack *****/
	T246 = T236 + T239;
	Stack[(int)p] = T246;
	goto L113;
	L113:
return;
}


void main_menu_empty() {
	T247 = p + 2;
	Stack[(int)T247] = 13;
	p = p + 1;
	main_fibonacci_number();
	T247 = Stack[(int)p];
	p = p - 1;
	printf("%f",T247);
	printf("%c",10);
	T248 = p + 2;
	Stack[(int)T248] = 3;
	T248 = T248 + 1;
	Stack[(int)T248] = 1;
	T248 = T248 + 1;
	Stack[(int)T248] = 2;
	T248 = T248 + 1;
	Stack[(int)T248] = 3;
	p = p + 1;
	main_hanoi_number_number_number_number();
	T248 = Stack[(int)p];
	p = p - 1;
	/***** Inicia salvacion de temporales en el stack *****/
	T249 = p + 1;
	Stack[(int)T249] = T248;
	/***** Finalizando salvacion de temporales en el stack *****/
	T250 = p + 3;
	Stack[(int)T250] = 3;
	T250 = T250 + 1;
	Stack[(int)T250] = 7;
	p = p + 2;
	main_ackermann_number_number();
	T250 = Stack[(int)p];
	p = p - 2;
	/***** Inician recuperacion de temporales del stack *****/
	T251 = p + 1;
	T248 = Stack[(int)T251];
	/***** Finaliza la recuperacion de temporales del stack *****/
	printf("%f",T250);
	printf("%c",10);
	/***** Inicia salvacion de temporales en el stack *****/
	T252 = p + 1;
	Stack[(int)T252] = T248;
	/***** Finalizando salvacion de temporales en el stack *****/
	T253 = p + 3;
	Stack[(int)T253] = 13;
	p = p + 2;
	main_par_number();
	T253 = Stack[(int)p];
	p = p - 2;
	/***** Inician recuperacion de temporales del stack *****/
	T254 = p + 1;
	T248 = Stack[(int)T254];
	/***** Finaliza la recuperacion de temporales del stack *****/
	printf("%f",T253);
	printf("%c",10);
	/***** Inicia salvacion de temporales en el stack *****/
	T255 = p + 1;
	Stack[(int)T255] = T248;
	/***** Finalizando salvacion de temporales en el stack *****/
	T256 = p + 3;
	Stack[(int)T256] = 20;
	p = p + 2;
	main_par_number();
	T256 = Stack[(int)p];
	p = p - 2;
	/***** Inician recuperacion de temporales del stack *****/
	T257 = p + 1;
	T248 = Stack[(int)T257];
	/***** Finaliza la recuperacion de temporales del stack *****/
	printf("%f",T256);
	printf("%c",10);
	/***** Inicia salvacion de temporales en el stack *****/
	T258 = p + 1;
	Stack[(int)T258] = T248;
	/***** Finalizando salvacion de temporales en el stack *****/
	T259 = p + 3;
	Stack[(int)T259] = 444;
	p = p + 2;
	main_hofstaderMasculino_number();
	T259 = Stack[(int)p];
	p = p - 2;
	/***** Inician recuperacion de temporales del stack *****/
	T260 = p + 1;
	T248 = Stack[(int)T260];
	/***** Finaliza la recuperacion de temporales del stack *****/
	printf("%f",T259);
	printf("%c",10);
	/***** Inicia salvacion de temporales en el stack *****/
	T261 = p + 1;
	Stack[(int)T261] = T248;
	/***** Finalizando salvacion de temporales en el stack *****/
	T262 = p + 3;
	Stack[(int)T262] = 10;
	p = p + 2;
	main_factorial_number();
	T262 = Stack[(int)p];
	p = p - 2;
	/***** Inician recuperacion de temporales del stack *****/
	T263 = p + 1;
	T248 = Stack[(int)T263];
	/***** Finaliza la recuperacion de temporales del stack *****/
	printf("%f",T262);
	printf("%c",10);
	/***** Inicia salvacion de temporales en el stack *****/
	T264 = p + 1;
	Stack[(int)T264] = T248;
	/***** Finalizando salvacion de temporales en el stack *****/
	T265 = p + 3;
	Stack[(int)T265] = 5;
	T265 = T265 + 1;
	Stack[(int)T265] = 4;
	p = p + 2;
	main_potencia_number_number();
	T265 = Stack[(int)p];
	p = p - 2;
	/***** Inician recuperacion de temporales del stack *****/
	T266 = p + 1;
	T248 = Stack[(int)T266];
	/***** Finaliza la recuperacion de temporales del stack *****/
	printf("%f",T265);
	printf("%c",10);
	/***** Inicia salvacion de temporales en el stack *****/
	T267 = p + 1;
	Stack[(int)T267] = T248;
	/***** Finalizando salvacion de temporales en el stack *****/
	T268 = p + 3;
	Stack[(int)T268] = 240;
	T268 = T268 + 1;
	Stack[(int)T268] = 506;
	p = p + 2;
	main_mcd_number_number();
	T268 = Stack[(int)p];
	p = p - 2;
	/***** Inician recuperacion de temporales del stack *****/
	T269 = p + 1;
	T248 = Stack[(int)T269];
	/***** Finaliza la recuperacion de temporales del stack *****/
	printf("%f",T268);
	printf("%c",10);
	/***** Inicia salvacion de temporales en el stack *****/
	T270 = p + 1;
	Stack[(int)T270] = T248;
	/***** Finalizando salvacion de temporales en el stack *****/
	T271 = p + 3;
	Stack[(int)T271] = 11;
	T271 = T271 + 1;
	Stack[(int)T271] = 23;
	p = p + 2;
	main_multiplicacion_number_number();
	T271 = Stack[(int)p];
	p = p - 2;
	/***** Inician recuperacion de temporales del stack *****/
	T272 = p + 1;
	T248 = Stack[(int)T272];
	/***** Finaliza la recuperacion de temporales del stack *****/
	printf("%f",T271);
	printf("%c",10);
	L116:
return;
}
