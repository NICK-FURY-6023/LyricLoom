module.exports = new Object({
    name: "stats",
    description: "Shows a deep status of the bot.",
    category: "Misc",
    usage: "",
    cooldown: 10,
    aliases: ['info'],
    examples: ['info', 'stats', 'botinfo'],
    sub_commands: [],
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
        return message.reply({
            embeds: [
                client.embed()
                    .setColor(color)
                    .setAuthor({
                        name: 'My Statistics',
                        url: client.config.links.support,
                        iconURL: client.user.displayAvatarURL({ forceStatic: true }),
                    })
                    .setTimestamp()
                    .setThumbnail(client.user.displayAvatarURL({ forceStatic: true }))
                    .addFields([
                        {
                            name: ':bar_chart: Status',
                            value: `:ping_pong: Bot Latency : \`${Math.round(client.ws.ping)} ms\`\n:clock1: Uptime : <t:${(Date.now() / 1000 - client.uptime / 1000).toFixed()}:R>`,
                            inline: false,
                        },
                        {
                            name: ':shield: Servers',
                            value: `\`${client.guilds.cache.size}\``,
                            inline: true,
                        },
                        {
                            name: ':busts_in_silhouette: Users',
                            value: `\`${client.guilds.cache.reduce((x, y) => x + y.memberCount, 0)}\``,
                            inline: true,
                        },
                        {
                            name: ':speech_balloon: Channels',
                            value: `\`${client.channels.cache.size}\``,
                            inline: true,
                        },
                        {
                            name: ':desktop_computer: Host',
                            value: `:desktop_computer: **Platform:** \`${require('os').type()}\`

<a:Loading:1102464281099898891> **Processor:** \`${require('os').cpus()[0].model}\`

:computer: **CPU Cores:** \`${require('os').cpus().length}\`

:zap: **CPU Speed:** \`${require('os').cpus()[0].speed} MHz\`

:building_construction: **Architecture:** \`${require('os').arch()}\`

:id: **Process ID:** \`${process.pid}\`

:floppy_disk: **Total Memory:** \`${client.util.formatBytes(require('os').totalmem())}\`

:outbox_tray: **Free Memory:** \`${client.util.formatBytes(require('os').freemem())}\`

:hourglass: **Uptime:** \`${client.util.msToTime(require('os').uptime())}\``,
                            inline: false,
                        },
                        {
                            name: ':books: Library',
                            value: `:books: Discord.js : \`v${require('discord.js').version}\`\n:books: Node : \`${process.version}\``,
                            inline: false,
                        },
                    ]),
            ],
        });
    },
});
