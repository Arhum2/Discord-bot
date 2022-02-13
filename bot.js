console.log('beep beep');

require('dotenv').config();

const fetch = import('node-fetch');
const { Client, Intents } = require('discord.js');

const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });
client.login(process.env.BOTTOKEN);


client.on('message', gotMessage);

async function gotMessage(msg) {
    console.log(msg.content);
    if (msg.content === 'choo choo') {
        msg.reply("Train");
    } else if (msg.content == '!hero') {
        msg.channel.send('gif!');

        let url = `https://best-overwatch-api.herokuapp.com/`

        let response = await fetch(url);
        let json = await response.json();
        console.log(json);

    }
}
