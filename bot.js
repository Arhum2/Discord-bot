console.log('Online');

require('dotenv').config();

const axios = require('axios')
const { Client, Intents, Message } = require('discord.js');
const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });
client.login(process.env.BOTTOKEN);


client.on('messageCreate', gotMessage);

async function gotMessage(msg) {
    console.log(msg.content)
    if (msg.content === '!stats') {
        axios.get('https://best-overwatch-api.herokuapp.com/player/pc/us/JustArhum-1494')
        
            .then((res) => {
                msg.reply('working')
                var stringify = (JSON.stringify(res.data));
                var parseData = JSON.parse(stringify);
                console.log('stringify:', stringify);
                console.log('parseData:', parseData);
                console.log(parseData.username);

            })
            .catch((err) => {
            console.log("ERR:", err)
            })
    }
}
