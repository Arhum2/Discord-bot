console.log("Online");

require("dotenv").config();
const { MessageEmbed } = require("discord.js");
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
        S = parseData.endorsement.sportsmanship["rate"];
        //console.log("SPORTSMANSHIP:", S);
        SC = parseData.endorsement.shotcaller["rate"];
        //console.log("SHOTCALLER:", SC);
        T = parseData.endorsement.teammate["rate"];
        //console.log("TEAMMATE:", T);

        var endorsementlvl = parseData.endorsement.level;
        if (endorsementlvl === null) {
          //console.log("User endorsement level = null")
          endorsementlvl = "level not found";
        } else {
          endorsementlvl = ` (${endorsementlvl})`;
        }

        var rank = parseData.competitive.rank;
        if (rank === null) {
          //console.log("User endorsement level = null")
          rank = "Rank not found";
        } else {
          rank = `(${rank})`;
        }

        var endorsementLevel;
        if (S > SC) {
          endorsementLevel = "Sportsmanship";
          rate = S;
        } else if (SC > T) {
          endorsementLevel = "Shot Caller";
          rate = SC;
        } else {
          endorsementLevel = "Team mate";
          rate = T;
        }

        played = parseData.games.quickplay.played;
        won = parseData.games.quickplay.won;

        rate_percent = (rate / 100) * 100;
        portrait = parseData.portrait;
        username = parseData.username;
        level = parseData.level;

        playtime = parseData.playtime.quickplay;

        compPlayTime = parseData.playtime.competitive
        compPlayed = parseData.games.competitive.played
        compWin = parseData.games.competitive.won
        compDraw = parseData.games.competitive.draw
        compLost = parseData.games.competitive.lost
        winRate = parseData.games.competitive.win_rate
        rankImg = parseData.competitive.rank_img

        const statsEmbed = new MessageEmbed()
          .setColor("f17909")
          .setTitle(`Here are ${username}'s stats!`)
          .setThumbnail(`${portrait}`)
          .addFields(
            { name: `Endorsement level (${endorsementlvl})`, value: `${endorsementLevel} (${rate_percent}%)`},
            { name: "\u200B", value: "\u200B" },
            { name: "Username", value: `${username}`, inline: true },
            { name: "Level", value: `${level}`, inline: true },
            { name: "Competitive rank", value: `${rank}`, inline: true },
            { name: "\u200B", value: "\u200B" },
            { name: "Quickplay playtime", value: `${playtime}`, inline: true },
            { name: "Games played", value: `${played}`, inline: true},
            { name: "Wins", value: `${won} (${Math.trunc((won / played) * 100)}% win rate)`},
            { name: "\u200B", value: "\u200B" },
            { name: "Competitive playtime", value: `${compPlayTime}`, inline: true},
            { name: "Rank", value: `${rank}`, inline: true},
            { name: "Games played", value: `${compPlayed}`, inline: true},
            { name: `Wins (${winRate} win rate)`, value: `${compWin}`, inline: true},
            { name: "Draws", value: `${compDraw}`, inline: true},
            { name: "Losses", value: `${compLost}`, inline: true},


          );

        msg.reply({ embeds: [statsEmbed] });

        // //Replying with stats
        // msg.reply(`
        // ${parseData.username}'s stats....
        // ${parseData.portrait}
        // Username: ${parseData.username}
        // Level: ${parseData.level}
        // Endorsement level${endorsementlvl}: ${endorsementLevel} (${
        //   (rate / 100) * 100
        // }%)

        // Quick play stats
        // Playtime: ${parseData.playtime.quickplay}
        // Games: ${played}
        // Wins: ${won} (${Math.trunc((won / played) * 100)}% win rate)

        // Competitive play stats
        // Playtime: ${parseData.playtime.competitive}
        // Rank: ${parseData.competitive.rank}
        // Games: ${parseData.games.competitive.played}
        // Wins: ${parseData.games.competitive.won}
        // Draws: ${parseData.games.competitive.draw}
        // Lost: ${parseData.games.competitive.lost}
        // Win rate: ${parseData.games.competitive.win_rate}
        // rank img: ${parseData.competitive.rank_img}

        // `);
      })

      //Catches errors
      .catch((err) => {
        console.log("ERR:", err);
      });
  }
}
