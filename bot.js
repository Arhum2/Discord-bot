console.log('beep beep');

require('dotenv').config();
const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');

const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });
client.login(process.env.BOTTOKEN);

client.on('ready', readyDiscord);

function readyDiscord() {
    console.log('heart');
}

client.on('message', gotMessage);

function gotMessage(msg) {
    console.log(msg.content);
    if (msg.content === 'choo choo') {
        msg.reply("Train");
    }
}
