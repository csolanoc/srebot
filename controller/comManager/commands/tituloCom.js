const axios = require('../../../settings/request');
const horario = require('../../../settings/requestH');
let baseTitle = encodeURIComponent(horario.baseTitle);
module.exports = async ({ channel, tags, message, args, reply }) => {
    console.log(axios.channelName);
    console.log(tags['display-name']);
    if (tags.mod === true || tags['display-name'] === axios.channelName) {
        try{
            const com = message.split(' ');
            const params = message.substring(com[0].length + 1);
            if(params !== ''){
                const newTitle = encodeURIComponent(params);
                if(changeTitle(newTitle)){
                    return reply(`Se cambió el titulo a ${decodeURIComponent(baseTitle)}${decodeURIComponent(newTitle)}.`);
                }else{
                    return reply(`No se pudo cambiar titulo`);
                }
            }else{
                return reply(`Por favor ingrese un titulo.`);
            }
        }catch(err){
            console.error(err);
        }
    } else {
        console.log("Viewer executed command.")
    }
}

function changeTitle(title) {
    let query = `/channels/${axios.channel}?channel[status]=${baseTitle}` + title;
    console.log(query);
      axios.kraken.put(query).then(function (response){
          return true;
      }).catch(function (err){
          return false;
      })
  }
