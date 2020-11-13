#include<math.h>
#include<stdio.h>
int A0=0, A1=0, A2=0;
double T0=0, T1=0, T2=0, T3=0, T4=0, T5=0, T6=0, T7=0, T8=0, T9=0, T10=0, T11=0, T12=0, T13=0, T14=0, T15=0, T16=0, T17=0, T18=0, T19=0, T20=0, T21=0, T22=0, T23=0, T24=0, T25=0, T26=0, T27=0, T28=0, T29=0, T30=0, T31=0, T32=0, T33=0, T34=0, T35=0, T36=0, T37=0, T38=0, T39=0, T40=0, T41=0, T42=0, T43=0, T44=0, T45=0, T46=0, T47=0, T48=0, T49=0, T50=0, T51=0, T52=0, T53=0, T54=0, T55=0, T56=0, T57=0, T58=0, T59=0, T60=0, T61=0, T62=0, T63=0, T64=0, T65=0, T66=0, T67=0, T68=0, T69=0, T70=0, T71=0, T72=0, T73=0, T74=0, T75=0, T76=0, T77=0, T78=0, T79=0, T80=0, T81=0, T82=0, T83=0, T84=0, T85=0, T86=0, T87=0, T88=0, T89=0, T90=0, T91=0, T92=0, T93=0, T94=0, T95=0, T96=0, T97=0, T98=0, T99=0, T100=0, T101=0, T102=0, T103=0, T104=0, T105=0, T106=0, T107=0, T108=0, T109=0, T110=0, T111=0, T112=0, T113=0, T114=0, T115=0, T116=0, T117=0, T118=0, T119=0, T120=0, T121=0, T122=0, T123=0, T124=0, T125=0, T126=0, T127=0, T128=0, T129=0, T130=0, T131=0, T132=0, T133=0, T134=0, T135=0, T136=0, T137=0, T138=0, T139=0, T140=0, T141=0, T142=0, T143=0, T144=0, T145=0, T146=0, T147=0, T148=0, T149=0, T150=0, T151=0, T152=0, T153=0, T154=0, T155=0, T156=0, T157=0, T158=0, T159=0, T160=0, T161=0, T162=0, T163=0, T164=0, T165=0, T166=0, T167=0, T168=0, T169=0, T170=0, T171=0, T172=0, T173=0, T174=0, T175=0, T176=0, T177=0, T178=0, T179=0, T180=0, T181=0, T182=0, T183=0, T184=0, T185=0, T186=0, T187=0, T188=0, T189=0, T190=0, T191=0, T192=0, T193=0, T194=0, T195=0, T196=0, T197=0, T198=0, T199=0, T200=0, T201=0, T202=0, T203=0, T204=0, T205=0, T206=0, T207=0, T208=0, T209=0, T210=0, T211=0, T212=0, T213=0, T214=0;
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
T49 = p + 1;
Stack[(int)T49] = 13;
p = p + 0;
main_fibonacci_number();
T49 = Stack[(int)p];
p = p - 0;
printf("%f",T49);
printf("%c",10);
T50 = p + 1;
Stack[(int)T50] = 4;
T50 = T50 + 1;
Stack[(int)T50] = 1;
T50 = T50 + 1;
Stack[(int)T50] = 5;
T50 = T50 + 1;
Stack[(int)T50] = 3;
p = p + 0;
main_hanoi_number_number_number_number();
T50 = Stack[(int)p];
p = p - 0;
p = p + 0;
Stack[(int)p] = T50;
nativa_imprimir_string();
p = p - 0;
printf("%c",10);
T51 = p + 1;
Stack[(int)T51] = 3;
T51 = T51 + 1;
Stack[(int)T51] = 8;
p = p + 0;
main_ackermann_number_number();
T51 = Stack[(int)p];
p = p - 0;
printf("%f",T51);
printf("%c",10);
T52 = p + 1;
Stack[(int)T52] = 29;
p = p + 0;
main_par_number();
T52 = Stack[(int)p];
p = p - 0;
printf("%f",T52);
printf("%c",10);
T53 = p + 1;
Stack[(int)T53] = 400;
p = p + 0;
main_par_number();
T53 = Stack[(int)p];
p = p - 0;
printf("%f",T53);
printf("%c",10);
T54 = p + 1;
Stack[(int)T54] = 1238;
p = p + 0;
main_hofstaderMasculino_number();
T54 = Stack[(int)p];
p = p - 0;
printf("%f",T54);
printf("%c",10);
T55 = p + 1;
Stack[(int)T55] = 13;
p = p + 0;
main_factorial_number();
T55 = Stack[(int)p];
p = p - 0;
printf("%f",T55);
printf("%c",10);
T56 = p + 1;
Stack[(int)T56] = 30;
T56 = T56 + 1;
Stack[(int)T56] = 5;
p = p + 0;
main_potencia_number_number();
T56 = Stack[(int)p];
p = p - 0;
printf("%f",T56);
printf("%c",10);
return;
}


void main_fibonacci_number() {
	/***** Inicia If *****/
	T58 = p + 1;
	T57 = Stack[(int)T58];
	if (T57 <= 1) goto L66;
	goto L67;
	L66:
	T60 = p + 1;
	T59 = Stack[(int)T60];
	Stack[(int)p] = T59;
	goto L65;
	L67:
	/***** Fin If *****/
	T61 = p + 3;
	T63 = p + 1;
	T62 = Stack[(int)T63];
	T64 = T62 - 1;
	Stack[(int)T61] = T64;
	p = p + 2;
	main_fibonacci_number();
	T61 = Stack[(int)p];
	p = p - 2;
	/***** Inicia salvacion de temporales en el stack *****/
	T65 = p + 2;
	Stack[(int)T65] = T61;
	/***** Finalizando salvacion de temporales en el stack *****/
	T66 = p + 4;
	T68 = p + 1;
	T67 = Stack[(int)T68];
	T69 = T67 - 2;
	Stack[(int)T66] = T69;
	p = p + 3;
	main_fibonacci_number();
	T66 = Stack[(int)p];
	p = p - 3;
	/***** Inician recuperacion de temporales del stack *****/
	T70 = p + 2;
	T61 = Stack[(int)T70];
	/***** Finaliza la recuperacion de temporales del stack *****/
	T71 = T61 + T66;
	Stack[(int)p] = T71;
	goto L65;
	L65:
return;
}


void main_hanoi_number_number_number_number() {
	T72 = h  ;
	Heap[(int)h] = -1;
	h = h + 1;
	T73 = p + 5;
	Stack[(int)T73] = T72;
	/***** Inicia If *****/
	T75 = p + 1;
	T74 = Stack[(int)T75];
	if (T74 == 1) goto L69;
	goto L70;
	L69:
	T76 = p + 5;
	T78 = p + 5;
	T77 = Stack[(int)T78];
	T80 = p + 2;
	T79 = Stack[(int)T80];
	T82 = p + 4;
	T81 = Stack[(int)T82];
	T83 = T79 + T81;
	T85 = p + 7;
	Stack[(int)T85] = T77;
	T85 = T85 + 1;
	Stack[(int)T85] = T83;
	p = p + 6;
	nativa_conca_string_number();
	T84 = Stack[(int)p];
	p = p - 6;
	Stack[(int)T76] = T84;
	goto L71;
	L70:
	T86 = p + 5;
	T88 = p + 5;
	T87 = Stack[(int)T88];
	/***** Inicia salvacion de temporales en el stack *****/
	T89 = p + 6;
	Stack[(int)T89] = T86;
	T89 = T89 + 1;
	Stack[(int)T89] = T87;
	/***** Finalizando salvacion de temporales en el stack *****/
	T90 = p + 9;
	T92 = p + 1;
	T91 = Stack[(int)T92];
	T93 = T91 - 1;
	Stack[(int)T90] = T93;
	T90 = T90 + 1;
	T95 = p + 2;
	T94 = Stack[(int)T95];
	Stack[(int)T90] = T94;
	T90 = T90 + 1;
	T97 = p + 4;
	T96 = Stack[(int)T97];
	Stack[(int)T90] = T96;
	T90 = T90 + 1;
	T99 = p + 3;
	T98 = Stack[(int)T99];
	Stack[(int)T90] = T98;
	p = p + 8;
	main_hanoi_number_number_number_number();
	T90 = Stack[(int)p];
	p = p - 8;
	/***** Inician recuperacion de temporales del stack *****/
	T100 = p + 6;
	T86 = Stack[(int)T100];
	T100 = T100 + 1;
	T87 = Stack[(int)T100];
	/***** Finaliza la recuperacion de temporales del stack *****/
	T102 = p + 7;
	Stack[(int)T102] = T87;
	T102 = T102 + 1;
	Stack[(int)T102] = T90;
	p = p + 6;
	nativa_conca_string_string();
	T101 = Stack[(int)p];
	p = p - 6;
	Stack[(int)T86] = T101;
	T103 = p + 5;
	T105 = p + 5;
	T104 = Stack[(int)T105];
	T107 = p + 2;
	T106 = Stack[(int)T107];
	T109 = p + 4;
	T108 = Stack[(int)T109];
	T110 = T106 + T108;
	T112 = p + 7;
	Stack[(int)T112] = T104;
	T112 = T112 + 1;
	Stack[(int)T112] = T110;
	p = p + 6;
	nativa_conca_string_number();
	T111 = Stack[(int)p];
	p = p - 6;
	Stack[(int)T103] = T111;
	T113 = p + 5;
	T115 = p + 5;
	T114 = Stack[(int)T115];
	/***** Inicia salvacion de temporales en el stack *****/
	T116 = p + 6;
	Stack[(int)T116] = T113;
	T116 = T116 + 1;
	Stack[(int)T116] = T114;
	/***** Finalizando salvacion de temporales en el stack *****/
	T117 = p + 9;
	T119 = p + 1;
	T118 = Stack[(int)T119];
	T120 = T118 - 1;
	Stack[(int)T117] = T120;
	T117 = T117 + 1;
	T122 = p + 3;
	T121 = Stack[(int)T122];
	Stack[(int)T117] = T121;
	T117 = T117 + 1;
	T124 = p + 2;
	T123 = Stack[(int)T124];
	Stack[(int)T117] = T123;
	T117 = T117 + 1;
	T126 = p + 4;
	T125 = Stack[(int)T126];
	Stack[(int)T117] = T125;
	p = p + 8;
	main_hanoi_number_number_number_number();
	T117 = Stack[(int)p];
	p = p - 8;
	/***** Inician recuperacion de temporales del stack *****/
	T127 = p + 6;
	T113 = Stack[(int)T127];
	T127 = T127 + 1;
	T114 = Stack[(int)T127];
	/***** Finaliza la recuperacion de temporales del stack *****/
	T129 = p + 7;
	Stack[(int)T129] = T114;
	T129 = T129 + 1;
	Stack[(int)T129] = T117;
	p = p + 6;
	nativa_conca_string_string();
	T128 = Stack[(int)p];
	p = p - 6;
	Stack[(int)T113] = T128;
	L71:
	/***** Fin If *****/
	T131 = p + 5;
	T130 = Stack[(int)T131];
	Stack[(int)p] = T130;
	goto L68;
	L68:
return;
}


void main_ackermann_number_number() {
	/***** Inicia If *****/
	T133 = p + 1;
	T132 = Stack[(int)T133];
	if (T132 == 0) goto L73;
	goto L74;
	L73:
	T135 = p + 2;
	T134 = Stack[(int)T135];
	T136 = T134 + 1;
	Stack[(int)p] = T136;
	goto L72;
	goto L75;
	L74:
	/***** Inicia If *****/
	T138 = p + 1;
	T137 = Stack[(int)T138];
	if (T137 > 0) goto L78;
	goto L77;
	L78:
	T140 = p + 2;
	T139 = Stack[(int)T140];
	if (T139 == 0) goto L76;
	goto L77;
	L76:
	T141 = p + 4;
	T143 = p + 1;
	T142 = Stack[(int)T143];
	T144 = T142 - 1;
	Stack[(int)T141] = T144;
	T141 = T141 + 1;
	Stack[(int)T141] = 1;
	p = p + 3;
	main_ackermann_number_number();
	T141 = Stack[(int)p];
	p = p - 3;
	T145 = p + 3;
	Stack[(int)T145] = T141;
	T147 = p + 3;
	T146 = Stack[(int)T147];
	Stack[(int)p] = T146;
	goto L72;
	goto L79;
	L77:
	T148 = p + 4;
	T150 = p + 1;
	T149 = Stack[(int)T150];
	Stack[(int)T148] = T149;
	T148 = T148 + 1;
	T152 = p + 2;
	T151 = Stack[(int)T152];
	T153 = T151 - 1;
	Stack[(int)T148] = T153;
	p = p + 3;
	main_ackermann_number_number();
	T148 = Stack[(int)p];
	p = p - 3;
	T154 = p + 3;
	Stack[(int)T154] = T148;
	T155 = p + 5;
	T157 = p + 1;
	T156 = Stack[(int)T157];
	T158 = T156 - 1;
	Stack[(int)T155] = T158;
	T155 = T155 + 1;
	T160 = p + 3;
	T159 = Stack[(int)T160];
	Stack[(int)T155] = T159;
	p = p + 4;
	main_ackermann_number_number();
	T155 = Stack[(int)p];
	p = p - 4;
	T161 = p + 4;
	Stack[(int)T161] = T155;
	T163 = p + 4;
	T162 = Stack[(int)T163];
	Stack[(int)p] = T162;
	goto L72;
	L79:
	/***** Fin If *****/
	L75:
	/***** Fin If *****/
	L72:
return;
}


void main_par_number() {
	/***** Inicia If *****/
	T165 = p + 1;
	T164 = Stack[(int)T165];
	if (T164 == 0) goto L81;
	goto L82;
	L81:
	Stack[(int)p] = 1;
	goto L80;
	L82:
	/***** Fin If *****/
	T166 = p + 3;
	T168 = p + 1;
	T167 = Stack[(int)T168];
	T169 = T167 - 1;
	Stack[(int)T166] = T169;
	p = p + 2;
	main_impar_number();
	T166 = Stack[(int)p];
	p = p - 2;
	Stack[(int)p] = T166;
	goto L80;
	L80:
return;
}


void main_impar_number() {
	/***** Inicia If *****/
	T171 = p + 1;
	T170 = Stack[(int)T171];
	if (T170 == 0) goto L84;
	goto L85;
	L84:
	Stack[(int)p] = 0;
	goto L83;
	L85:
	/***** Fin If *****/
	T172 = p + 3;
	T174 = p + 1;
	T173 = Stack[(int)T174];
	T175 = T173 - 1;
	Stack[(int)T172] = T175;
	p = p + 2;
	main_par_number();
	T172 = Stack[(int)p];
	p = p - 2;
	Stack[(int)p] = T172;
	goto L83;
	L83:
return;
}


void main_hofstaderMasculino_number() {
	/***** Inicia If *****/
	T177 = p + 1;
	T176 = Stack[(int)T177];
	if (T176 < 0) goto L87;
	goto L88;
	L87:
	Stack[(int)p] = 0;
	goto L86;
	goto L89;
	L88:
	/***** Inicia If *****/
	T179 = p + 1;
	T178 = Stack[(int)T179];
	if (T178 != 0) goto L90;
	goto L91;
	L90:
	T181 = p + 1;
	T180 = Stack[(int)T181];
	/***** Inicia salvacion de temporales en el stack *****/
	T182 = p + 2;
	Stack[(int)T182] = T180;
	/***** Finalizando salvacion de temporales en el stack *****/
	T183 = p + 4;
	T185 = p + 1;
	T184 = Stack[(int)T185];
	T186 = T184 - 1;
	Stack[(int)T183] = T186;
	p = p + 3;
	main_hofstaderMasculino_number();
	T183 = Stack[(int)p];
	p = p - 3;
	/***** Inician recuperacion de temporales del stack *****/
	T187 = p + 2;
	T180 = Stack[(int)T187];
	/***** Finaliza la recuperacion de temporales del stack *****/
	T188 = T180 - T183;
	Stack[(int)p] = T188;
	goto L86;
	goto L92;
	L91:
	Stack[(int)p] = 0;
	goto L86;
	L92:
	/***** Fin If *****/
	L89:
	/***** Fin If *****/
	L86:
return;
}


void main_factorial_number() {
	T190 = p + 1;
	T189 = Stack[(int)T190];
	/***** Inicia Switch *****/
	goto L95;
	L96:
	Stack[(int)p] = 1;
	goto L93;
	L97:
	T191 = 100 * -1;
	Stack[(int)p] = T191;
	goto L93;
	L98:
	T193 = p + 1;
	T192 = Stack[(int)T193];
	/***** Inicia salvacion de temporales en el stack *****/
	T194 = p + 2;
	Stack[(int)T194] = T189;
	T194 = T194 + 1;
	Stack[(int)T194] = T192;
	/***** Finalizando salvacion de temporales en el stack *****/
	T195 = p + 5;
	T197 = p + 1;
	T196 = Stack[(int)T197];
	T198 = T196 - 1;
	Stack[(int)T195] = T198;
	p = p + 4;
	main_factorial_number();
	T195 = Stack[(int)p];
	p = p - 4;
	/***** Inician recuperacion de temporales del stack *****/
	T199 = p + 2;
	T189 = Stack[(int)T199];
	T199 = T199 + 1;
	T192 = Stack[(int)T199];
	/***** Finaliza la recuperacion de temporales del stack *****/
	T200 = T192 * T195;
	Stack[(int)p] = T200;
	goto L93;
	goto L94;
	L95:
	if (0 == T189) goto L96;
	if (0 == T189) goto L97;
	goto L98;
	L94:
	/***** Finaliza switch *****/
	L93:
return;
}


void main_potencia_number_number() {
	T202 = p + 2;
	T201 = Stack[(int)T202];
	/***** Inicia Switch *****/
	goto L101;
	L102:
	Stack[(int)p] = 1;
	goto L99;
	L103:
	T203 = 100 * -1;
	Stack[(int)p] = T203;
	goto L99;
	L104:
	T205 = p + 1;
	T204 = Stack[(int)T205];
	/***** Inicia salvacion de temporales en el stack *****/
	T206 = p + 3;
	Stack[(int)T206] = T201;
	T206 = T206 + 1;
	Stack[(int)T206] = T204;
	/***** Finalizando salvacion de temporales en el stack *****/
	T207 = p + 6;
	T209 = p + 1;
	T208 = Stack[(int)T209];
	Stack[(int)T207] = T208;
	T207 = T207 + 1;
	T211 = p + 2;
	T210 = Stack[(int)T211];
	T212 = T210 - 1;
	Stack[(int)T207] = T212;
	p = p + 5;
	main_potencia_number_number();
	T207 = Stack[(int)p];
	p = p - 5;
	/***** Inician recuperacion de temporales del stack *****/
	T213 = p + 3;
	T201 = Stack[(int)T213];
	T213 = T213 + 1;
	T204 = Stack[(int)T213];
	/***** Finaliza la recuperacion de temporales del stack *****/
	T214 = T204 * T207;
	Stack[(int)p] = T214;
	goto L99;
	goto L100;
	L101:
	if (0 == T201) goto L102;
	if (0 == T201) goto L103;
	goto L104;
	L100:
	/***** Finaliza switch *****/
	L99:
return;
}
