const axios = require('../../../settings/request');
const horarioRQ = require('../../../settings/requestH');
let coms = require('../commandList');
const fs = require('fs');
let scheduleUrl = `${process.env.HORARIO_URL}`;
let text;
let textComplete = text;
let nw = horarioRQ.comsEdited;
let horario;

module.exports = async ({ channel, tags, message, args, reply }) => {
  if (horarioRQ.active === false) return reply('El horario no ha iniciado.');

  //Solicitud desde la API de horaro, generando una promesa, la cual si no se cumple envia un mensaje de error en la consola (no en el chat).
  horarioRQ.horario.get(scheduleUrl).then(async function (response) {
    const com = message.split(' ');
    const command = coms.commandList.find(n => n.name === com[0].substring(1, com[0].length) || n.alias.includes(com[0].substring(1, com[0].length)));
    text = command['text'];
    horario = response.data;
    const params = {
      comSec: com[1],
      paramSec: com[2]
    };
    switch (params['comSec']) {
      case '-t': {
        if (tags.mod === true || tags['display-name'] === axios.channelName) {
          if (command.timerA === true) {
            clearInterval(command.timer);
            command.timerA = false;
            return reply(`Se ha detenido el timer.`);
          } else {
            command.timerA = true;
            command.timer = setInterval(() => {
              update(horario, reply);
            }, command.time);
          }
        }
        break;
      } case '-e': {
        if (tags.mod === true || tags['display-name'] === axios.channelName) {
          textComplete = message.substring(com[0].length + com[1].length + 2);
          horarioRQ.comsEdited = true;
          nw = horarioRQ.comsEdited;
          return reply(`Se ha modificado el comando !${command.name}`);
        }
        break;
      }

      default: {
        nw = horarioRQ.comsEdited;
        clearInterval(command.timer);
        command.timerA = true;
        command.timer = setInterval(() => {
          update(horario, reply);
        }, command.time);
        return update(horario, reply);
        break;
      }
    }
  }).catch((err)=>{
    console.log(err);
  })
}

function update(horario, reply) {
  let comentaristaC;
  let comentaristasIndex;
  try {
    for (let index = 0; index < horario.data.columns.length; index++) {
      if (horario.data.columns[index] === 'Comentaristas') {
        comentaristaC = index;
      }
    }

    let comentaristas = horario.data.items[horarioRQ.horaroCounter - 1].data[comentaristaC];
    if (comentaristas.startsWith('[')) {
      comentaristasIndex = comentaristas.search(']');
      comentaristas = comentaristas.substring(1, comentaristasIndex);
    }


    if (comentaristas[0] === '*' && comentaristas[1] === '*') {
      comentaristas = comentaristas.substring(2, horario.data.items[horarioRQ.horaroCounter - 1].data[comentaristaC].length - 2);
    } else if (comentaristas[0] === '*') {
      comentaristas = comentaristas.substring(1, horario.data.items[horarioRQ.horaroCounter - 1].data[comentaristaC].length - 1);
    }
    comentaristasEncoded = encodeURIComponent(comentaristas);

    if (nw === false) {
      return reply(`${text} ${decodeURIComponent(comentaristas)}`);
    } else {
      return reply(`${textComplete}`);
    }
  } catch (err) {
    console.error(err);
  }
}
