const { Token } = require("./Config");
const { ShardingManager } = require("discord.js");

const manager = new ShardingManager("./Src/Saavan.js", {
    respawn: true,
    autoSpawn: true,
    token: "paste your bot token",
    totalShards: 1,
    shardList: "auto",
});
manager.spawn({ amount: manager.totalShards, delay: null, timeout: -1 });
