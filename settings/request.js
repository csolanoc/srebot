const axios = require('axios');

//Authorization total: OAuth k585j6bg90wonurh2irmtadjhkcd7m//lvh20uqg1nexewrn6q8za4iudlp9na
//Authorization SRE: ysdx47rpv0szvtqjxvuag3fke7dura

const channel = `${process.env.CHANNEL_ID}`;
const channelName = `${process.env.CHANNEL_NAME}`;
const kraken = axios.create({
    baseURL: 'https://api.twitch.tv/kraken',
    headers: {
        'Accept': 'rhinobot/vnd.twitchtv.v5+json',
        'Authorization': `OAuth ${process.env.AUTH_TOKEN}`,
        'Client-ID': `${process.env.CLIENT_ID}`
    }
});

function get(url) {
    var result = kraken.get(url).then(function (response) {
        console.log(response.data);
    });
}

function put(url) {
    var result = kraken.put(url).then(function (response) {
        console.log(response.data);
    });
    return true;
}

module.exports = { kraken, get, put, channel, channelName};
