const Discord = require("discord.js");
const client = new Discord.Client();

var prefix = '!';
var fs = require('fs');
var json = JSON.parse(fs.readFileSync('./token.json', 'utf8'));

function embed(string, color){
    var embed = new Discord.RichEmbed();
    embed.setDescription(string);
    embed.setColor(color);
    return embed;
}

client.on('ready', () => {
  console.log(`Bot ist einsatzbereit! ${client.user.username}`);
});

client.on('message', msg => {
    if(msg.author == client.user) return;

    var content = msg.content.toString();
    var args = content.split(' ', 2);
    var cmd = args[0];
    var channel = msg.channel;

    switch(cmd){
        case`${prefix}server`:
            channel.send(embed(`Servername: ${msg.guild.name}`, 0x3adb1e));
            break;
        case`${prefix}prefix`:
            prefix = args[1];
            channel.send(`Prefix wurde in \"${prefix}\" geändert!`)
            break;
    }
});

client.login(`${json.token}`);