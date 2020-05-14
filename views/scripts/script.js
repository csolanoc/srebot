

document.addEventListener("DOMContentLoaded", function (event) {
    let title = document.getElementById("titulo").value;
    let game = document.getElementById("game").value
})


function seleccionar() {
    game = document.getElementById("listaHorario").value;
    document.getElementById("game").value = game;

}

function updateStream() {
    let newTitle = document.getElementById("titulo").value;
    let newGame = document.getElementById("game").value;
    document.location.href=`${document.location.href}updatestream/?title=${newTitle}&game=${newGame}`;
}

function updateTitulo() {
    let newTitle = document.getElementById("titulo").value;
    document.location.href=`${document.location.href}updatestream/title?title=${newTitle}`;
}

function updateGame() {
    let newGame = document.getElementById("game").value;
    document.location.href=`${document.location.href}updatestream/game?game=${newGame}`;
}
