const { Token } = require("./Config");
const { ShardingManager } = require("discord.js");

const manager = new ShardingManager("./Src/Saavan.js", {
    respawn: true,
    autoSpawn: true,
    token: "jngjdvjx2q43QgTS8i7DrwgCrkRf7nSRv8p8s0",
    totalShards: 1,
    shardList: "auto",
});
manager.spawn({ amount: manager.totalShards, delay: null, timeout: -1 });
