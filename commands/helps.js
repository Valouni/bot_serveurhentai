const { MessageEmbed } = require('discord.js');

module.exports.execute = (bot, message, args) => { 
  const embedval = 1
  let helps = new MessageEmbed()
    .setTitle("`VOICI TOUTES LES COMMANDES DISPONIBLES :`")
    .setColor("#ff00fa")
    .setDescription("`PREFIX = $`")
    .addField("PREFIX + HELPS", "> *Permet de constater l'ensemble des commandes*")
    .addField("TICKET", "> *Le système de ticket est maintenat* \n> *à jour dans le salon*" + " <#970234408374247434>")
    .addField("PREFIX + BAN", "> *Permet de ban un membre, permissions d'__ADMIN__ requises*")
    .addField("PREFIX + CLEAR", "> *Permet de supprimer des messeges, permissions d'__ADMIN__ requises* ")
    .setThumbnail("")
    .setAuthor(message.author.tag, message.author.avatarURL())
    .setFooter("")
    .setImage("")  
  message.channel.send({ embeds: [helps] });

}