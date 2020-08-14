const axios = require('axios');

// Info importante para la solicitud
baseURLHoraro = 'https://horaro.org/-/api/v1';
baseURLOengus = 'https://oengus.io/api/marathon/';
const horario = axios.create({
    baseURL: `${baseURLHoraro}`
})

function get(url) {
    var result = horario.get(url).then(function (response) {
        console.log(response.data);
        return response.data;
    });
}

function put(url) {
    var result = horario.put(url).then(function (response) {
        console.log(response.data);
        return response.data;
    });
}


// Info para el horario
let horaroCounter = 0;
let horaroCounterMax = -1;
let active = false;
let nextRuns = [];
baseTitle = `${process.env.STREAM_TITLE}`;
let comsEdited = false;
let runnerEdited = false;
let categoriaEdited = false;
let estimadoEdited = false;




// Exportar informacion
module.exports = {horario, get, put, baseURLHoraro, baseTitle, horaroCounter, horaroCounterMax, active, nextRuns, comsEdited, runnerEdited, categoriaEdited, estimadoEdited};



