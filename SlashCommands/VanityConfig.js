const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
        
	async run(bot, interaction) {
        let text = interaction.options.getString('text')
        let role = interaction.options.getRole('role')
        let channel = interaction.options.getChannel('channel')

        bot.db.set(interaction.guild.id, {
            text,
            roleID: role.id,
            channelID: channel.id
        })

        interaction.reply({ content: `Config was saved!`, ephemeral: true })
	},

	config: {
        permission: 'ADMINISTRATOR'
		//adminOnly: true
	},
	
	data: new SlashCommandBuilder()
		.setName('vanity-config')
		.setDescription('Configure the vanity settings')
        .addStringOption(o => o
            .setName('text')
            .setDescription('The text to look for in the statuses')
            .setRequired(true)    
        )
        .addRoleOption(o => o
            .setName('role')
            .setDescription('The role which should be given to users with the text in their status')
            .setRequired(true)    
        )
        .addChannelOption(o => o
            .setName('channel')
            .setDescription('The channel where to send notifications about giving roles')
            .setRequired(true)  
            .addChannelTypes(0)  
        )
};