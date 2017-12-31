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

function getDateAsString(date){
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    return day + "." + month + "." + year + " um " + hour + ":" + minutes + " Uhr";
}

client.on('ready', () => {
  console.log(`Der ${client.user.username} mit seinen V8 Raketen ist bereit!`);
  client.user.setGame('mit seinen V8 Raketen');
});

client.on('message', msg => {
    if(msg.author == client.user) return;

    var content = msg.content.toString();
    var args = content.split(' ', 2);
    var cmd = args[0];
    var channel = msg.channel;

    switch(cmd){
        case`${prefix}server`:
            var embed = new Discord.RichEmbed;
            embed.setTitle(`Infos über den Server: ${msg.guild.name}`);
            embed.addField("Server erstellt am:", getDateAsString(msg.guild.createdAt));
            embed.addField("AFKChannel:" , msg.guild.afkChannel);
            embed.addField("AFKTimeout;" , msg.guild.afkTimeout);
            embed.addField("Users:" , msg.guild.memberCount.toString());
            embed.addField("Owner:" , msg.guild.owner);
            embed.addField("Name:" , msg.guild.name);
            embed.setThumbnail(msg.guild.iconURL);
            embed.setColor(0x3adb1e);
            channel.send(embed);
            break;
        case`${prefix}prefix`:
            prefix = args[1];
            channel.send(embed(`Prefix wurde in \"${prefix}\" geändert!`, 0x3adb1e));
            break;
    }
});

client.login(`${json.token}`);