module.exports = async (bot) => {
    require('../Handlers/SlashCommands.js')(bot);

    let userCount = 0;
    for (const guild of bot.guilds.cache.values()) {
        userCount += guild.memberCount;
    }
    
    bot.user.setPresence({
        activity: {
          name: `over users presence`,
          type: 'WATCHING'
        },
        status: 'online'
    });

    console.log(`${bot.user.tag} is online and is ready to serve ${bot.guilds.cache.size} guilds and ${userCount} users.`);

    //setInterval(async function() {
    //    userCount = 0;
    //    for (const guild of bot.guilds.cache.values()) {
    //        userCount += guild.memberCount;
    //    }
    //    await bot.user.setPresence({
    //        activity: {
    //          name: `over ${userCount} users presence`,
    //          type: 'WATCHING'
    //        },
    //        status: 'online'
    //    });
    //    console.log(`${bot.user.tag} is online and is ready to serve ${bot.guilds.cache.size} guilds and ${userCount} users.`);
    //}, 10800 * 1000);
};
