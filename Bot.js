const Discord = require("discord.js");
const client = new Discord.Client();

var prefix = '!';
var fs = require('fs');
var json = JSON.parse(fs.readFileSync('./token.json', 'utf8'));

client.on('ready', () => {
  console.log(`Bot ist einsatzbereit! ${client.user.username}`);
});

client.on('message', msg => {
    if(msg.author == client.user) return;

    var content = msg.content.toString();
    var cmd = content.split(' ')[0];
    var channel = msg.channel;

    switch(cmd){
        case`${prefix}ping`:
            channel.send('Pong!');
            break;
    }
});

client.login(`${json.token}`);