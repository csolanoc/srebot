const axios = require('../../../settings/request');
const horarioRQ = require('../../../settings/requestH');
let coms = require('../commandList');
const fs = require('fs');
let scheduleUrl = `${process.env.HORARIO_URL}`;
let text = ``;
let textComplete = text;
let nw = horarioRQ.categoriaEdited;
let horario;

module.exports = async ({ channel, tags, message, args, reply }) => {
  if(horarioRQ.active === false) return reply(`No se ha iniciado el horario`);
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
          horarioRQ.categoriaEdited = true;
          nw = horarioRQ.categoriaEdited;
          return reply(`Se ha modificado el comando !${command.name}`);
        }
        break;
      }

      default: {
        nw = horarioRQ.categoriaEdited;
        return update(horario, reply);
        break;
      }
    }
  }).catch(function (err){
    console.log('fallo al intentar la request hacia horaro.')
  })
}

function update(horario, reply) {
  let categoriaC;
  let categoriaIndex;
  try {
    for (let index = 0; index < horario.data.columns.length; index++) {
      if (horario.data.columns[index] === 'Categoría') {
        categoriaC = index;
      }
    }
    let categoria = horario.data.items[horarioRQ.horaroCounter - 1].data[categoriaC];
    if (categoria.startsWith('[')) {
      categoriaIndex = categoria.search(']');
      categoria = categoria.substring(1, categoriaIndex);
    }

    if (categoria[0] === '*' && categoria[1] === '*') {
      categoria = categoria.substring(2, horario.data.items[horarioRQ.horaroCounter - 1].data[categoriaC].length - 2);
    } else if (categoria[0] === '*') {
      categoria = categoria.substring(1, horario.data.items[horarioRQ.horaroCounter - 1].data[categoriaC].length - 1);
    }
    categoriaEncoded = encodeURIComponent(categoria);
    if (nw === false) {
      return reply(`${text} ${categoria}`);
    } else {
      return reply(`${textComplete}`);
    }
  } catch (err) {
    console.error(err);
  }
}
