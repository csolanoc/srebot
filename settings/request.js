const axios = require('axios');

//Authorization total: OAuth k585j6bg90wonurh2irmtadjhkcd7m//lvh20uqg1nexewrn6q8za4iudlp9na
//Client-ID ImRaino: sxga9ngmnuanb3bmu6hm3fo3bsmrjz
//CHANNEL_ID - ImRaino: 31869467
//CHANNEL_ID - SRE: 79774729
//Authorization SRE: ysdx47rpv0szvtqjxvuag3fke7dura
//Client-ID SRE: ciivl8nyetila7ul8p560t00i75bcu


const channel = `${process.env.CHANNEL_ID}`;
const channelName = `${process.env.CHANNEL_NAME}`;
const kraken = axios.create({
    baseURL: 'https://api.twitch.tv/kraken',
    headers: {
        'Accept': `${process.env.ACCEPT_REQUEST}`,
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
