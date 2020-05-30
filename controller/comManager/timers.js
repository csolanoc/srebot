const timers = require('./commandList');


function setTimers(client) {
    timers.commandList.forEach(timer => {
        if (timer.timer !== null) {
            if (timer.active === true) {
                timer.timerA = true;
                timer.timer = setInterval(() => {
                    return client.say(process.env.CHANNEL_NAME, timer.text);
                }, timer.time)
            }
        }
    });
}

module.exports = setTimers;