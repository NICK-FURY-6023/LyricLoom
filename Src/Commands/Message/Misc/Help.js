module.exports = new Object({
    name: "help",
    description: "Shows bot’s help panel.",
    category: "Misc",
    usage: "",
    cooldown: 10,
    usage: "[command_name]",
    aliases: ['h', 'commands', 'cmds'],
    examples: ["help", "help play", "help p"],
    sub_Commands: [],
    args: false,
    permissions: {
        client: [],
        user: [],
        dev: false,
    },
    player: { voice: false, active: false, dj: false, },
    /**
     * 
     * @param {import("../../../Saavan")} client 
     * @param {import("discord.js").Message} message
     * @param {String[]} args
     * @param {String} prefix
     * @param {String} color
     */
    async execute(client, message, args, prefix, color) {
        if (args.length) {
            let name, c;
            if (["music"].includes(args[0])) {
                name = "Music";
                c = client.Commands.filter((x) => x.category && x.category === name).map((x) => `\`${x.name}\``);

                return await message.reply({ embeds: [client.embed().setColor(color).setTitle(`${name} Commands`).setDescription(c.join(", ")).setFooter({ text: `Total ${c.length} ${name.toLowerCase()} Commands.` })] }).catch(() => { });
            } else if (["filters"].includes(args[0])) {
                name = "Filters";
                c = client.Commands.filter((x) => x.category && x.category === name).map((x) => `\`${x.name}\``);

                return await message.reply({ embeds: [client.embed().setColor(color).setTitle(`${name} Commands`).setDescription(c.join(", ")).setFooter({ text: `Total ${c.length} ${name.toLowerCase()} Commands.` })] }).catch(() => { });
            } else if (["settings", "config"].includes(args[0])) {
                name = "Settings";
                c = client.Commands.filter((x) => x.category && x.category === name).map((x) => `\`${x.name}\``);

                return await message.reply({ embeds: [client.embed().setColor(color).setTitle(`${name} Commands`).setDescription(c.join(", ")).setFooter({ text: `Total ${c.length} ${name.toLowerCase()} Commands.` })] }).catch(() => { });
            } else if (["misc"].includes(args[0])) {
                name = "Misc";
                c = client.Commands.filter((x) => x.category && x.category === name).map((x) => `\`${x.name}\``);

                return await message.reply({ embeds: [client.embed().setColor(color).setTitle(`${name} Commands`).setDescription(c.join(", ")).setFooter({ text: `Total ${c.length} ${name.toLowerCase()} Commands.` })] }).catch(() => { });
            } else {
                const command = client.Commands.get(args[0]) || client.Commands.get(client.Aliases.get(args[0]));
                if (!command) return await client.util.replyOops(message, `${client.emoji.cross} Cannot find the command called "${args[0]}"`, color);

                let commandAliases = [];
                if (Array.isArray(command.aliases)) for (let i of command.aliases) commandAliases.push(`${prefix}${i}`);

                let commandExamples = [];
                if (Array.isArray(command.examples)) for (let i of command.examples) commandExamples.push(`${prefix}${i}`);

                let CommandsubCommands = [];
                if (Array.isArray(command.sub_Commands)) for (i of command.sub_Commands) CommandsubCommands.push(`${prefix}${command.name} ${i}`);

                const fieldData = [
                    {
                        name: "Usage",
                        value: `${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : `\`${prefix}${command.name}\``}`,
                        inline: false
                    },
                    {
                        name: "Cooldown",
                        value: `${command.cooldown ? `\`[ ${client.util.msToTime(1000 * command.cooldown)} ]\`` : "`[ 3s ]`"}`,
                        inline: false
                    },
                    {
                        name: "Category",
                        value: `${command.category ? command.category : "None"}`,
                        inline: false
                    }
                ];

                if (commandAliases.length > 0) fieldData.push({
                    name: "Aliases",
                    value: `${commandAliases.map((x) => `\`${x}\``).join(", ")}`,
                    inline: false
                });

                if (CommandsubCommands.length > 0 && CommandsubCommands.length < 5) fieldData.push({
                    name: "Sub command(s)",
                    value: `${CommandsubCommands.map((x) => `\`${x}\``).join("\n")}`,
                    inline: false
                });

                if (commandExamples.length > 0 && commandExamples.length < 5) fieldData.push({
                    name: "Example(s)",
                    value: `${commandExamples.map((x) => `\`${x}\``).join("\n")}`,
                    inline: false
                });

                if (CommandsubCommands.length >= 5 || commandExamples.length >= 5) {
                    for (let i of fieldData) i.inline = true;

                    const embed1 = client.embed().setColor(color).setDescription(command.description).setTitle(`Help **${command.name}**`).setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) }).addFields(fieldData);

                    const fieldData2 = [];
                    if (CommandsubCommands.length > 0) fieldData2.push({
                        name: "Sub command(s)",
                        value: `${CommandsubCommands.map((x) => `\`${x}\``).join("\n")}`,
                        inline: true
                    });

                    if (commandExamples.length > 0) fieldData2.push({
                        name: "Example(s)",
                        value: `${commandExamples.map((x) => `\`${x}\``).join("\n")}`,
                        inline: true
                    });

                    const embed2 = client.embed().setColor(color).setDescription(command.description).setTitle(`Help **${command.name}**`).setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) }).addFields(fieldData2);

                    const pages = [embed1, embed2];
                    let page = 0;

                    embed2.setFooter({ text: `Page ${page + 1} of ${pages.length}` });
                    embed1.setFooter({ text: `Page ${page + 1} of ${pages.length}` });

                    const previousbut = client.button().setCustomId(`previous_but_help_cmd`).setEmoji({ name: '⬅️' }).setStyle(client.config.button.grey);
                    const nextbut = client.button().setCustomId(`next_but_help_cmd`).setEmoji({ name: '➡️' }).setStyle(client.config.button.grey);
                    const m = await message.reply({ embeds: [pages[page]], components: [client.row().addComponents(previousbut, nextbut)] });

                    const collector = m.createMessageComponentCollector({
                        filter: (b) => b.user.id === message.author.id ? true : false && b.deferUpdate().catch(() => { }),
                        time: 60000 * 2,
                        idle: 60000
                    });

                    collector.on("end", async () => {
                        if (!m) return;
                        await m.edit({ components: [client.row().addComponents(previousbut.setDisabled(true), nextbut.setDisabled(true))] }).catch(() => { });
                    });

                    collector.on("collect", async (button) => {
                        if (!button.deferred) await button.deferUpdate().catch(() => { });
                        if (button.customId === "previous_but_help_cmd") {
                            page = page - 1 < 0 ? pages.length - 1 : --page;
                            if (!m) return;

                            pages[page].setFooter({ text: `Page ${page + 1} of ${pages.length}` });
                            return await m.edit({ embeds: [pages[page]] }).catch(() => { });
                        } else if (button.customId === "next_but_help_cmd") {
                            page = page + 1 >= pages.length ? 0 : ++page;
                            if (!m) return;
                            pages[page].setFooter({ text: `Page ${page + 1} of ${pages.length}` });
                            return await m.edit({ embeds: [pages[page]] }).catch(() => { });
                        } else return;
                    });
                } else {
                    const embed2 = client.embed().setColor(color).setDescription(command.description).setTitle(`Help **${command.name}**`).setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) }).addFields(fieldData);
                    return await message.reply({ embeds: [embed2] }).catch(() => { });
                };
            };
        } else {
            info_commands = client.Commands.filter((x) => x.category && x.category === "Misc").map((x) => `\`${x.name}\``);
            music_commands = client.Commands.filter((x) => x.category && x.category === "Music").map((x) => `\`${x.name}\``);
            admin_commands = client.Commands.filter((x) => x.category && x.category === "Settings").map((x) => `\`${x.name}\``);
            filter_commands = client.Commands.filter((x) => x.category && x.category === "Filters").map((x) => `\`${x.name}\``);
            // Add Spotify and SoundCloud source info
            const sourceInfo = [
                "**Music Sources or Bot info**",
                
                "> - <a:vr_ga_spotify:1045284786345885696> [Spotify](https://www.spotify.com/): You can play music from Spotify by providing a valid Spotify track/playlist/album URL.",
                
                
                "> - <:q_SoundCloud:1148962420459581600>  [SoundCloud](https://soundcloud.com/):  You can play music from SoundCloud by providing a valid SoundCloud track URL.",
                
                "", // Add an empty line for separation
    
    "**Support Information**", 
                
                "> - <a:vayu__discordtop1_:997534017106739260> [Support server](https://discord.gg/CdCfgSC3qy): Join our server for additional support, updates, and community discussions.",
                
                
    "> - <:q_topgg:1149590677722771476> [Vote for us on top.gg](https://top.gg/bot/1044596050859663401/vote): Help us grow by voting for our bot on top.gg!",
                "> -  <:py_bot:1149610518127071273> [Invite the bot to your server](https://discord.com/api/oauth2/authorize?client_id=1044596050859663401&permissions=427684130161&redirect_uri=https%3A%2F%2Fdiscord.gg%2FCdCfgSC3qy&response_type=code&scope=identify%20guilds%20email%20bot%20guilds.join%20gdm.join%20applications.commands%20messages.read%20applications.commands.permissions.update): Click the link to invite our bot to your Discord server. You can customize the bot's permissions based on your server's needs.",
                
                "",
                
    "> - <a:dev:1102463069382267000> Bot Developer: [₦ł₵₭  ₣ɄⱤɎ](https://discordapp.com/users/761635564835045387): Meet the developer behind this bot! You can reach out to them for support, feedback, or collaboration. Click their profile picture to visit their Discord profile.", // Add a link to the bot developer's Discord profile
    
`> - **<:py_update:1102463404666523708> Bot Version:** This bot is currently running [version 1.7.0](https://github.com/your-bot-repo/releases/tag/v1.7.0). Stay updated with the latest features and improvements!`,
                "> - <:py_Gemptyithub:1149610495767232544> GitHub Repository: [Bot Repository](https://github.com/NICK-FURY-6023/Chat-GPT-3.5-turbo.git)", // Link to your bot's GitHub repository
                
                "",

                `> - **<a:ne_noprefix:1118895761493590087> Prefix:** The bot's prefix is \`${prefix}\`, which you can use to interact with it in your server. You can customize the bot's prefix to something else if it conflicts with other bots or commands in your server. To change the prefix, use [\`${prefix}prefix set <new_prefix>\`](https://discord.com/api/oauth2/authorize?client_id=1044596050859663401&permissions=427684130161&redirect_uri=https%3A%2F%2Fdiscord.gg%2FCdCfgSC3qy&response_type=code&scope=identify%20guilds%20email%20bot%20guilds.join%20gdm.join%20applications.commands%20messages.read%20applications.commands.permissions.update). For example, to change it to '!', use [\`${prefix}prefix set !\`](https://discord.gg/CdCfgSC3qy).`,

`> - **<a:q_dcpatner:1149632093916237854> Server Count:** The bot is currently in [${client.guilds.cache.size} servers](https://discord.com/api/oauth2/authorize?client_id=1044596050859663401&permissions=427684130161&redirect_uri=https%3A%2F%2Fdiscord.gg%2FCdCfgSC3qy&response_type=code&scope=identify%20guilds%20email%20bot%20guilds.join%20gdm.join%20applications.commands%20messages.read%20applications.commands.permissions.update).`,

`> - **<:ga_Users:1040538370595622942> Total Users:** The bot can see a total of [${client.users.cache.size} users](https://discord.com/api/oauth2/authorize?client_id=1044596050859663401&permissions=427684130161&redirect_uri=https%3A%2F%2Fdiscord.gg%2FCdCfgSC3qy&response_type=code&scope=identify%20guilds%20email%20bot%20guilds.join%20gdm.join%20applications.commands%20messages.read%20applications.commands.permissions.update) across all servers.`,
                
                "",
                
               `> - **🔴 Currently I don't have slash commands but My devs will Add Soon**[Join Our Support server](https://discord.gg/CdCfgSC3qy) For more updates.`,   
                
   // "> - Uptime: " + formatUptime(client.uptime), // Display bot uptime
    
                
                
          //  `> - Server Information ${guild.name} is a place where you can get help, suggest new features, and chat with the community. Join us to stay updated!`

            ];
            
            

            const embed = client.embed()
                .setAuthor(
                    {
                        name: 'Help Command',
                        icon_url: 'https://cdn.discordapp.com/avatars/547905866255433758/2fcb77582acae7ecedd97db9c238c1f3.png',
                        proxy_icon_url: 'https://images-ext-1.discordapp.net/external/HWSlVcfQM2HnJUZF0rUpmL5MsjS70OjoW3AbCveagrg/https/cdn.discordapp.com/avatars/547905866255433758/2fcb77582acae7ecedd97db9c238c1f3.png'
                    }
                )
                .setThumbnail(client.user.displayAvatarURL())
                .addFields(
                    {
                        name: '<:vr_user:1079787156802904125> Everyone commands',
                        value: info_commands.join(", "),
                        inline: false
                    },
                    {
                        name: '<a:gb_DJ:1118886168134701126> DJ commands',
                        value: client.Commands.filter((x) => x.player && x.player.dj).map((x) => `\`${x.name}\``).join(", "),
                        inline: false
                    },
                    {
                        name: '<:q_admin:1086170345519726662> Admin commands',
                        value: admin_commands.join(", "),
                        inline: false
                    },
                    {
                        name: '<a:gb_music:1118884144848576542> Music commands',
                        value: music_commands.join(", "),
                        inline: false
                    },
                )
                .setColor(color)
                .setFooter({ text: `Type '${prefix}help <CommandName>' for details on a command` });
            // Add Spotify and SoundCloud source info
embed.setDescription(sourceInfo.join('\n'));
            

            const m = await message.reply({ embeds: [embed] })
        }
    },
});
/**
// Function to calculate bot uptime
function calculateUptime(readyTimestamp) {
    const currentTime = Date.now();
    const uptimeMilliseconds = currentTime - readyTimestamp;
    const days = Math.floor(uptimeMilliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((uptimeMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((uptimeMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((uptimeMilliseconds % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
*/