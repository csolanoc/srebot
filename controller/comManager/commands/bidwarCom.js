let timers = require('../commandList');
const axios = require('../../../settings/request');
let text = ``;
module.exports = async({channel, tags, message, args, reply}) =>{

    const com = message.split(' ');
    const command = timers.commandList.find(n => n.name === com[0].substring(1,com[0].length) || n.alias.includes(com[0].substring(1,com[0].length)));
    text = command['text'];
    const params = {
        comSec: com[1],
        paramSec: com[2]
    };
    switch (params['comSec']) {
        case '-t':{
            if(command.time === null){
                return reply(text);
            }else{
                if(command.timerA === true){
                    clearInterval(command.timer);
                    command.timerA = false;
                    return reply(`Se ha detenido el timer.`);
                }else{
                    command.timerA = true;
                    command.timer = setInterval(() => {
                        return reply(text);
                    }, command.time);
                }
            }
            break;
        }case '-e':{
            if (tags.mod === true || tags['display-name'] === axios.channelName) {
                text = message.substring(com[0].length+com[1].length+2);
                return reply(`Se ha modificado el comando !${command.name}`);
            }
            break;
        }

        default: {
            return reply(text);
            break;
        }
    }
}
