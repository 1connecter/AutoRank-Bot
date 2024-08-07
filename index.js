const Discord = require('discord.js');

const { GatewayIntentBits } = require('discord.js');

const client = new Discord.Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildPresences] });

const config = require('./config.json')

client.once('ready', () => {

    console.log(`${client.user.tag} est en ligne`);

});

client.on('messageCreate', (message) => {
    
    if (message.mentions.has(client.user)) {

      if (message.channel.id !== config.channel) return;
        
      if (message.author.displayName && message.author.displayName.includes(config.tag)) {

            const role = message.guild.roles.cache.get(config.role);

            if (role) {

                message.member.roles.add(role).then(() => {

                        message.channel.send(`<@${message.author.id}>, vous avez maintenant le rôle ${role.name}!`);

                    }).catch((error) => {

                        console.log(`Erreur : ${error}`);

                    });

            } else {

                message.channel.send("Erreur.");

            }

        } else {

            message.channel.send(`<@${message.author.id}>, vous n'avez pas le tag '${config.tag}' dans votre pseudo. Veuillez le mettre.`);

        }

    }

});

client.login(config.token);