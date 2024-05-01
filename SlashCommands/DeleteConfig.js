const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	async run(bot, interaction) {
        try {
          const guildId = interaction.guild.id;
          if (!bot.db.has(guildId)) {
            return interaction.reply({
              content: 'You do not have any config data stored!',
              ephemeral: true,
            });
          }
          bot.db.delete(guildId);
          interaction.reply({
            content: 'Your config data has been deleted!',
            ephemeral: true,
          });
        } catch (error) {
          console.error(error);
          interaction.reply({
            content: 'An error occurred while deleting your config data!',
            ephemeral: true,
          });
        }
    },

    config: {
		permission: 'ADMINISTRATOR'
	},

	data: new SlashCommandBuilder()
		.setName('delete-config')
		.setDescription('Delete your vanity config data'),
};
