require('dotenv').config()

//tmi
const tmi = require('tmi.js');
const opts = require('./settings/opts');
const axios = require('./settings/request');
const manager = require('./controller/comManager/commandManager');


// tmi --- Timer's Function
const timer = require('./controller/comManager/timers');


//tmi --- Creating client
const client = new tmi.client(opts);
const send = false;
manager.commandManag(client, send);

//tmi --- Connect to Twitch:
client.connect().then((addres, port) => {
});

//tmi --- Register our event handlers (defined below)
client.on('message', onMessageHandler);
if (client.on('connected', onConnectedHandler));


function onConnectedHandler(target, sender, msg, self, reply) {
    if (self) { return; }//Ignorar mensajes del bot.
    timer(client); //Llama funcion de timers y los inicializa
}

function onMessageHandler(target, sender, msg, self) {
    if (self) { return; } //Ignorar mensajes del bot.
}



//------------------------------------------------------------------------------------------------------------



//HoraroManager
// const horaroMan = require('../srebot_col/horaro/horaroMan');
const requestRQ = require('./settings/requestH');

//------------------------------------------------------------------------------------------------------------

//Useful const
const channel = axios.channelName;
let nextRuns = require('./layout/nextRuns.js');
// nextRuns().then((response)=>{
//     console.log(respuesta)
//     // requestRQ.nextRuns = response.data;
// }).catch((err) =>{
//     console.error(err);
// })

//------------------------------------------------------------------------------------------------------------

//Express
const express = require('express');
const app = express();


//Settings
app.set('appName', 'Bot Manager');
app.set('port', process.env.PORT || 8000);
app.set('view engine', 'ejs');

app.listen(app.get('port'), () => {
    console.log(`Server on port: ${app.get('port')}`);
    console.log(app.get('ip'));
    console.log(process.env.BASE_URL)
})

//Middlewares
app.use(express.json());
app.use(express.static('views'));


//Routers
app.get('/', (request, response) => {
    axios.kraken.get(`/channels/${process.env.CHANNEL_ID}`).then(function (res) {
        let data = res.data;
        //console.log(data);
        requestRQ.horario.get(process.env.HORARIO_URL).then(async function (res) {
            // console.log(response.data);
            let horaro = res.data;
            response.render('index.ejs', { info: data, horaro: horaro });
        })
    });
})

app.get('/bot', (request, response) => {
    axios.kraken.get(`/channels/${process.env.CHANNEL_ID}`).then(function (res) {
        let data = res.data;
        requestRQ.horario.get(process.env.HORARIO_URL).then(async function (res) {
            let horaro = res.data;            
            response.render('bot.ejs', { info: data, horaro: horaro, commands: manager.commands.commandList});
        })
    });
})

app.get('/updatestream?', (request, response) => {
    let keys = [];
    for (const key in request.query) {
        keys.push(key);
    }
    console.log(keys);
    axios.kraken.put(`/channels/${process.env.CHANNEL_ID}?channel[status]=${encodeURIComponent(request.query['title'])}&channel[game]=${encodeURIComponent(request.query['game'])}`).then(function (res) {
        //console.log(res.data);
    }).catch(function (err) {
        console.log('Error al intentar actualizar.');
    })
    getDataToIndex(axios, response, 'updatestream.ejs');
})


app.get('/updatestream/game?', (request, response) => {

    axios.kraken.put(`/channels/${process.env.CHANNEL_ID}?channel[game]=${encodeURIComponent(request.query['game'])}`).then(function (res) {
    }).catch(function (err) {
        console.log('Error al intentar actualizar.');
    })
    getDataToIndex(axios, response, 'updatestreamgame.ejs');
})

app.get('/updatestream/title?', (request, response) => {
    let keys = [];
    for (const key in request.query) {
        keys.push(key);
    }

    axios.kraken.put(`/channels/${process.env.CHANNEL_ID}?channel[status]=${encodeURIComponent(request.query['title'])}`).then(function (res) {
        console.log(res.data);
    }).catch(function (err) {
        console.log('Error al intentar actualizar.');
    })

    getDataToIndex(axios, response, 'updatestreamtitle.ejs');
})


function getDataToIndex(axios, response, ejsString) {
    axios.kraken.get(`/channels/${process.env.CHANNEL_ID}`).then(function (res) {
        let data = res.data;
        response.render(ejsString, { info: data });
    });
}






app.get('/layout', (request, response) => {
    nextRuns().then((respuesta)=>{
        // console.log(respuesta)
        response.render('sgdq2020.ejs', {nextRuns: respuesta, horarioCounter:requestRQ.horaroCounter, horarioMax: requestRQ.horaroCounterMax});
    }).catch((err) =>{
        console.log(err);
    });
})






