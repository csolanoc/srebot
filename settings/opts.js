const opts = {
    options:{ debug: true},
    connection:{
        reconnect: true,
        secure: true
    },
    identity: {
        username: `${process.env.CHANNEL_NAME}`,
        password: `${process.env.AUTH_TOKEN}`
    },
    channels: [
        `${process.env.CHANNEL_NAME}`
    ]
};


module.exports = opts;
