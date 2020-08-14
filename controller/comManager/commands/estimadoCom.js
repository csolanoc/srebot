const axios = require('../../../settings/request');
const horarioRQ = require('../../../settings/requestH');
let coms = require('../commandList');
let scheduleUrl = `${process.env.HORARIO_URL}`;
let text = ``;
let horario;
let nw = horarioRQ.estimadoEdited;
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
          horarioRQ.estimadoEdited = true;
          nw = horarioRQ.estimadoEdited;
          return reply(`Se ha modificado el comando !${command.name}`);
        }
        break;
      }
      default: {
        nw = horarioRQ.estimadoEdited;
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
    let estimado = horario.data.items[horarioRQ.horaroCounter - 1].length_t / 60;
    estimadoEncoded = encodeURIComponent(estimado);
    if (nw === false) {
      return reply(`${text} ${decodeURIComponent(estimado)} minutos.`);
    } else {
      return reply(`${textComplete}`);
    }
  } catch (err) {
    console.error(err);
  }
}
