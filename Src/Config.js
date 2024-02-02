const { ButtonStyle } = require("discord.js");
module.exports = {
    Token: "MTA0NDU5NjA1MDg1OTY2MzQwMQ.GYplDg.3u-IRyEB3O7gxIxnlk_LY2-mMkwu9u2v98gh38",// enter your token
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
        ID: "fd1506eedec640d28ff077eb4a8355b0", // spotify client id
        Secret: "d18b66f0dab44112b7c98a0fc24a2ae7", // spotify client secret
    },
    MongoData: "mongodb+srv://galaxydb:galaxybotdb@galaxydb.yndfw2d.mongodb.net/?retryWrites=true&w=majority",// monngo db
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
        guildAdd: 'https://discord.com/api/webhooks/1139463060109676705/sKRucGPA_L3DrjVMlmCw-aTnNPCtkm87GubuuV8obP2eB5WairD9-2umDFtUDCEKbolj',
        guildRemove: 'https://discord.com/api/webhooks/1139463421369270312/-R-l6pEPuv3hOr5_tG7CW3LGpdiiiA9LBmdfE-WE2INMry0-iKQNNVAYbITs_3zQ0eKq',
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
