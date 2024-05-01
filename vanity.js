const Discord = require('discord.js');
const bot = new Discord.Client({ 
    failIfNotExists: false,
    partials: ["CHANNEL"],
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_PRESENCES", "DIRECT_MESSAGES", "GUILD_VOICE_STATES", "DIRECT_MESSAGE_REACTIONS", "GUILD_MESSAGE_REACTIONS", "GUILD_INVITES"] 
});

bot.config = require('./Config.json');
bot.commands = new Discord.Collection();
bot.slashCommands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.buttons = new Discord.Collection()
bot.cooldowns = new Discord.Collection();

bot.db = require('quick.db')

require('./Handlers/Commands.js')(bot);
require('./Handlers/Buttons.js')(bot);
require('./Handlers/Events.js')(bot);

bot.embed = (m) => {
    const embed = new Discord.MessageEmbed()
        .setTitle("Vanity | Status Bot")
        //.setThumbnail('https://cdn.discordapp.com/avatars/1030745012847247472/dc47ce5850a3d7d1e11d905811461acf.webp')
        .setDescription(m)
        .setColor('WHITE')
        //.setFooter({text: 'Kye.Dev | discord.gg/kye 😎', iconURL: 'https://cdn.discordapp.com/avatars/1030745012847247472/dc47ce5850a3d7d1e11d905811461acf.webp'})
        .setTimestamp();

    return { embeds: [embed] }
}

bot.login(bot.config.token);
