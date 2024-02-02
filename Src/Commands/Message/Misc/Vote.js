module.exports = new Object({
    name: "vote",
    description: "Vote me on Top.gg, discord.ly, and discords.com.",
    category: "Misc",
    usage: "",
    cooldown: 10,
    usage: '',
    aliases: ['top', 'vote'],
    examples: [''],
    sub_commands: [],
    args: false,
    permissions: {
        client: [],
        user: [],
        dev: false,
    },
    player: { voice: false, active: false, dj: false, },
    // Define the vote links with emojis
    voteLinks: [
        {
            name: "Top.gg",
            link: "https://top.gg/bot/your-bot-id/vote",
            emoji: ":arrow_up:️", // Add emoji here
        },
        {
            name: "discord.ly",
            link: "https://discord.ly/galaxy-0786",
            emoji: ":thumbsup:", // Add emoji here
        },
        {
            name: "discords.com",
            link: "https://discords.com/bots/bot/1044596050859663401",
            emoji: ":star:", // Add emoji here
        },
    ],
    /**
     * 
     * @param {import("../../../Saavan")} client 
     * @param {import("discord.js").Message} message
     * @param {String[]} args
     * @param {String} prefix
     * @param {String} color
     */
    async execute(client, message, args, prefix, color) {
        const lineBreaks = '\n\n\n'; // Add extra line breaks here
        const voteLinksText = this.voteLinks.map(link => `${link.emoji} [Vote on ${link.name}](${link.link})`).join(lineBreaks);
        return message.reply({
            embeds: [
                client.embed()
                    .setDescription(voteLinksText)
                    .setColor(color),
            ],
        });
    },
});
