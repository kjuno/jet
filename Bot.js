const Discord = require("discord.js");
const client = new Discord.Client();

var prefix = '!';
var red = 0xef0202;
var green = green;
var fs = require('fs');
var json = JSON.parse(fs.readFileSync('./token.json', 'utf8'));

function createEmbed(string, color){
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

String.prototype.oneSplit = function(char){ 
    var arr = new Array(); 
    arr[0] = this.substring(0, this.indexOf(char)); 
    arr[1] = this.substring(this.indexOf(char) + 1); 
    return arr; 
}

Date.prototype.getDateAsString = 

client.on('ready', () => {
  console.log(`[INFO] Der Bot \"${client.user.username}\" ist bereit!`);
  client.user.setGame('mit seinen V8 Raketen');
});

client.on('message', msg => {
    if(msg.author == client.user) return;

    var content = msg.content.toLowerCase();
    var args = content.oneSplit(" ");
    var cmd = args[0];
    var channel = msg.channel;

    switch(cmd){
        case`${prefix}serverinfo`:
            var embed = new Discord.RichEmbed;
            embed.setTitle(`Infos über den Server: ${msg.guild.name}`);
            embed.addField("Server erstellt am:", getDateAsString(msg.guild.createdAt));
            embed.addField("AFKChannel:" , msg.guild.afkChannel);
            embed.addField("AFKTimeout;" , msg.guild.afkTimeout);
            embed.addField("Users:" , msg.guild.memberCount.toString());
            embed.addField("Owner:" , msg.guild.owner);
            embed.addField("Name:" , msg.guild.name);
            embed.setThumbnail(msg.guild.iconURL);
            embed.setColor(green);
            channel.send(embed);
            break;
        case`${prefix}prefix`:
            if(args[1] == undefined){
                channel.send(createEmbed('Bitte gib einen Prefix an!', red));
                return;
            }
            prefix = args[1];
            channel.send(createEmbed(`Prefix wurde in \"${prefix}\" geändert!`, green));
            break;
        case`${prefix}about`:
            var mention = msg.mentions.members.first();
            if(!mention){
                channel.send(createEmbed('Bitte gib einen User an!', red)); 
                return;
            }
            var embed = new Discord.RichEmbed;
            embed.setColor(green);
            embed.setTitle(`Infos über den Spieler: \"${mention.displayName}\"`)
            embed.addField("Name:", mention.user.username);
            embed.addField("Nickname:", mention.nickname == null ? 'keins' : mention.nickname);
            embed.addField("ID:", mention.id);
            embed.addField("Spielt gerade:", mention.user.presence.game == null ? 'nichts' : mention.user.presence.game.name);
            embed.addField("Account erstellt am:" , getDateAsString(mention.user.createdAt));
            embed.addField("Status:", mention.user.presence.status);
            embed.addField("Höchste Rolle:", mention.highestRole.name);
            embed.addField("Gejoint am:", getDateAsString(mention.joinedAt));
            embed.setThumbnail(mention.user.avatarURL);
            channel.send(embed);
            break;
    }
});

client.login(`${json.token}`);