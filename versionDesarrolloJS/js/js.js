var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var facil = 3;
var dificil = 30;
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

window.onload = function(){
	//Encender los motores al apretar propulsor
	document.getElementById("imgPropulsor").onclick = function propulsar() {
 	  if (a==g){
  		propulsar();
 	  } else {
  		noPropulsar();
 	  }
	}
	//encender/apagar motor
	document.getElementById("imgPropulsor").propulsar = propulsar;
	document.getElementById("imgPropulsor").noPropulsar = noPropulsar;
	
	//Empezar a mover nave
	start();
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
	
	//si no queda combustible
	if (a == -g && fuelActual <= 0)
	{
		a = g;
		//QUITAR FUEGO
	}
	//mover hasta que top sea un 75% de la pantalla
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
		document.getElementById("fuelActual").style.color="white";
	}
}
function dificultadF(){
	dificultad = facil;
	document.getElementById("texto").innerHTML="Intentalo de nuevo";
	document.getElementById("texto2").innerHTML="Intentalo de nuevo para demostrar que no fue sido solo suerte";
	document.getElementById("menuPausa").className = "oculto";
	document.getElementById("dificultadD").style.display="none";
	document.getElementById("dificultadF").style.display="none";
	document.getElementById("panelBloqueadoFantasma").style.display="none";
	document.getElementById("opcionesJuego").textContent ="Opciones de juego";
	document.getElementById("opcionesInformacion").textContent ="Información";
	document.getElementById("pausaIzquierda").style.height ="30%";
	document.getElementById("pausaDerecha").style.height="30%";
	document.getElementById("pausaDificultad").style.display="block";
	document.getElementById("imgContenedorPausa").style.display="block";
	intentos = 0;
	aterrizajes = 0;
	reiniciarJuego();
}
function dificultadD(){
	dificultad = dificil;
	document.getElementById("texto").innerHTML="Intentalo de nuevo";
	document.getElementById("texto2").innerHTML="Intentalo de nuevo para demostrar que no fue sido solo suerte";
	document.getElementById("menuPausa").className = "oculto";
	document.getElementById("dificultadD").style.display="none";
	document.getElementById("dificultadF").style.display="none";
	document.getElementById("panelBloqueadoFantasma").style.display="none";
	document.getElementById("opcionesJuego").textContent ="Opciones de juego";
	document.getElementById("opcionesInformacion").textContent ="Información";
	document.getElementById("pausaIzquierda").style.height ="30%";
	document.getElementById("pausaDerecha").style.height="30%";
	document.getElementById("pausaDificultad").style.display="block";
	document.getElementById("imgContenedorPausa").style.display="block";
	intentos = 0;
	aterrizajes = 0;
	reiniciarJuego();
}
function reanudar() {
	start();
	document.getElementById("menuPausa").className = "oculto";
	document.getElementById("reanudar").style.display="none";
	document.getElementById("imgContenedorPausa").style.display="block";
	document.getElementById("reiniciar").style.display="none";
	document.getElementById("panelBloqueadoFantasma").style.display="none";
	document.getElementById("opcionesJuego").textContent ="Opciones de juego";
	document.getElementById("opcionesInformacion").textContent ="Información";
	document.getElementById("pausaIzquierda").style.height ="30%";
	document.getElementById("pausaDerecha").style.height="30%";
	document.getElementById("pausaDificultad").style.display="block";
}
function reiniciarJuego() {
	stop();
	document.getElementById("menuPausa").className = "oculto";
	document.getElementById("opcionesJuego").textContent ="Opciones de juego";
	document.getElementById("opcionesInformacion").textContent ="Información";
	document.getElementById("ganado").className = "ocultoGanado";
	document.getElementById("perdido").className = "ocultoPerdido";
	document.getElementById("reiniciar").style.display="none";
	document.getElementById("reanudar").style.display="none";
	document.getElementById("imgContenedorPausa").style.display="block";
	document.getElementById("panelBloqueadoFantasma").style.display="none";
	document.getElementById("pausaIzquierda").style.height ="30%";
	document.getElementById("pausaDerecha").style.height="30%";
	document.getElementById("pausaDificultad").style.display="block";
	document.getElementById("imgDificultadF").style.display="none";
	y = 10;
	v = 0;
	g = dificultad;
	a = g;
	dt = 0.02;
	fuelActual=fuelMaximo;
	document.getElementById("barraFuel").style.width="100%";
	document.getElementById("intentos").innerHTML=intentos;
	document.getElementById("fuelActual").innerHTML=fuelMaximo;
	document.getElementById("nave").src="img/gifOff.gif";
	bandera = true;
	noPropulsar();
	start();
}
function pausarJuego() {
	stop();
	document.getElementById("menuPausa").className = "";
	document.getElementById("imgContenedorPausa").style.display="none";
	document.getElementById("engranaje").style.display="inline-block";
	document.getElementById("panelBloqueadoFantasma").style.display="block";
	document.getElementById("bombilla").style.display="inline-block";
	document.getElementById("nave").src="img/naveNoFuel.png";
}

function desplegarEngranaje(){
	document.getElementById("pausaDificultad").style.display="none";
	document.getElementById("pausaIzquierda").style.height ="45%";
	document.getElementById("pausaDerecha").style.height="45%";
	document.getElementById("engranaje").style.display="none";
	document.getElementById("reanudar").style.display="inline-block";
	document.getElementById("reiniciar").style.display="inline-block";
	document.getElementById("bombilla").style.display="none";
	document.getElementById("opcionesJuego").textContent= "Reanudar la partida";
	document.getElementById("opcionesInformacion").textContent= "Reiniciar la partida";
}

function desplegarBombilla(){
	document.getElementById("pausaDificultad").style.display="none";
	document.getElementById("pausaIzquierda").style.height ="45%";
	document.getElementById("pausaDerecha").style.height="45%";
	document.getElementById("bombilla").style.display="none";
	document.getElementById("engranaje").style.display="none";
	document.getElementById("instrucciones").style.display="inline-block";
	document.getElementById("jsAbout").style.display="inline-block";
	document.getElementById("opcionesJuego").textContent= "Información";
	document.getElementById("opcionesInformacion").textContent= "Instrucciones";
}
function desplegarDificultad(){
	document.getElementById("pausaDificultad").style.display="none";
	document.getElementById("pausaIzquierda").style.height ="45%";
	document.getElementById("pausaDerecha").style.height="45%";
	document.getElementById("bombilla").style.display="none";
	document.getElementById("engranaje").style.display="none";
	document.getElementById("dificultadF").style.display="inline-block";
	document.getElementById("dificultadD").style.display="inline-block";
	document.getElementById("opcionesJuego").textContent= "Facil";
	document.getElementById("opcionesInformacion").textContent= "Dificil";
	document.getElementById("spanTituloPausa").textContent= "Selecciona una Dificultad";

}
//Empieza la funcion para finalizar el juego, segun el aterrizaje
function finalizarJuego() {
	if (v>5) {
		intentos++;
		document.getElementById("perdido").className = "";
		document.getElementById("nave").src="img/explosion.png";
		document.getElementById("fuelActual").innerHTML="0";
		document.getElementById("barraFuel").style.width="0%";
		document.getElementById("panelBloqueadoFantasma").style.display="block";
		document.getElementById("imgContenedorPausa").style.display="none";
		if (dificultad == dificil && intentos > 5){
			document.getElementById("texto").innerHTML="No das una, voy a dejar esto por aquí por si quieres ganar alguna...";
			document.getElementById("mostrarReinicioP").style.width = "50%";
			document.getElementById("mostrarCambioDificultadF").style.display = "inline-block";
			document.getElementById("imgDificultadF").style.display = "inline-block";
		}else{
			document.getElementById("intentos").innerHTML=intentos;
			document.getElementById("mostrarReinicioP").style.width = "100%";
			document.getElementByID("mostrarCambioDificultadF").style.display = "none";
		}
		stop();
	}
	else {
		aterrizajes++;
		document.getElementById("ganado").className = "";
		document.getElementById("intentos").innerHTML=intentos;
		document.getElementById("reiniciar").style.display="block";
		document.getElementById("nave").src="img/naveNoFuel.png";
		document.getElementById("panelBloqueadoFantasma").style.display="block";
		document.getElementById("imgContenedorPausa").style.display="none";
		document.getElementById("aterrizajes").innerHTML=aterrizajes;
		if (dificultad == facil && aterrizajes > 3){
			document.getElementById("texto2").innerHTML="¡Lo tienes dominado! ¿Subes a dificil?";
			document.getElementById("mostrarReinicioG").style.width = "45%";
			document.getElementById("mostrarCambioDificultadD").style.display = "inline-block";
			document.getElementById("imgDificultadD").style.display = "inline-block";
		}else{
			document.getElementById("texto2").innerHTML="Intentalo de nuevo para demostrar que no fue sido solo suerte";
			document.getElementById("mostrarReinicioG").style.width = "100%";
			document.getElementById("mostrarCambioDificultadD").style.display = "none";
		}
		stop();
	}
}

//Funciones de iluminacion para el menu de pausa
function engranajeHover(){
	document.getElementById("pausaHoverIzquierda").style.display="block";
	document.getElementById("pausaHoverDerecha").style.opacity ="0.7";
	document.getElementById("pausaHoverDerecha").style.background ="black";
	document.getElementById("pausaHoverDerecha").style.display="block";
	document.getElementById("pausaHoverDificultad").style.opacity ="0.7";
	document.getElementById("pausaHoverDificultad").style.background ="black";
	document.getElementById("pausaHoverDificultad").style.display="block";

}
function engranajeOut(){
	document.getElementById("pausaHoverIzquierda").style.display="none";
	document.getElementById("pausaHoverDerecha").style.display="none";
	document.getElementById("pausaHoverDerecha").style.background ="white";
	document.getElementById("pausaHoverDerecha").style.opacity ="0.2";
	document.getElementById("pausaHoverDificultad").style.display="none";
	document.getElementById("pausaHoverDificultad").style.background ="white";
	document.getElementById("pausaHoverDificultad").style.opacity ="0.2";
}

function bombillaHover(){
	document.getElementById("pausaHoverDerecha").style.background="white";
	document.getElementById("pausaHoverDerecha").style.opacity ="0.2";
	document.getElementById("pausaHoverDerecha").style.display="block";
	document.getElementById("pausaHoverIzquierda").style.opacity ="0.7";
	document.getElementById("pausaHoverIzquierda").style.background ="black";
	document.getElementById("pausaHoverIzquierda").style.display="block";
	document.getElementById("pausaHoverDificultad").style.opacity ="0.7";
	document.getElementById("pausaHoverDificultad").style.background ="black";
	document.getElementById("pausaHoverDificultad").style.display="block";
}
function bombillaOut(){
	document.getElementById("pausaHoverDerecha").style.display="none";
	document.getElementById("pausaHoverIzquierda").style.display ="none";
	document.getElementById("pausaHoverIzquierda").style.background ="white";
	document.getElementById("pausaHoverIzquierda").style.opacity="0.2";
	document.getElementById("pausaHoverDificultad").style.display="none";
	document.getElementById("pausaHoverDificultad").style.background ="white";
	document.getElementById("pausaHoverDificultad").style.opacity ="0.2";
}
function dificultadHover(){
	document.getElementById("pausaHoverDificultad").style.background="white";
	document.getElementById("pausaHoverDificultad").style.opacity ="0.2";
	document.getElementById("pausaHoverDificultad").style.display="block";
	document.getElementById("pausaHoverIzquierda").style.opacity ="0.7";
	document.getElementById("pausaHoverIzquierda").style.background ="black";
	document.getElementById("pausaHoverIzquierda").style.display="block";
	document.getElementById("pausaHoverDerecha").style.background="black";
	document.getElementById("pausaHoverDerecha").style.opacity ="0.7";
	document.getElementById("pausaHoverDerecha").style.display="block";
}
function dificultadOut(){
	document.getElementById("pausaHoverDificultad").style.display="none";
	document.getElementById("pausaHoverIzquierda").style.display ="none";
	document.getElementById("pausaHoverIzquierda").style.background ="white";
	document.getElementById("pausaHoverIzquierda").style.opacity="0.2";
	document.getElementById("pausaHoverDerecha").style.display="none";
	document.getElementById("pausaHoverDerecha").style.background ="white";
	document.getElementById("pausaHoverDerecha").style.opacity ="0.2";
}