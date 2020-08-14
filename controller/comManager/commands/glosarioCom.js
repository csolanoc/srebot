const axios = require('../../../settings/request');
// const horario = require('../horaro/horaroMan');
let timers = require('../commandList');
const fs = require('fs');
// let scheduleUrl = horario.schedule;
let hor;
let text = ``;

module.exports = async ({ channel, tags, message, args, reply }) => {
      const com = message.split(' ');
      const command = timers.commandList.find(n => n.name === com[0].substring(1,com[0].length) || n.alias.includes(com[0].substring(1,com[0].length)));
      text = command['text'];
      const params = {
        comSec: com[1],
        paramSec: com[2]
      };
    switch (params['comSec']) {
          case '-e':{
            if (tags.mod === true || tags['display-name'] === axios.channelName) {
                text = message.substring(com[0].length+com[1].length+2);
                return reply(`Se ha modificado el comando !${command.name}`);
            }
            break;
          }

          default: {
            return reply(`${text}`);
              break;
          }
      }
}
