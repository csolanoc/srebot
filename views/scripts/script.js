let title;
let game;
let listName;
let listGame;

document.addEventListener("DOMContentLoaded", async function (event) {
    title = document.getElementById("titulo").value;
    game = document.getElementById("game").value;
    listName = document.getElementById("listaHorarioRunner").getElementsByTagName('option');
    listGame = document.getElementById("listaHorario").getElementsByTagName('option');
})


function seleccionar() {
    let baseTitle = `[ESP] Juegos Horribles Hechos Deprisa - Maratón de Speedruns Awful - `;
    let endTitle =  ` por `;
     
    game = document.getElementById("listaHorario").value;
    console.log(game);
    let i=0;
    for(i=0;i< listGame.length;i++){
        if(game === listGame[i].innerText){
            console.log(listGame[i].innerText);
            break;
        }
    }
    if(i===21)i=0;
    let titulo = baseTitle + listGame[i].innerText + endTitle + listName[i].innerText;
    document.getElementById("titulo").value = titulo;
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