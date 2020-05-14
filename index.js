require('dotenv').config()
//tmi
const tmi = require('tmi.js');
const opts = require('./settings/opts');
const axios = require('./settings/request');
// const manager = require('./comManager/commandManager');
// const timers = require('../srebot/comManager/commandList');
// const commands = require('require-all')({
//     dirname : __dirname + '/commands',
//     recursive: true
// })


//tmi --- Creating client
const client = new tmi.client(opts);
const send = false;
// manager(client, send);

//tmi --- Connect to Twitch:
client.connect().then((addres, port) => {
});

//tmi --- Register our event handlers (defined below)
client.on('message', onMessageHandler);
if (client.on('connected', onConnectedHandler));


function onConnectedHandler(target, sender, msg, self, reply){
    if(self){return;}//Ignorar mensajes del bot.
    // setTimers(target, sender, msg, self, reply)
}

function onMessageHandler(target, sender, msg, self){
    if(self){return;} //Ignorar mensajes del bot.
}


//tmi --- Timer's Function
function setTimers(target, sender, msg, self, reply){
    console.log(timers.commandList);

    let timer = timers.commandList.find(n => n.name === 'redes');
    timer.timerA = true;
    timer.timer = setInterval(() => {
        return client.say(channel, `​Recuerda seguirnos en nuestras redes sociales para estar al tanto del evento y futuros eventos realizados por la comunidad - Twitter: https://twitter.com/speedrunespanol - Discord: https://discord.gg/4hrfa25 - Youtube: https://www.youtube.com/channel/UCHnjAF0-ZNCHWKqxzdfh0sw`);
    }, timer.time);
    timer = timers.commandList.find(n => n.name === 'discord');
    timer.timerA = true;
    timer.timer = setInterval(() => {
        return client.say(channel, `¡Entra al Discord de la comunidad! http://www.discord.gg/SRE`);
    }, timer.time);
    /*timer = timers.commandList.find(n => n.name === 'donaciones');
    timer.timerA = true;
    timer.timer = setInterval(() => {
        return client.say(channel, `¿Quieres mandar un donativo para Direct Relief? El donativo mínimo son $5, y puedes dirigirlos para un incentivo o sorteo que haya en el momento. Aquí tienes el enlace: https://gamesdonequick.com/tracker/ui/donate/crdq , ¡no olvides añadir [SRE] al principio de tu alias para ser leído por los anfitriones en nuestra retransmisión!`);
    }, timer.time);*/
    /*timer = timers.commandList.find(n => n.name === 'hashtag');
    timer.timerA = true;
    timer.timer = setInterval(() => {
        return client.say(channel, `¡No olvides dar Follow al canal, y compartir en Twitter bajo el hashtag #CRDQEspanol !`);
    }, timer.time);*/
    /*
    timer = timers.commandList.find(n => n.name === 'horario');
    timer.timerA = true;
    timer.timer = setInterval(() => {
        return client.say(channel, `Horario: ${horaroMan.horariolink}`);
    }, timer.time);*/
    timer = timers.commandList.find(n => n.name === 'info');
    timer.timerA = true;
    timer.timer = setInterval(() => {
        return client.say(channel, `SpeedrunsEspañol nos trae la segunda retransmisión oficial de la maratón online Speedruns Colombia, ¡donde se presentarán diferentes juegos por varios runners de la comunidad colombiana, durante 16 horas de transmisión continua!`);
    }, timer.time);
    /*
    timer = timers.commandList.find(n => n.name === 'coms');
    timer.timerA = true;
    timer.timer = setInterval(() => {
        return client.say(channel, `SpeedrunsEspañol nos trae de viernes a domingo la Retransmisión Oficial en Español de la nueva maratón de la GDQ: la Corona Relief Done Quick. Con objeto de luchar contra el COVID-19, la Games Done Quick organiza esta maratón online benéfica para Direct Relief. ¡Ven y quédate a disfrutar de los mejores speedrunners del mundo, peleando juntos por este enemigo común!`);
    }, 3500);*/
}


//------------------------------------------------------------------------------------------------------------



//HoraroManager
// const horaroMan = require('../srebot_col/horaro/horaroMan');

//------------------------------------------------------------------------------------------------------------

//Useful const
const channel = axios.channelName;

//------------------------------------------------------------------------------------------------------------

//Express
const express = require('express');
const app = express();


//Settings
app.set('appName','Bot Manager');
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

app.listen(app.get('port'), () =>{
    console.log(`Server on port: ${app.get('port')}`);
    console.log(process.env.BASE_URL)
})

//Middlewares
app.use(express.json());
app.use(express.static('views'));


//Routers
app.get('/',(request, response) =>{
    axios.kraken.get('/channels/31869467').then(function (res){
        let data = res.data;
        //console.log(data);
        response.render('index.ejs',{info: data});

    });
})

app.get('/updatestream?',(request, response) =>{
    let keys = [];
    for(const key in request.query){
        //console.log(key, request.query[key]);
        keys.push(key);
    }
    console.log(keys);
    axios.kraken.put(`/channels/31869467?channel[status]=${encodeURIComponent(request.query['title'])}&channel[game]=${encodeURIComponent(request.query['game'])}`).then(function (res){
        //console.log(res.data);
    })
    getDataToIndex(axios, response, 'updatestream.ejs');
})


app.get('/updatestream/game?', (request, response)=>{
    
    axios.kraken.put(`/channels/31869467?channel[game]=${encodeURIComponent(request.query['game'])}`).then(function (res){
        //console.log(res.data);
    })
    getDataToIndex(axios, response, 'updatestreamgame.ejs');
})

app.get('/updatestream/title?', (request, response)=>{
    let keys = [];
    for(const key in request.query){
        keys.push(key);
    }

    axios.kraken.put(`/channels/31869467?channel[status]=${encodeURIComponent(request.query['title'])}`).then(function (res){
        console.log(res.data);
    })

    getDataToIndex(axios, response, 'updatestreamtitle.ejs');
})


function getDataToIndex(axios, response, ejsString){
    axios.kraken.get('/channels/31869467').then(function (res){
        let data = res.data;
        response.render(ejsString,{info: data});
    });
}





