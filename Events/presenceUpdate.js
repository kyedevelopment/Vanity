const { MessageEmbed } = require("discord.js");

module.exports = async (bot, oldP, newP) => {
  if (!newP.guild) return;

  let serverDB = bot.db.get(newP.guild.id);
  if (!serverDB) return;

  let logChat = await bot.channels.fetch(serverDB.channelID).catch((err) => {
    // Send error message to server if the bot cannot access the logs channel
    const errorEmbed = new MessageEmbed()
      .setTitle("Error")
      .setDescription(`I could not get the logs channel (${serverDB.channelID}) in ${newP.guild.name}. Please re-run the config command and make sure that I have access to that channel.`)
      .setColor("#ff0000");
    newP.guild.fetchOwner().then((owner) => {
      owner.send({ embeds: [errorEmbed] }).catch((err) => {
        console.log(`Failed to send error message to guild owner: ${err}`);
      });
    }).catch((err) => {
        console.log(`Failed to fetch guild owner: ${err}`);
    });
    // Delete the guild's data from the database if the logs channel cannot be accessed
    bot.db.delete(newP.guild.id);
  });

  if (!newP.activities.length) return;

  let custom = newP.activities.find(a => a.type == 'CUSTOM')
  if(!custom) {
      if(newP.member.roles.cache.has(serverDB.roleID)){
          newP.member.roles.remove(serverDB.roleID)
            .then(() => {
              logChat?.send(bot.embed(`Could not find custom status in ${newP.user}'s presence. Removing <@&${serverDB.roleID}> role.`));
            })
            .catch(err => {
                console.log(err.message, '1');
                logChat?.send(bot.embed(`Could not remove <@&${serverDB.roleID}> role from ${newP.user}'s presence due to an error: ${err.message}`));
            })
      }
      return
  }

  if(!custom.state) return console.log('state')//, custom)
  //if(serverDB.text.some(t => custom.state.toLowerCase().includes(t))) {
  if(custom.state.toLowerCase().includes(serverDB.text.toLowerCase())) {
    if (!newP.member.roles.cache.has(serverDB.roleID)) {
        newP.member.roles.add(serverDB.roleID)
          .then(() => {
            logChat?.send(bot.embed(`**${newP.user} has added the discord server vanity "${serverDB.text}" to their status, they have automatically received queue priority.**`));
          })
          .catch(err => {
            console.log(err.message, '2');
            logChat?.send(bot.embed(`Could not add <@&${serverDB.roleID}> role to ${newP.user}'s presence due to an error: ${err.message}`));
      })
    }
  }else{
      if(newP.member.roles.cache.has(serverDB.roleID)){
          newP.member.roles.remove(serverDB.roleID)
          .then(() => {
            logChat?.send(bot.embed(`**${newP.user} has removed the discord server vanity "${serverDB.text}" from their status, they have lost their queue priority reward.**`));
          })
          .catch(err => {
            console.log(err.message, '3');
            logChat?.send(bot.embed(`Could not remove <@&${serverDB.roleID}> role from ${newP.user}'s presence due to an error: ${err.message}`));
          })
    }
  }
};
