console.log("Online");

require("dotenv").config();

const axios = require("axios");
const { Client, Intents, Message } = require("discord.js");
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
client.login(process.env.BOTTOKEN);

client.on("messageCreate", gotMessage);

async function gotMessage(msg) {
  console.log(msg.content);
  if (msg.content.startsWith("!stats")) {
    //taking user input and concatinating it with the API base url to fetch stats
    let url = "https://best-overwatch-api.herokuapp.com/player/";

    let text = msg.content;
    //console.log('TEXT:', text)

    let str = text.replace("!stats", "");
    //console.log('STR:', str)

    playerDetails = str.trim();
    //console.log('PLAYERDETAILS:', playerDetails)

    let result = url.concat(playerDetails);
    //console.log('RESULT:', result)

    axios
      .get(result)

      .then((res) => {
        var stringify = JSON.stringify(res.data);
        var parseData = JSON.parse(stringify);
        //console.log("stringify:", stringify);
        //console.log("parseData:", parseData);
        //console.log(parseData.username);
        //endorsement = JSON.stringify(parseData.endorsement)
        //console.log("ENDORSEMENT:", endorsement);

        //Comparing Endorsement levels
        S = parseData.endorsement.sportsmanship["rate"]
        //console.log("SPORTSMANSHIP:", S);
        SC = parseData.endorsement.shotcaller["rate"]
        //console.log("SHOTCALLER:", SC);
        T = parseData.endorsement.teammate["rate"]
        //console.log("TEAMMATE:", T);

        var endorsementlvl = parseData.endorsement.level
        if (endorsementlvl === null) {
            console.log("User endorsement level = null")
            endorsementlvl = ":"            
        } 
        
        var endorsementLevel
        if (S > SC) {
            endorsementLevel = ("Sportsmanship")
            rate = S
        } else if (SC > T) {
            endorsementLevel = ("Shot Caller")
            rate = SC
        } else {
            endorsementLevel = ("Team mate")
            rate = T
        }


        //Replying with stats
        msg.reply(`
        Your stats....
        Username: ${parseData.username}        
        Level: ${parseData.level} 
        Endorsement level${endorsementlvl}: ${endorsementLevel} (${rate/100*100}%)
        `)
      })


      //Catches errors
      .catch((err) => {
        console.log("ERR:", err);
      });
  }
}
