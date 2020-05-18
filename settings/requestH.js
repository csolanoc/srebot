const axios = require('axios');

baseURLHoraro = 'https://horaro.org/-/api/v1';
baseURLOengus = 'https://oengus.io/api/marathon/';
const horario = axios.create({
    baseURL: `${baseURLOengus}`
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

module.exports = {horario, get, put};