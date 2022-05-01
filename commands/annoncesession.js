const { MessageEmbed } = require('discord.js');

module.exports.execute = (bot, message, args) => { 

  const embedval = 1
  let session = new MessageEmbed()
    .setTitle("`SESSION PROCHAINE à 00h00`")
    .setURL("https://discord.com/channels/969241276782366730/969241396273901598")
    .setColor("#ff00fa")
    .setDescription("`PSN DU LANCEUR :` \n**-BatteurVAL_NDEK** \n\n`HEURE DE LA SESSION :` \n**-28/04/2022 à 00h00** \n\n> - ❓ __Pour rejoindre la session RP__ : **Ajouter le PSN du lanceur** \n> -  ❗ __Ensuite allez dans la vocal__「🕹」attente-session __puis vous recevrez une invitation sur votre__ **TÉLÉPHONE GTA !** \n\n 👍・*présents* / 👎・*absent* \n\n`MESSAGE ADRESSE AUX :`" + "  <@&969241611441668156>")
    .setThumbnail("https://images-ext-2.discordapp.net/external/Q8IHiA6loTB2vdemw2wW-lBZFUHlc-jRaGxaS3RyV-Q/https/media.discordapp.net/attachments/925344779624124437/936310119535378512/avion-animation-dans-les-nuages.gif")
    .setAuthor(message.author.tag, message.author.avatarURL())
    .setFooter("")
    .setImage("https://cdn.discordapp.com/attachments/968971197301788703/969154599414018088/unknown.png")
  
  message.channel.send({ embeds: [session] });
 
}