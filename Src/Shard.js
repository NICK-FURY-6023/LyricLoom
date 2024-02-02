const { Token } = require("./Config");
const { ShardingManager } = require("discord.js");

const manager = new ShardingManager("./Src/Saavan.js", {
    respawn: true,
    autoSpawn: true,
    token: "MTA0NDU5NjA1MDg1OTY2MzQwMQ.GYplDg.3u-IRyEB3O7gxIxnlk_LY2-mMkwu9u2v98gh38",
    totalShards: 1,
    shardList: "auto",
});
manager.spawn({ amount: manager.totalShards, delay: null, timeout: -1 });