console.log('Online');

require('dotenv').config();

const axios = require('axios')
const { Client, Intents, Message } = require('discord.js');
const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });
client.login(process.env.BOTTOKEN);


client.on('messageCreate', gotMessage);

async function gotMessage(msg) {
    console.log(msg.content)
    if (msg.content.startsWith('!stats')) {
        //taking user input and concatinating it with the API base url to feth stats
        let url = "https://best-overwatch-api.herokuapp.com/player/";

        let text = msg.content
        //console.log('TEXT:', text)
        
        let str = text.replace("!stats", "")
        //console.log('STR:', str)

        playerDetails = str.trim()
        //console.log('PLAYERDETAILS:', playerDetails)
        
        let result = url.concat(playerDetails)
        //console.log('RESULT:', result)
        
        axios.get(result)
        
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
