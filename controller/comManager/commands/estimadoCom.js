const axios = require('../../../settings/request');
const horarioRQ = require('../../../settings/requestH');
let coms = require('../commandList');
let scheduleUrl = `${process.env.HORARIO_URL}`;
let text = ``;
let horario;
let nw = false;
let textComplete = text;

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

    horario = response.data;
    switch (params['comSec']) {
      case '-e': {
        if (tags.mod === true || tags['display-name'] === axios.channelName) {
          textComplete = message.substring(com[0].length + com[1].length + 2);
          nw = !nw;
          return reply(`Se ha modificado el comando !${command.name}`);
        }
        break;
      }
      default: {
        return update(horario, reply);
      }
    }
  }).catch(function (err){
    console.log('fallo solicitud a horaro');
  })
}

function update(horario, reply) {
  let estimadoC;
  let estimadoIndex;
  try {
    /*
    for (let index = 0; index < hor.data.columns.length; index++) {
      if(hor.data.columns[index] === 'Estimado'){
        estimadoC = index;
      }
    }*/
    let estimado = horario.data.items[horarioRQ.horaroCounter - 1].length_t / 60;
    /*
    if(estimado.startsWith('[')){
      estimadoIndex = estimado.search(']');
      estimado = estimado.substring(1, estimadoIndex);
    }*/

    /*
    if(estimado[0] === '*' && estimado[1] === '*'){
      estimado = estimado.substring(2, hor.data.items[horario.horaroCounter-1].data[estimadoC].length-2);
    }else if(estimado[0] === '*'){
        estimado = estimado.substring(1, hor.data.items[horario.horaroCounter-1].data[estimadoC].length-1);
    }*/

    estimadoEncoded = encodeURIComponent(estimado);
    if (nw === false) {
      return reply(`${text} ${decodeURIComponent(estimado)} minutos.`);
    } else {
      return reply(`${textComplete} .`);
    }
  } catch (err) {
    console.error(err);
  }
}
