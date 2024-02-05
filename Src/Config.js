const { ButtonStyle } = require("discord.js");
module.exports = {
    Token: "paste your bot token",// enter your token
    Prefix: "+", // prefix here
    Client: {
        ID: "11044596050859663401", // client id
    },
    button: {
        "grey": ButtonStyle.Secondary,
        "blue": ButtonStyle.Primary,
        "link": ButtonStyle.Link,
        "red": ButtonStyle.Danger,
        "green": ButtonStyle.Success
    },
    spotify: {
        ID: "", // spotify client id
        Secret: "", // spotify client secret
    },
    MongoData: "",// monngo db
    EmbedColor: "#FF0000", // embed color
    Owners: ["777538136782667796", "761635564835045387"], // owners in array
    Nodes: [
        {
            name: '65.109.65.23', // Node Name
            url: '65.109.65.23:7477', //  Node Ip And : Port
            auth: 'galaxy', // Node Password
            secure: false
        }
    ],
    hooks: {
        guildAdd: '',
        guildRemove: '',
    },
    links: {
        invite: 'https://discord.com/api/oauth2/authorize?client_id=1044596050859663401&permissions=427684130161&redirect_uri=https%3A%2F%2Fdiscord.gg%2FCdCfgSC3qy&response_type=code&scope=identify%20guilds%20email%20bot%20guilds.join%20gdm.join%20applications.commands%20messages.read%20applications.commands.permissions.update',
        bg: ("https://media.discordapp.net/attachments/994066569112068187/1044477573603786813/image.gif"),
        support: 'https://discord.gg/CdCfgSC3qy',
        vote: 'https://top.gg/bot/1044596050859663401/vote',
        banner: 'https://media.discordapp.net/attachments/1127114318178160650/1149089891897065483/da3c6cd8727c613344d57d458860d1b4.gif?ex=64fa3cdb&is=64f8eb5b&hm=c84a9271955b57facfe5da45c37ff392c090363ab350c1c8419f8b7583a3ed69&',
        spotify: 'https://cdn.discordapp.com/attachments/1036701023990984724/1038352707720843345/782104564315717642.png',
        soundcloud: 'https://cdn.discordapp.com/attachments/1036701023990984724/1038352707418849310/908400578776956978.png',
    },
}
