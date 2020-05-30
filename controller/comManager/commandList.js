// const command = require('./command');
let list = [];
let commandList = [
    {
        name: 'followers',
        alias: ['follows'],
        permissionLevel: 'subUp',
        action: null,
        active: false,
        timerA: false,
        timer: null,
        params: null,
        time: null,
        note: 'retorna la cantidad de seguidores que tiene el canal.',
        last_invoc: Date.now(),
        cd: 5000,
        text: ''
    },
    {
        name: 'hola',
        alias: ['saludar', 'hello'],
        permissionLevel: 'else',
        action: null,
        active: false,
        timerA: false,
        timer: null,
        params: null,
        time: null,
        note: 'retorna un saludo al que lo invoco.',
        last_invoc: Date.now(),
        cd: 5000,
        text: ''
    },
    {
        name: 'dado',
        alias: ['dado'],
        permissionLevel: 'else',
        action: null,
        active: false,
        timerA: false,
        timer: null,
        params: null,
        time: null,
        note: 'retorna numero aleatorio entre 1 y 6.',
        last_invoc: Date.now(),
        cd: 5000,
        text: ''
    },
    {
        name: 'titulo',
        alias: ['changeTitle', 'cambiarTitulo'],
        permissionLevel: 'modUp',
        action: null,
        active: true,
        timerA: false,
        timer: null,
        params: ['titulo', '-e'],
        time: null,
        note: 'cambia el titulo del stream al nombre brindado',
        last_invoc: Date.now(),
        cd: 5000,
        text: ''
    },
    {
        name: 'juego',
        alias: ['changeGame', 'cambiarjuego', 'cambiarGame','changejuego'],
        permissionLevel: 'modUp',
        action: null,
        active: true,
        timerA: false,
        timer: null,
        params: ['game', '-e'],
        time: null,
        note: 'cambia el juego al nombre brindado',
        last_invoc: Date.now(),
        cd: 5000,
        text: ''
    },
    {
        name: 'siguiente',
        alias: ['change', 'siguenterun'],
        permissionLevel: 'modUp',
        action: null,
        active: true,
        timerA: false,
        timer: null,
        params: ['-b', '-m', '-e'],
        time: null,
        note: 'cambia el juego y titulo dado un horaro. params: -b: retrocede en uno el juego y titulo dado un horario. -m: coloca la programación manualmente dado el numero de ella.',
        last_invoc: Date.now(),
        cd: 5000,//15000
        text: ''
    },
    {
        name: 'updateh',
        alias: ['updateHorario'],
        permissionLevel: 'modUp',
        action: null,
        active: false,
        timerA: false,
        timer: null,
        params: null,
        time: null,
        note: 'Actualiza el JSON del horario',
        last_invoc: Date.now(),
        cd: 15000,
        text: ''
    },
    {
        name: 'list',
        alias: ['comandos', 'commandsList', 'listaCom', 'lista'],
        permissionLevel: 'else',
        action: null,
        active: true,
        timerA: false,
        timer: null,
        params: null,
        time: null,
        note: 'muestra la lista de comandos actual.',
        last_invoc: Date.now(),
        cd: 15000,
        text: ''
    },
    {
        name: 'runner',
        alias: ['runners', 'jugador', 'jugadores', 'player', 'players'],
        permissionLevel: 'else',
        action: null,
        active: true,
        timerA: false,
        timer: null,
        params: ['-e'],
        time: null,
        note: 'muestra el runner actual.',
        last_invoc: Date.now(),
        cd: 15000,
        text: 'Runner/s: '
    },
    {
        name: 'coms',
        alias: ['comentaristas', 'comentario', 'comentarista'],
        permissionLevel: 'else',
        action: null,
        active: true,
        timerA: false,
        timer: setInterval,
        params: ['-t', '-e'],
        time: 1.98e+6,//1.38e+6
        note: 'cada 33 minutos muestra comentaristas actuales',
        last_invoc: Date.now(),
        cd: 5000,
        text: 'Comentaristas:'
    },
    {
        name: 'redes',
        alias: ['social'],
        permissionLevel: 'else',
        action: null,
        active: true,
        timerA: false,
        timer: setInterval,
        params: ['-t'],
        time: 3.66e+6,//3.06e+6
        note: 'cada 61 minutos muestra las redes sociales de SRE',
        last_invoc: Date.now(),
        cd: 5000,
        text: 'Recuerda seguirnos en nuestras redes sociales para estar al tanto del evento y futuros eventos realizados por la comunidad - Twitter: https://twitter.com/speedrunespanol - Discord: https://discord.gg/4hrfa25 - Youtube: https://www.youtube.com/channel/UCHnjAF0-ZNCHWKqxzdfh0sw'
    },
    {
        name: 'discord',
        alias: ['disc'],
        permissionLevel: 'else',
        action: null,
        active: true,
        timerA: false,
        timer: setInterval,
        params: ['-t'],
        time: 2.4e+6,//1.8e+6
        note: 'cada 40 minutos muestra el enlace al discord de SRE',
        last_invoc: Date.now(),
        cd: 5000,
        text: '¡Entra al Discord de la comunidad! http://www.discord.gg/SRE'
    },
    {
        name: 'horario',
        alias: ['horarios', 'horaro', 'schedule', 'bracket', 'brackets'],
        permissionLevel: 'else',
        action: null,
        active: true,
        timerA: false,
        timer: setInterval,
        params: ['-t'],
        time: 2.52e+6, //1.8e+6
        note: 'cada 42 minutos muestra el enlace al horario',
        last_invoc: Date.now(),
        cd: 5000,
        text: `Horario: ${process.env.HORARIO_LINK}`
    },
    {
        name: 'hashtag',
        alias: ['schedule'],
        permissionLevel: 'else',
        action: null,
        active: false,
        timerA: false,
        timer: setInterval,
        params: ['-t'],
        time: 1.98e+6,
        note: 'cada 33 minutos muestra el hashtag usado en twitter para el evento',
        last_invoc: Date.now(),
        cd: 5000,
        text: '¡No olvides dar Follow al canal, y compartir en Twitter bajo el hashtag #CRDQEspanol !'
    },
    {
        name: 'info',
        alias: ['informacion', 'informaciones', 'information'],
        permissionLevel: 'else',
        action: null,
        active: true,
        timerA: false,
        timer: setInterval,
        params: ['-t'],
        time: 2.82e+6,//2.58e+6
        note: 'cada 47 minutos muestra la informacion del evento',
        last_invoc: Date.now(),
        cd: 5000,
        text: `SpeedrunsEspañol presenta: Juegos Horribles Hechos Deprisa, la maratón de juegos awful donde runners de la comunidad enseñaran juegos increíbles, ¡durante 12 horas de transmisión continua!`
    },
    {
        name: 'donaciones',
        alias: ['donacion', 'donar', 'donate', 'donation'],
        permissionLevel: 'else',
        action: null,
        active: false,
        timerA: false,
        timer: setInterval,
        params: ['-t'],
        time: 1.5e+6,
        note: 'cada 25 minutos muestra el enlace para donar al evento',
        last_invoc: Date.now(),
        cd: 5000,
        text: '¿Quieres mandar un donativo para Direct Relief? El donativo mínimo son $5, y puedes dirigirlos para un incentivo o sorteo que haya en el momento. Aquí tienes el enlace: https://gamesdonequick.com/tracker/ui/donate/crdq , ¡no olvides añadir [SRE] al principio de tu alias para ser leído por los anfitriones en nuestra retransmisión!'
    },
    {
        name: 'twitter',
        alias: [],
        permissionLevel: 'else',
        action: null,
        active: true,
        timerA: false,
        timer: setInterval,
        params: ['-t'],
        time: 1.5e+6,
        note: 'cada 25 minutos muestra el enlace del twitter',
        last_invoc: Date.now(),
        cd: 5000,
        text: `Twitter de la comunidad: http://www.twitter.com/SpeedrunEspanol.`
    },
    {
        name: 'feedback',
        alias: [],
        permissionLevel: 'else',
        action: null,
        active: false,
        timerA: false,
        timer: null,
        params: null,
        time: null,
        note: 'muestra el discord de SRE.',
        last_invoc: Date.now(),
        cd: 5000,
        text: ''
    },
    {
        name: 'original',
        alias: [],
        permissionLevel: 'else',
        action: null,
        active: false,
        timerA: false,
        timer: null,
        params: null,
        time: null,
        note: 'muestra el stream original.',
        last_invoc: Date.now(),
        cd: 5000,
        text: ''
    },
    {
        name: 'wr',
        alias: [],
        permissionLevel: 'else',
        action: null,
        active: true,
        timerA: false,
        timer: null,
        params: null,
        time: null,
        note: 'muestra pagina de speedrun.com para hallar wr.',
        last_invoc: Date.now(),
        cd: 5000,
        text: ''
    },
    {
        name: 'ñ',
        alias: [],
        permissionLevel: 'else',
        action: null,
        active: true,
        timerA: false,
        timer: null,
        params: null,
        time: null,
        note: 'ñ',
        last_invoc: Date.now(),
        cd: 5000,
        text: ''
    },
    {
        name: 'bidwar',
        alias: ['bidwars','apuesta','apuestas'],
        permissionLevel: 'else',
        action: null,
        active: false,
        timerA: false,
        timer: null,
        params: null,
        time: null,
        note: 'Muestra el enlace a las bidwars',
        last_invoc: Date.now(),
        cd: 5000,
        text: ''
    },
    {
        name: 'estimado',
        alias: [],
        permissionLevel: 'else',
        action: null,
        active: true,
        timerA: false,
        timer: null,
        params: null,
        time: null,
        note: 'Muestra el estimado de la run',
        last_invoc: Date.now(),
        cd: 5000,
        text: `Estimado: `
    },
    {
        name: 'categoria',
        alias: ['categoría', 'categorías', 'categorias', 'category'],
        permissionLevel: 'else',
        action: null,
        active: true,
        timerA: false,
        timer: null,
        params: null,
        time: null,
        note: 'Muestra la cateogoría actual',
        last_invoc: Date.now(),
        cd: 5000,
        text: `Categoría:`
    },
    {
        name: 'glosario',
        alias: [],
        permissionLevel: 'else',
        action: null,
        active: true,
        timerA: false,
        timer: null,
        params: null,
        time: null,
        note: 'Muestra el enlace a el glosario',
        last_invoc: Date.now(),
        cd: 5000,
        text: ''
    },
];

function commandsNames(){
    commandList.forEach(command => {
        if(command.active === true)
            list.push(command.name);
    });
    return list;
}

module.exports = {commandList, commandsNames};
