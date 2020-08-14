const axios = require('../../../settings/request');
const horarioRQ = require('../../../settings/requestH');
let coms = require('../commandList');
const fs = require('fs');
let scheduleUrl = `${process.env.HORARIO_URL}`;
let text = ``;
let textComplete = text;
let nw = horarioRQ.runnerEdited;
let horario;
let notHorario = !horarioRQ.active;

module.exports = async ({ channel, tags, message, args, reply }) => {

  if (horarioRQ.active === false) return reply(`No se ha iniciado el horario`);
  horarioRQ.horario.get(scheduleUrl).then(async function (response) {
    const com = message.split(' ');
    const command = coms.commandList.find(n => n.name === com[0].substring(1, com[0].length) || n.alias.includes(com[0].substring(1, com[0].length)));
    text = command['text'];
    const params = {
      comSec: com[1],
      paramSec: com[2]
    };

    let horario = response.data;

    switch (params['comSec']) {
      case '-e': {
        if (tags.mod === true || tags['display-name'] === axios.channelName) {
          textComplete = message.substring(com[0].length + com[1].length + 2);
          horarioRQ.runnerEdited = true;
          nw = horarioRQ.runnerEdited;
          return reply(`Se ha modificado el comando !${command.name}`);
        }
        break;
      }

      default: {
        nw = horarioRQ.runnerEdited;
        return update(horario, reply);
        break;
      }
    }
  }).catch(function (err){
    console.log('fallo al request de horaro.');
  })
}

function update(horario, reply) {
  let runnerC;
  let runnerIndex;
  try {
    for (let index = 0; index < horario.data.columns.length; index++) {
      if (horario.data.columns[index] === 'Runner/s') {
        runnerC = index;
      }
    }
    
    let runner = horario.data.items[horarioRQ.horaroCounter - 1].data[runnerC];
    if (runner.startsWith('[')) {
      runnerIndex = runner.search(']');
      runner = runner.substring(1, runnerIndex);
    }

    if (runner[0] === '*' && runner[1] === '*') {
      runner = runner.substring(2, horario.data.items[horarioRQ.horaroCounter - 1].data[runnerC].length - 2);
    } else if (runner[0] === '*') {
      runner = runner.substring(1, horario.data.items[horarioRQ.horaroCounter - 1].data[runnerC].length - 1);
    }
    runnerEncoded = encodeURIComponent(runner);

    if (nw === false) {
      return reply(`${text} ${decodeURIComponent(runner)}`);
    } else {
      return reply(`${textComplete}`);
    }
  } catch (err) {
    console.error(err);
  }
}
