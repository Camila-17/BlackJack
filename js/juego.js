var puntosJugadorUno = 0;
var puntosJugadorDos = 0;
var baraja;
var validarInicio = true;//comprobar si los puntos son <=21

function nuevoJuego() {
    window.location.reload();
}
function ocultarBotones() {
    document.getElementById("btnUno").style.display = 'none';
    document.getElementById("btnDos").style.display = 'none';
    document.getElementById("btnDetener").style.display = 'none';
}
function activarBotones() {
    document.getElementById("btnUno").style.display = 'block';
    document.getElementById("btnDos").style.display = 'block';
    document.getElementById("btnDetener").style.display = 'block';

}
function ocultarbtnNuevo() {
    document.getElementById("btnNuevo").style.display = 'none';
}
function activarbtnNuevo() {
    document.getElementById("btnNuevo").style.display = 'block';
}

window.onload = function () {
    hacerBaraja();
    combinarCartas();
    iniciarJuego();
    activarBotones();
    ocultarbtnNuevo();
}
//se sacan las cartas con sus nombres, aun sin valor
function hacerBaraja() {
    let valorCarta = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let tipoCarta = ["C", "D", "H", "S"];
    baraja = [];

    for (let i = 0; i < tipoCarta.length; i++) {
        for (let j = 0; j < valorCarta.length; j++) {
            baraja.push(valorCarta[j] + tipoCarta[i])
        }
    }
}
//se combinan las cartas con random
function combinarCartas() {
    for (let i = 0; i < baraja.length; i++) {
        let j = Math.floor(Math.random() * baraja.length);
        let temp = baraja[i];
        baraja[i] = baraja[j];
        baraja[j] = temp;
    }
    console.log(baraja);
}

function iniciarJuego() {
    document.getElementById("btnUno").addEventListener("click", nuevaCartaUno);
    document.getElementById("btnDos").addEventListener("click", nuevaCartaDos);
    document.getElementById("btnDetener").addEventListener("click", detener);
    document.getElementById("btnNuevo").addEventListener("click", nuevoJuego);
}
//console.log(puntosJugadorUno);

function nuevaCartaUno() {
    if (!validarInicio) {
        return
    }
    let imagenCartaUno = document.createElement("img");
    let carta = baraja.pop();
    imagenCartaUno.src = "./cartas/" + carta + ".png";
    //imagenCarta.classList.add('imagenCarta');
    puntosJugadorUno += getValue(carta);
    document.getElementById("cartaJugador1").append(imagenCartaUno);
    console.log(puntosJugadorUno);

    if (puntosJugadorUno > 21 || puntosJugadorDos > 21) {
        validarInicio = false;
        alert('Uno de los jugadores ha superado los 21 Pts. Presione el boton "DETENER"')
    }

}

function nuevaCartaDos() {
    if (!validarInicio) {
        return
    }
    let imagenCartaDos = document.createElement("img");
    let carta = baraja.pop();
    imagenCartaDos.src = "./cartas/" + carta + ".png";
    puntosJugadorDos += getValue(carta);
    document.getElementById("cartaJugador2").append(imagenCartaDos);
    console.log(puntosJugadorDos);

    if (puntosJugadorUno > 21 || puntosJugadorDos > 21) {
        validarInicio = false;
        alert('Uno de los jugadores ha superado los 21 Pts. Presione el boton "DETENER"')
    }
}

function detener() {
    activarbtnNuevo();
    ocultarBotones();
    validarInicio = false;

    let mensaje = "";
    if (puntosJugadorUno > 21) {
        mensaje = "!congratulations¡ Jugador-2 Ganador!";
    } else if (puntosJugadorDos > 21) {
        mensaje = "!congratulations¡ Jugador-1 Ganador!"
    } else if (puntosJugadorUno == puntosJugadorDos) {
        mensaje = "Se declara empate";
    } else if (puntosJugadorUno > puntosJugadorDos) {
        mensaje = "!congratulations¡ Jugador-1 Ganador";
    } else if (puntosJugadorUno < puntosJugadorDos) {
        mensaje = "!congratulations¡ Jugador-2 Ganador";
    }
    document.getElementById("resultados").textContent = mensaje;
    document.getElementById("ptsJugador1").textContent = puntosJugadorUno;
    document.getElementById("ptsJugador2").textContent = puntosJugadorDos;

}

function getValue(carta) {
    let datoCarta = carta;
    let value = datoCarta[0];
    if (value == 1) {
        return parseInt(10);
    } else {
        if (isNaN(value)) {
            if (value == "A") {//A J Q K validando el valor de A
                let valorA = prompt('Has sacado la Carta "A", selecciona "11","10" o "1"')
                if (valorA == 1 || valorA == 10 || valorA == 11) {
                    return parseInt(valorA);
                } else {
                    alert("Por favor ingresa un valor valido para la carta A  ")
                    return false;
                }

            }
            return 10;
        }
        return parseInt(value);
    }
}

