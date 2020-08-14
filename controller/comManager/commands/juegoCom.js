const axios = require('../../../settings/request');

module.exports = async ({ channel, tags, message, args, reply }) => {
    if (tags.mod === true || tags['display-name'] === axios.channelName) {
        try {
            const com = message.split(' ');
            const params = message.substring(com[0].length + 1)
            if (params !== '') {
                const newGame = encodeURIComponent(params);
                if (changeGame(newGame)) {
                    return reply(`Se cambió el juego a ${decodeURIComponent(newGame)}.`);
                } else {
                    return reply(`No se pudo cambiar el juego.`);
                }
            } else {
                return reply(`Ingrese un juego válido.`);
            }
        } catch (err) {
            console.error(err);
        }
    } else {
        console.log("Viewer executed command.")
    }
}

function changeGame(game) {
    try {
      var query = `/channels/${axios.channel}?channel[game]=` + game;
      if (axios.put(query)) {
        return true;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }
