module.exports = new Object({
    name: "play",
    description: "Plays a song from given query/link.",
    category: "Music",
    cooldown: 5,
    usage: '<query>',
    aliases: ['p'],
    examples: ['play ncs'],
    sub_commands: [],
    args: true,
    permissions: {
        client: [],
        user: [],
        dev: false,
    },
    player: { voice: true, active: false, dj: false, },

    /**
     * 
     * @param {import("../../../Saavan")} client 
     * @param {import("discord.js").Message} message
     * @param {String[]} args
     * @param {String} prefix
     * @param {String} color
     * @param {import('kazagumo').KazagumoPlayer} dispatcher
     */

    async execute(client, message, args, prefix, color, dispatcher) {

        let query = args.join(' ');
        if (query.startsWith("https://") || query.startsWith("http://")) {
            if (!query.match(/(?:https:\/\/open\.spotify\.com\/|spotify:)(?:.+)?(track|playlist|album|artist)[\/:]([A-Za-z0-9]+)/)) {
                if (!query.match(/^https?:\/\/(soundcloud\.com|snd\.sc)\/(.*)$/)) {
                    return message.reply({
                        embeds: [
                            client.embed()
                                .setColor(color)
                                .setDescription(
                                `${client.emoji.cross} <@${message.author.id}>, Recently, We have removed <a:vayu_youtube:1047760577444974612> YouTube support from <@${client.user.id}>,. ` +
                `You can still play music from Spotify or SoundCloud by providing a valid URL.\n\n` +
                `Music Sources:\n` +
                `<a:vr_ga_spotify:1045284786345885696> [Spotify](https://www.spotify.com/): You can play music from Spotify by providing a valid Spotify track/playlist/album URL.\n` +
                `<:q_SoundCloud:1148962420459581600> [SoundCloud](https://soundcloud.com/): You can play music from SoundCloud by providing a valid SoundCloud track URL.\n` +
                 `<:py_bot:1149610518127071273> Invite ${client.user.username} to your server: [Invite Link](https://discord.com/api/oauth2/authorize?client_id=1044596050859663401&permissions=1239370001526&redirect_uri=https://discord.gg/CdCfgSC3qy&response_type=code&scope=bot%20applications.commands)\n` +
                `<:q_topgg:1149590677722771476> Vote for ${client.user.username} on top.gg: [Vote Link](https://top.gg/bot/1044596050859663401/vote)\n\n` +
                `<a:vayu__discordtop1_:997534017106739260> Join our [Support server](https://discord.gg/CdCfgSC3qy) for additional information and updates.`
            )
                    ]
                    })
                }
            }
        }
        if (!dispatcher) dispatcher = await client.dispatcher.createPlayer({
            guildId: message.guild.id,
            voiceId: message.member.voice.channel.id,
            textId: message.channel.id,
            deaf: true,
        });
        if (!dispatcher.textId) dispatcher.setTextChannel(message.channel.id);
        let searchTrack = query;

        const { tracks, type, playlistName } = await dispatcher.search(searchTrack, { requester: message.author, engine: 'spotify' });
        if (!tracks.length) {
            return message.reply({
                embeds: [client.embed().setColor(color).setDescription(`${client.emoji.cross} No songs found.`)],
            });
        }

        if (type === 'PLAYLIST') {
            for (const track of tracks) {
                dispatcher.queue.add(track);
            }
            await client.util.update(dispatcher, client);
            if (!dispatcher.playing && !dispatcher.paused) dispatcher.play();
            return message.channel.send({
                embeds: [
                    client.embed()
                        .setColor(color)
                        .setDescription(`<a:vr_ga_spotify:1045284786345885696> Queued **${tracks.length}** tracks from [${playlistName.length > 64 ? playlistName.substring(0, 64) + '...' : playlistName}](${query}) [${message.member}]`),
                ],
            });
        } else {
            dispatcher.queue.add(tracks[0]);
            await client.util.update(dispatcher, client);
            if (!dispatcher.playing && !dispatcher.paused) dispatcher.play();

            return message.channel.send({
                embeds: [
                    client.embed()
                        .setColor(color)
                        .setDescription(`<a:vr_ga_spotify:1045284786345885696> Queued [${tracks[0].title.length > 64 ? tracks[0].title.substring(0, 64) + '...' : tracks[0].title}](${tracks[0].uri}) [${message.author}]`),
                ],
            });
        }
    }
})