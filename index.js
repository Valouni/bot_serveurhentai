const Discord = require('discord.js');
const djs = require('discord.js');
const client = require('discord.js');
const { Client, ReactionCollector, MessageEmbed } = require('discord.js');
const config = require('./config.js');

const bot = new djs.Client({  
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MEMBERS"
  ]
});

bot.on("ready", () => {
  function randomStatus() {
    let status = ["$helps", "Prefixe : $", "Problème ? = mp moi"]
    let rstatus = Math.floor(Math.random() * status.length);

    bot.user.setActivity(status[rstatus], {type: "WATCHING", url: "https://twitch.tv/"});
  }; setInterval(randomStatus, 1950)
});

bot.on("message", message => {
  if(message.member.permissions.has("GUILD_MESSAGES")){
    if(message.content.startsWith(config.prefix + "clear")){
      let args = message.content.split(" ");

      if(args[1] == undefined){
        message.reply("Nombre de message non ou mal défini");
      }
      else {
        let number = parseInt(args[1]); 

        if(isNaN(number)){
          message.reply("Nombre de message non ou mal défini"); 
        }
        else {
          message.channel.bulkDelete(number).then(messages => {
            console.log("Suppresion de " + messages.size + " messages réussi !");
          }).catch(err => {
            console.log("Erreur de clear : " + err);
          });
        }
      }
    }
  }
});

bot.on("guildMemberAdd", async member => {
 console.log("un membre est arrivé")
  let command = bot.channels.cache.get(config.arrivé).send("<@" + member.id + "> est arrivé dans le serveur !\n\n⚠️ Nous sommes maintenant **" + member.guild.memberCount + "** dans le serveur !");
  command.then((m) => {
    m.react('👋');
  })
  member.roles.add(config.role);
});

bot.on("message", message => {
  if(message.author.bot) return;
  if(message.channel.type == "dm") return;

  if(message.member.permissions.has("ADMINISTRATOR")){
    if(message.content.startsWith(config.prefix + "ban")){
      let mention = message.mentions.members.first();

      if(mention == undefined){
        message.reply("Membre non ou mal mentionné");
      }
      else {
        if(mention.bannable){
          mention.ban();
          message.channel.send(mention.displayName + " a été banni avec succès");
        }
        else {
          message.reply("Impossible de bannir ce membre");
        }
      }
    }
  }
});

bot.on('message', (message) => {
  let args = message.content.split(" ");
  let command = args.shift().toLowerCase();

  if(!command.startsWith(config.prefix)) return;

  switch(command) {
    case config.prefix + 'session':
      require('./commands/annoncesession.js').execute(bot, message, args);
      break;

    case config.prefix + 'helps':
      require('./commands/helps.js').execute(bot, message, args);
      break;
    default: break;
  }
});

var nbTicket = 0;

bot.on('ready', () => {
  var row = new Discord.MessageActionRow()
     .addComponents(new Discord.MessageButton()
        .setCustomId("open-ticket")
        .setLabel("🎟️ ouvrir un ticket")
        .setStyle("PRIMARY")
    );

  bot.channels.cache.get(config.ticket).send({content: "*Appuyez sur le boutton pour ouvrir un ticket 🎟️ !*", components: [row]});
  
  console.log(bot.user.username + ' is online.')
});

bot.on("interactionCreate", interaction => {
  if(interaction.isButton()){
    if(interaction.customId === "open-ticket"){
      nbTicket++;
      
      interaction.guild.channels.create("ticket-" + nbTicket, {
        parent: config.catégo}).then(channel => {
  
        var row = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
              .setCustomId("close-ticket")
              .setLabel(" 🔒 fermer le ticket")
              .setStyle("SUCCESS")                  
         );
        
        channel.send({content: "<@" + interaction.user.id + "> *Voici votre ticket, vous pouvez le fermer en appuyant sur le boutton ci-dessous 🔒 !*", components: [row]});  
      });
    }
    else if(interaction.customId === "close-ticket"){
      interaction.channel.setParent(config.catégoarchive);

      var row = new Discord.MessageActionRow()
      
        .addComponents(new Discord.MessageButton()
          .setCustomId("deleted-ticket")
          .setLabel("❌ supprimer le ticket")
          .setStyle("DANGER")
        );

      interaction.message.delete();

      interaction.channel.send({content: "*Cliquez ci-dessous pour supprimer ton ticket définitivement, ATTENTION ⚠️ , cette action est **__irréversible__** !*", components: [row]});

    interaction.reply({content: "le ticket a bien été archivé dans la catégorie : ARCHIVE", ephemeral: true});
    }
  else if(interaction.customId === "deleted-ticket"){
    interaction.channel.delete();
  }
    
  }

 });

bot.login(process.env.Token);