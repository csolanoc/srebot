const axios = require('../../../settings/request');
const horarioRQ = require('../../../settings/requestH');
const { horaroCounter } = require('../../../settings/requestH');
let scheduleUrl = process.env.HORARIO_URL;
let baseTitle = encodeURIComponent(horarioRQ.baseTitle);
let channel = process.env.CHANNEL_NAME;
let text;

module.exports = async ({ channel, tags, message, args, reply }) => {
  // console.log(axios.channelName);
  // console.log(tags['display-name']);
  if (tags.mod === true || tags['display-name'] === axios.channelName) {
    horarioRQ.horario.get(scheduleUrl).then(async function (response) {
      const com = message.split(' ');
      const command = com[0];
      const params = {
        comSec: com[1],
        paramSec: com[2]
      };

      let horario = response.data;

      if (horarioRQ.horaroCounterMax === -1) {
        horarioRQ.horaroCounterMax = horario.data.items.length;
      }
      console.log(horarioRQ.horaroCounterMax);
      if (horarioRQ.horaroCounter === horarioRQ.horaroCounterMax) {
        horarioRQ.active = false;
        return reply(`No hay más juegos programados.`);
      }
      switch (params['comSec']) {
        case '-b': {
          if (horarioRQ.active === false) {
            return reply('El horario no ha iniciado, no puede devolver una programación.')
          } else {
            if (horarioRQ.horaroCounter !== 1) {
              horarioRQ.horaroCounter -= 2;
            } else {
              return reply(`No puede devolverse a la run ${horarioRQ.horaroCounter - 2}, no existe.`);
            }
            horarioRQ.comsEdited = false;
            horarioRQ.runnerEdited = false;
            horarioRQ.categoriaEdited = false;
            horarioRQ.estimadoEdited = false;
            update(horario, reply);
          }
          break;
        }
        case '-m': {
          horarioRQ.horaroCounter = params['paramSec'] - 1;
          if (horarioRQ.horaroCounter < 0 || horarioRQ.horaroCounter > horarioRQ.horaroCounterMax) {
            return reply(`La programación no existe, coloque una correcta entre 1 y ${horarioRQ.horaroCounterMax}`);
          } else {
            text = message.substring(com[0].length + com[1].length + 2).toLowerCase();
            horarioRQ.active = true;
            horarioRQ.comsEdited = false;
            horarioRQ.runnerEdited = false;
            horarioRQ.categoriaEdited = false;
            horarioRQ.estimadoEdited = false;
            updatexJuego(horario, text, reply);
          }
          break;
        }
        case '-mn': {
          horarioRQ.horaroCounter = params['paramSec'] - 1;
          if (horarioRQ.horaroCounter < 0 || horarioRQ.horaroCounter > horarioRQ.horaroCounterMax) {
            return reply(`La programación no existe, coloque una correcta entre 1 y ${horarioRQ.horaroCounterMax}`);
          } else {
            horarioRQ.active = true;
            horarioRQ.comsEdited = false;
            horarioRQ.runnerEdited = false;
            horarioRQ.categoriaEdited = false;
            horarioRQ.estimadoEdited = false;
            update(horario, reply);
          }
          break;
        }
        case '-e': {
          baseTitle = encodeURIComponent(message.substring(com[0].length + com[1].length + 2));
          //return reply(`Se ha modificado el comando !${command.name}`);
          break;
        }
        default: {
          horarioRQ.active = true;
          horarioRQ.comsEdited = false;
          horarioRQ.runnerEdited = false;
          horarioRQ.categoriaEdited = false;
          horarioRQ.estimadoEdited = false;
          update(horario, reply);
          // await nextRuns();
          break;
        }
      }
    })
  }
}

function update(horario, reply) {
  let juegoC;
  let hiddenC;
  let runnerC;
  let titleIndex;
  let gameIndex;
  let runnerIndex;
  try {
    for (let index = 0; index < horario.data.columns.length; index++) {
      if (horario.data.columns[index] === 'Juego') {
        juegoC = index;
      }
      if (horario.data.columns[index] === 'hiddenGame') {
        hiddenC = index;
      }
      if (horario.data.columns[index] === 'Runner/s') {
        runnerC = index;
      }
    }

    console.log(hiddenC);
    console.log(horarioRQ.horaroCounter);

    let game = horario.data.items[horarioRQ.horaroCounter].data[hiddenC];
    if (game.startsWith('[')) {
      gameIndex = game.search(']');
      game = game.substring(1, gameIndex);
    }

    let title = horario.data.items[horarioRQ.horaroCounter].data[juegoC];
    if (title.startsWith('[')) {
      titleIndex = title.search(']');
      title = title.substring(1, titleIndex);
    }

    let runner = horario.data.items[horarioRQ.horaroCounter].data[runnerC];
    if (runner.startsWith('[')) {
      runnerIndex = runner.search(']');
      runner = runner.substring(1, runnerIndex);
    }


    if (game.startsWith('**')) {
      game = game.substring(2, horario.data.items[horarioRQ.horaroCounter].data[juegoC].length - 2);
    } else if (game.startsWith('*')) {
      game = game.substring(1, horario.data.items[horarioRQ.horaroCounter].data[juegoC].length - 1);
    }

    if (title.startsWith('**')) {
      title = title.substring(2, horario.data.items[horarioRQ.horaroCounter].data[juegoC].length - 2);
    } else if (title.startsWith('*')) {
      title = title.substring(1, horario.data.items[horarioRQ.horaroCounter].data[juegoC].length - 1);
    }

    if (runner.startsWith('**')) {
      runner = runner.substring(2, horario.data.items[horarioRQ.horaroCounter].data[runnerC].length - 2);
    } else if (runner.startsWith('*')) {
      runner = runner.substring(1, horario.data.items[horarioRQ.horaroCounter].data[runnerC].length - 1);
    }

    let gameEncoded = encodeURIComponent(game);
    let runnerEncoded = encodeURIComponent(runner);
    let titleEncoded = encodeURIComponent(title);
    horarioRQ.horaroCounter++;
    if (currentRun(gameEncoded, runnerEncoded, titleEncoded, reply)) {
      console.log('Title changed.');
      console.log('Game changed.');
      horarioRQ.active = true;
    }
  } catch (err) {
    console.error(err);
  }
}

function currentRun(game, runner, title, reply) {
  var query = `/channels/${process.env.CHANNEL_ID}?channel[status]=` + encodeURIComponent(horarioRQ.baseTitle) + `${title} por ${runner}` + '&channel[game]=' + game;
  console.log(query);
  axios.kraken.put(query).then( function (response){
    reply(`Se cambió el titulo a ${decodeURIComponent(baseTitle)} ${decodeURIComponent(title)}`);
    reply(`Se cambió el juego a ${decodeURIComponent(game)}`);
    return true;
  }).catch(function (err){
    // console.error(err);
    console.log('fallo');
    return false;
  })
}

function updatexJuego(horario, juego, reply) {
  let juegoC;
  let runnerC;
  let hiddenC;
  let indexJ;
  for (let index = 0; index < horario.data.columns.length; index++) {
    if (horario.data.columns[index] === 'Juego') {
      juegoC = index;
    }
    if (horario.data.columns[index] === 'Runner/s') {
      runnerC = index;
    }
    if (horario.data.columns[index] === 'hiddenGame') {
      hiddenC = index;
    }
  }
  console.log("---------- "+ juego + " ----------")
  for (let index = 0; index < horario.data.items.length; index++) {
    let compare = horario.data.items[index].data[juegoC].toLowerCase();
    if (compare[0] === '*' && compare[1] === '*') {
      compare = compare.substring(2, compare.length - 2);
    } else if (compare[0] === '*') {
      compare = compare.substring(1, compare.length - 1);
    }

    if (compare.trim() === juego.trim()) {
      indexJ = index;
      break;
    }
  }
  horarioRQ.horaroCounter = indexJ;


  console.log(hiddenC);
  console.log(indexJ);

  let game = horario.data.items[horarioRQ.horaroCounter].data[hiddenC];
  if (game.startsWith('[')) {
    gameIndex = game.search(']');
    game = game.substring(1, gameIndex);
  }


  let title = horario.data.items[horarioRQ.horaroCounter].data[juegoC];
  if (title.startsWith('[')) {
    titleIndex = title.search(']');
    title = title.substring(1, titleIndex);
  }

  let runner = horario.data.items[horarioRQ.horaroCounter].data[runnerC];
  if (runner.startsWith('[')) {
    runnerIndex = runner.search(']');
    runner = runner.substring(1, runnerIndex);
  }

  if (game.startsWith('**')) {
    game = game.substring(2, horario.data.items[horarioRQ.horaroCounter].data[juegoC].length - 2);
  } else if (game.startsWith('*')) {
    game = game.substring(1, horario.data.items[horarioRQ.horaroCounter].data[juegoC].length - 1);
  }

  if (title.startsWith('**')) {
    title = title.substring(2, horario.data.items[horarioRQ.horaroCounter].data[juegoC].length - 2);
  } else if (title.startsWith('*')) {
    title = title.substring(1, horario.data.items[horarioRQ.horaroCounter].data[juegoC].length - 1);
  }

  if (runner.startsWith('**')) {
    runner = runner.substring(2, horario.data.items[horarioRQ.horaroCounter].data[runnerC].length - 2);
  } else if (runner.startsWith('*')) {
    runner = runner.substring(1, horario.data.items[horarioRQ.horaroCounter].data[runnerC].length - 1);
  }

  let gameEncoded = encodeURIComponent(game);
  let runnerEncoded = encodeURIComponent(runner);
  let titleEncoded = encodeURIComponent(title);
  horarioRQ.horaroCounter++;
  currentRun(gameEncoded, runnerEncoded, titleEncoded, reply);
}


// async function nextRuns() {
//   await horarioRQ.horario.get(process.env.HORARIO_URL).then(function (response) {
//       let juegoC;
//       let hor = response.data;

//       // console.log(hor);

//       for (let index = 0; index < hor.data.columns.length; index++) {
//           if (hor.data.columns[index] === 'Juego') {
//               juegoC = index;
//           }
//       }

//       horarioMax = hor.data.items.length;
//       let horaroCounter = horarioRQ.horaroCounter;
//       let nextRuns = [];

//       if (horarioMax - horaroCounter > 4) {
//           let title = hor.data.items[horaroCounter].data[juegoC];
//           let title2 = hor.data.items[horaroCounter + 1].data[juegoC];
//           let title3 = hor.data.items[horaroCounter + 2].data[juegoC];
//           let title4 = hor.data.items[horaroCounter + 3].data[juegoC];
//           if (title.startsWith('[')) {
//               titleIndex = title.search(']');
//               title = title.substring(1, titleIndex);
//           }
//           if (title2.startsWith('[')) {
//               titleIndex = title2.search(']');
//               title2 = title2.substring(1, titleIndex);
//           }
//           if (title3.startsWith('[')) {
//               titleIndex = title3.search(']');
//               title3 = title3.substring(1, titleIndex);
//           }
//           if (title4.startsWith('[')) {
//               titleIndex = title4.search(']');
//               title4 = title4.substring(1, titleIndex);
//           }
//           nextRuns.push(title);
//           nextRuns.push(title2);
//           nextRuns.push(title3);
//           nextRuns.push(title4);
//       }else if(horarioMax - horaroCounter > 3){
//           let title = hor.data.items[horaroCounter].data[juegoC];
//           let title2 = hor.data.items[horaroCounter + 1].data[juegoC];
//           let title3 = hor.data.items[horaroCounter + 2].data[juegoC];
//           if (title.startsWith('[')) {
//               titleIndex = title.search(']');
//               title = title.substring(1, titleIndex);
//           }
//           if (title2.startsWith('[')) {
//               titleIndex = title2.search(']');
//               title2 = title2.substring(1, titleIndex);
//           }
//           if (title3.startsWith('[')) {
//               titleIndex = title3.search(']');
//               title3 = title3.substring(1, titleIndex);
//           }
//           nextRuns.push(title);
//           nextRuns.push(title2);
//           nextRuns.push(title3);
//       }else if(horarioMax - horaroCounter > 2){
//           let title = hor.data.items[horaroCounter].data[juegoC];
//           let title2 = hor.data.items[horaroCounter + 1].data[juegoC];
//           if (title.startsWith('[')) {
//               titleIndex = title.search(']');
//               title = title.substring(1, titleIndex);
//           }
//           if (title2.startsWith('[')) {
//               titleIndex = title2.search(']');
//               title2 = title2.substring(1, titleIndex);
//           }
//           nextRuns.push(title);
//           nextRuns.push(title2);
//       }else{
//           let title = hor.data.items[horaroCounter].data[juegoC];
//           if (title.startsWith('[')) {
//               titleIndex = title.search(']');
//               title = title.substring(1, titleIndex);
//           }
//           if (title2.startsWith('[')) {
//               titleIndex = title2.search(']');
//               title2 = title2.substring(1, titleIndex);
//           }
//           nextRuns.push(title);
//       }

      

//       let salida = nextRuns.join("    ");

//       var fs = require('fs');
//       fs.writeFile('./nextRuns.txt', `${salida}`, function (err) {
//           // If an error occurred, show it and return
//           if (err) return console.error(err);
//           // Successfully wrote to the file!
//       });

//       console.log(salida);
//   })
// }