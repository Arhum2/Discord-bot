console.log('beep beep');

const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.login('OTQxMjExMzMwMTY4MzY5MTYy.YgSpWw.ZzN3cLzKgKA_r0OfCvW4Cf2htTs');

client.on('ready', readyDiscord);

function readyDiscord() {
    console.log('heart');
}

client.on('message', gotMessage);

function gotMessage(msg) {
    console.log(msg.content);
}