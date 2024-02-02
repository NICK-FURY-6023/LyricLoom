module.exports = new Object({
    name: "support",
    description: "Get a link to support server .",
    category: "Misc",
    usage: "",
    cooldown: 10,
    usage: '',
    aliases: ['support', 'su'],
    examples: [''],
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
                    .setDescription(`[Support Server ](${client.config.links.support}) join support server.`)
                    .setColor(color),
            ],
        });
    },
});