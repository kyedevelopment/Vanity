const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	async run(bot, interaction) {
        let serverDB = bot.db.get(interaction.guild.id);

        if (!serverDB) {
            return interaction.reply({ content: "No configuration data found for this server.", ephemeral: true });
        }

        const configEmbed = new MessageEmbed()
            .setTitle("Server Vanity Configuration")
            .addFields(
                { name: "Text to look for", value: serverDB.text },
                { name: "Role to give", value: `<@&${serverDB.roleID}>` },
                { name: "Channel to send notifications", value: `<#${serverDB.channelID}>` }
            )
            .setColor("#00ff00");

        interaction.reply({ embeds: [configEmbed], ephemeral: true });
	},

	config: {
        permission: 'ADMINISTRATOR'
	},

	data: new SlashCommandBuilder()
		.setName('show-config')
		.setDescription('Show the current vanity configuration for the server')
};
