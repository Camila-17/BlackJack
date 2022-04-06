var puntosJugadorUno = 0;
var puntosJugadorDos = 0;
var baraja;
var validarInicio = true;//comprobar si los puntos son <=21

window.onload = function () {
    hacerBaraja();
    combinarCartas();
    iniciarJuego();
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
    for (let i = 0; i < 1; i++) {
        let imagenCarta = document.createElement("img");
        let carta = baraja.pop();
        imagenCarta.src = "./cartas/" + carta + ".png";
        //imagenCarta.classList.add('imagenCarta');
        puntosJugadorUno += getValue(carta);
        document.getElementById("cartaJugador1").append(imagenCarta);
    }
    //console.log(puntosJugadorUno);

    document.getElementById("btnUno").addEventListener("click", nuevaCarta);
}
//console.log(puntosJugadorUno);

function nuevaCarta() {
    if (!validarInicio) {
        return
    }
    let imagenCarta = document.createElement("img");
    let carta = baraja.pop();
    imagenCarta.src = "./cartas/" + carta + ".png";
    //imagenCarta.classList.add('imagenCarta');
    puntosJugadorUno += getValue(carta);
    document.getElementById("cartaJugador1").append(imagenCarta);
    console.log(puntosJugadorUno);
}
//console.log(puntosJugadorUno);
//se asigna valor a las cartas
function getValue(carta) {
    let datoCarta = carta;
    let value = datoCarta[0];
    if (value == 1) {
        return parseInt(10);
    } else {
        if (isNaN(value)) {
            if (value == "A") {//A J Q K validando el valor de A
                return 11;
            }
            return 10;
        }
        return parseInt(value);
    }
}

