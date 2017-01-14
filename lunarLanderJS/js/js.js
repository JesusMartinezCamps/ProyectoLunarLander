var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var facil = 3;
var dificil = 20;
var dificultad = facil;
var g = dificultad;
var a = g;
var dt = 0.02;
var timerFuel = null;
var fuelMaximo = 100;
var fuelActual = 100;
var intentos = 0;
var bandera = true;
var aterrizajes = 0;
var timer;


window.onload = function(){
	presentacion();
	/*Despliegue de menús*/
	document.getElementById("imgContenedorPausa").onclick=function(){pausarJuego();};
	document.getElementById("engranaje").onclick=function(){desplegarEngranaje();};
	document.getElementById("bombilla").onclick=function(){desplegarBombilla();};
	document.getElementById("desplegarDificultad").onclick=function(){desplegarDificultad();};
	/*Funciones de botones*/
	document.getElementById("dificultadF").onclick=function(){dificultadF();};
	document.getElementById("dificultadFPausa").onclick=function(){dificultadF();};
	document.getElementById("dificultadD").onclick=function(){dificultadD();};
	document.getElementById("dificultadDPausa").onclick=function(){dificultadD();};
	document.getElementById("imgReinicio").onclick=function(){reiniciarJuego();};
	document.getElementById("reiniciar").onclick=function(){reiniciarJuego();};
	document.getElementById("reanudar").onclick=function(){reanudar();};

	function presentacion(){
		stop();
		document.getElementById("panelBloqueadoFantasma").style.display="block";
		document.getElementById("finJuego").className="";
		document.getElementById("imgContenedorPausa").style.display="none";
		document.getElementById("panel").className="";
		document.getElementById("imgPropulsor").className="";
		document.getElementById("tituloFin").innerHTML="Lunar Lander 1.0";
		document.getElementById("texto").innerHTML="Pulsa el botón Propulsar para controlar la velocidad";
		document.getElementById("texto2").innerHTML="Selecciona una dificultado antes de empezar:";
	}
	/*Funciones para propulsar la nave*/
		/*Tecla Espacio*/
		window.onkeydown=function(e) {
			var pulsarEspacio;
			if (window.event)
				pulsarEspacio = window.event.keyCode;
			else if (e)
				pulsarEspacio = e.which;
			if (pulsarEspacio == 32){
				propulsar();
			}
		}
		window.onkeyup = noPropulsar;
		/*Boton Propulsor*/
		document.getElementById("imgPropulsor").onmousedown=function(){propulsar();};
		document.getElementById("imgPropulsor").onmouseup=function(){noPropulsar();};
		/*Touch en movil*/
		var movil = document.getElementById("imgPropulsor");
		movil.addEventListener("touchstart", pulsar, false);
		movil.addEventListener("touchend", soltar, false);
		function pulsar(event){
			propulsar();
		}
		function soltar(event){
			motorOff();
		}
}

function menu2(){
	if(document.getElementById("maestro").offsetWidth > 501){
		document.getElementById("pausaIzquierda").style.width="50%";
		document.getElementById("pausaDerecha").style.width="50%";
		document.getElementById("pausaDificultad").style.display="none";
		document.getElementById("pausaIzquierda").style.height="80%";
		document.getElementById("pausaDerecha").style.height="80%";
		document.getElementById("pausaDificultad").style.display="inline-block";
	}else{
		document.getElementById("pausaIzquierda").style.width="100%";
		document.getElementById("pausaDerecha").style.width="100%";
		document.getElementById("pausaDificultad").style.width="none";
		document.getElementById("pausaIzquierda").style.height="45%";
		document.getElementById("pausaDerecha").style.height="45%";
		document.getElementById("pausaDificultad").style.display="inline-block";
	}
}
function menu3(){
		if(document.getElementById("maestro").offsetWidth > 501){
			document.getElementById("pausaIzquierda").style.width="35%";
			document.getElementById("pausaDerecha").style.width="35%";
			document.getElementById("pausaDificultad").style.width="30%";
			document.getElementById("pausaIzquierda").style.height="80%";
			document.getElementById("pausaDerecha").style.height="80%";
			document.getElementById("pausaDificultad").style.height="80%";
			document.getElementById("pausaDificultad").style.display="inline-block";
		}else{
			document.getElementById("pausaIzquierda").style.width="100%";
			document.getElementById("pausaDerecha").style.width="100%";
			document.getElementById("pausaDificultad").style.width="100%";
			document.getElementById("pausaIzquierda").style.height="30%";
			document.getElementById("pausaDerecha").style.height="30%";
			document.getElementById("pausaDificultad").style.height="30%";
			document.getElementById("pausaDificultad").style.display="inline-block";
		}
}
//Definición de funciones
function start(){
	timer=setInterval(function(){ moverNave(); }, dt*500);
	fuelActual = fuelMaximo;
	bandera = true;
}
function stop(){
	clearInterval(timer);
	bandera = false;
}
function moverNave(){
	v +=a*dt;
	document.getElementById("velocidadNegativa").style.width = (v <= 0) ? -v/15*100 + '%' : '0';
	document.getElementById("velocidadPositiva").style.width = (v >= 0) ? v/15*100 + '%' : '0';
	document.getElementById("ms").innerHTML=v.toFixed(1);
	y +=v*dt;
	document.getElementById("altitudActual").innerHTML=(73-y >= 0) ? (73-y).toFixed(0) : '0';
	document.getElementById("barraAltitud").style.height = ((73-y)/60*100) + '%';
	if (a == -g && fuelActual <= 0){
		a = g;
	}
	if (y<73){ 
		document.getElementById("divNave").style.top = y+"%"; 
	} else { 
		stop();
		finalizarJuego();
	}
}
function actualizarFuel(){
	if (bandera){
		if (dificultad == facil){
			if(fuelActual > 0)
				fuelActual-=0.1;
			document.getElementById("fuelActual").innerHTML=fuelActual.toFixed(0);
			document.getElementById("barraFuel").style.width=(100*fuelActual/fuelMaximo)+'%';
		}
		else{
			fuelActual-=0.8;
			document.getElementById("fuelActual").innerHTML=fuelActual.toFixed(0);
			document.getElementById("barraFuel").style.width=(100*fuelActual/fuelMaximo)+'%';
		}
	}
}
function propulsar() {
	if(bandera){
		if (fuelActual>0){
			a=-g;
			if (timerFuel==null)
				timerFuel=setInterval(actualizarFuel, 10);   
			document.getElementById("fuelActual").style.color="red";
			document.getElementById("nave").src="img/gifOn.gif";
		}
		else{
			noPropulsar();
			document.getElementById("fuelActual").innerHTML=0;
			document.getElementById("fuelActual").style.color="red";
			document.getElementById("nave").src="img/naveNoFuel.png";
		}
		a=-g;
	}
}
function noPropulsar() {//motorOff
	if(bandera){
		a=g;
		document.getElementById("nave").src="img/gifOff.gif";
		if (fuelActual<=0) {
			document.getElementById("nave").src="img/naveNoFuel.png";
		}
		clearInterval(timerFuel);
		timerFuel=null;
		document.getElementById("fuelActual").style.color="#adcfff";
	}
}
function reanudar() {
	start();
	document.getElementById("menuPausa").className="oculto";
	document.getElementById("reanudar").style.display="none";
	document.getElementById("imgContenedorPausa").style.display="block";
	document.getElementById("reiniciar").style.display="none";
	document.getElementById("panelBloqueadoFantasma").style.display="none";
	document.getElementById("opcionesJuego").innerHTML="Opciones de juego";
	document.getElementById("opcionesInformacion").innerHTML ="Información";
}
function reiniciarJuego() {
	y=10;
	v=0;
	g=dificultad;
	a=g;
	dt=0.02;
	fuelActual=fuelMaximo;
	document.getElementById("finJuego").className="oculto";
	document.getElementById("menuPausa").className="oculto";
	document.getElementById("imgContenedorPausa").style.display="block";
	document.getElementById("panelBloqueadoFantasma").style.display="none";
	document.getElementById("barraFuel").style.width="100%";
	document.getElementById("aterrizajes").innerHTML=intentos;
	document.getElementById("fuelActual").innerHTML=fuelMaximo;
	document.getElementById("nave").src="img/gifOff.gif";
	document.getElementById("reanudar").style.display="none";
	document.getElementById("reiniciar").style.display="none";
	bandera = true;
	noPropulsar();
	start();
}
function renombrarOpcionesPausa(){
	document.getElementById("spanTituloPausa").innerHTML="Menú de Pausa";
	document.getElementById("opcionesJuego").innerHTML="Opciones de Juego";
	document.getElementById("opcionesDificultad").innerHTML="Dificultad";
	document.getElementById("opcionesInformacion").innerHTML="Información";
}
function pausarJuego() {
		stop();
		renombrarOpcionesPausa();
		menu3();
		document.getElementById("menuPausa").className="";
		document.getElementById("imgContenedorPausa").style.display="none";
		document.getElementById("engranaje").style.display="inline-block";
		document.getElementById("panelBloqueadoFantasma").style.display="block";
		document.getElementById("bombilla").style.display="inline-block";
		document.getElementById("nave").src="img/naveNoFuel.png";
}
function renombrarOpcionesJuego(){
	document.getElementById("spanTituloPausa").innerHTML="Opciones de Juego";
	document.getElementById("opcionesJuego").innerHTML="Reanudar la partida";
	document.getElementById("opcionesInformacion").innerHTML="Reiniciar la partida";

}
function desplegarEngranaje(){
	menu2();
	renombrarOpcionesJuego();
	document.getElementById("pausaDificultad").style.display="none";
	document.getElementById("reanudar").style.display="inline-block";
	document.getElementById("reiniciar").style.display="inline-block";
	document.getElementById("engranaje").style.display="none";
	document.getElementById("bombilla").style.display="none";
}
function renombrarOpcionesInformacion(){
	document.getElementById("spanTituloPausa").innerHTML="¿Qué quieres saber?";
	document.getElementById("opcionesJuego").innerHTML="Información acerca del juego";
	document.getElementById("opcionesInformacion").innerHTML="Instrucciones";

}
function desplegarBombilla(){
	menu2();
	renombrarOpcionesInformacion();
	document.getElementById("pausaDificultad").style.display="none";
	document.getElementById("bombilla").style.display="none";
	document.getElementById("engranaje").style.display="none";
	document.getElementById("instrucciones").style.display="inline-block";
	document.getElementById("jsAbout").style.display="inline-block";
}
function desplegarDificultad(){
	menu2();
	document.getElementById("pausaDificultad").style.display="none";
	document.getElementById("bombilla").style.display="none";
	document.getElementById("engranaje").style.display="none";
	document.getElementById("dificultadFPausa").style.display="inline-block";
	document.getElementById("dificultadDPausa").style.display="inline-block";
	document.getElementById("opcionesJuego").innerHTML="Facil";
	document.getElementById("opcionesInformacion").innerHTML= "Dificil";
	document.getElementById("spanTituloPausa").innerHTML="Selecciona una Dificultad";
}
function finalizarJuego() {
	if (v>5) { //Se ha perdido
		stop();
		intentos++;
		aterrizajes=0;
		document.getElementById("finJuego").className="";
		document.getElementById("tituloFin").innerHTML="¡Has Perdido!";
		document.getElementById("aterrizajes").innerHTML=intentos;
		document.getElementById("nave").src="img/explosion.png";
		document.getElementById("fuelActual").innerHTML="0";
		document.getElementById("barraFuel").style.width="0%";
		document.getElementById("panelBloqueadoFantasma").style.display="block";
		document.getElementById("imgContenedorPausa").style.display="none";
		document.getElementById("imgReinicio").style.display="inline-block";
		document.getElementById("divAterrizajes").style.display="inline-block";
		document.getElementById("informacionAterrizajes").innerHTML="Aterrizajes fallados: ";
		if (dificultad == dificil && intentos > 5){ // Perdido en dificil +5 intentos
			document.getElementById("texto").innerHTML="Esta claro que esto es demasiado dificil para ti...";
			document.getElementById("texto2").innerHTML="Yo voy dejando esto por aquí por si te aburres...";
			document.getElementById("dificultadF").style.display="inline-block";
		}else{ // Perdido dificil
			document.getElementById("texto").innerHTML="Puedes volver a intentarlo.";
			document.getElementById("texto2").innerHTML="Recuerda que tienes que aterrizar a menos de 5 m/s";
			document.getElementById("dificultadF").style.display="none";
			document.getElementById("dificultadD").style.display="none";
		}
	}
	else { //Se ha ganado
		aterrizajes++;
		document.getElementById("divAterrizajes").style.display="inline-block";
		document.getElementById("informacionAterrizajes").innerHTML="Aterrizajes seguidos: ";
		document.getElementById("finJuego").className="";
		document.getElementById("tituloFin").innerHTML="¡Has ganado!";
		document.getElementById("aterrizajes").innerHTML=aterrizajes;
		document.getElementById("imgReinicio").style.display="inline-block";
		document.getElementById("nave").src="img/naveNoFuel.png";
		document.getElementById("panelBloqueadoFantasma").style.display="block";
		document.getElementById("imgContenedorPausa").style.display="none";
		if (dificultad == facil && aterrizajes > 2){ //Racha de victorias
			document.getElementById("texto").innerHTML="¡Esta claro que esto es demasiado facil para ti!";
			document.getElementById("texto2").innerHTML="¡Lo tienes dominado! ¿Subes a dificil?";
			document.getElementById("dificultadD").style.marginLeft="0";
			document.getElementById("dificultadD").style.marginRight="10%";
			document.getElementById("dificultadD").style.display="inline-block";
		}else{ //Ganado sin mas
			document.getElementById("texto").innerHTML="¡Has conseguido aterrizar!";
			document.getElementById("texto2").innerHTML="Intentalo de nuevo para demostrar que no fue solo suerte";
		}
		stop();
	}
}
function dificultadF(){
	dificultad=facil;
	document.getElementById("finJuego").className="oculto";
	document.getElementById("dificultadF").style.display="none";
	document.getElementById("dificultadD").style.display="none";
	document.getElementById("dificultadFPausa").style.display="none";
	document.getElementById("dificultadDPausa").style.display="none";
	intentos=0;
	aterrizajes=0;
	reiniciarJuego();
}
function dificultadD(){
	dificultad=dificil;
	document.getElementById("finJuego").className="oculto";
	document.getElementById("dificultadF").style.display="none";
	document.getElementById("dificultadD").style.display="none";
	document.getElementById("dificultadFPausa").style.display="none";
	document.getElementById("dificultadDPausa").style.display="none";
	intentos=0;
	aterrizajes=0;
	reiniciarJuego();
}