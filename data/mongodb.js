const { MongoClient } = require('mongodb');
const { Client, Intents } = require("discord.js");
const mongo = new MongoClient(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const intents = [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MEMBERS ]
const partials = ["CHANNEL", "GUILD_MEMBER", "USER", "MESSAGE", "REACTION"];

const client = new Client({ intents, partials });

client.login(process.env.DISCORD_BOT_TOKEN);
mongo.connect();

client.on("ready", () => {
    console.log("Ready!");
});

const dev = process.env.NODE_ENV !== 'production';


const gamesDb = dev ? 'Games-dev' : 'Games';

const gamedb = mongo.db(gamesDb);
const pingpongAccounts = mongo.db('pingpong-accounts');

exports.getAdmins = async () => {
    const admins = await gamedb.collection('admins').find({}).toArray();
    return admins.map(admin => admin.email);
}

exports.getAllData = async () => {
    const allLeaderboards = await gamedb.listCollections().toArray();
    let leaderboardFinal = {};

    for (let i = 0; i < allLeaderboards.length; i++) {
        const leaderboard = allLeaderboards[i];

        const collection = gamedb.collection(leaderboard.name);
        const leaderboardData = await collection.find({}, { projection: {_id: 0}}).sort({wins: -1}).toArray();
        const leaderboardName = leaderboard.name;
        if (leaderboardName === 'admins') continue;

        leaderboardFinal[leaderboardName] = leaderboardData;
    }

    return leaderboardFinal;
}

exports.startDiscordBot = async() => {
    client.on("ready", () => {
        console.log("Ready!");
    }).then(() => {
        return { ready: "ready" }
    })
}

exports.fetchDiscordData = async (playerId) => {
    try {
        const discordData = await client.users.fetch(playerId);
        return discordData;
    } catch (error) {
        return error;
    }
}

exports.getGuildInfo = () => {
    try {
        const guild = client.guilds.cache.get("647866413146439710"); 
        return { guild: guild }
    } catch (error) {
        return { error: error };
    }
}

exports.getAllDiscordUsers = async () => {
    try {
        const guild = client.guilds.cache.get("647866413146439710"); 
        members = await guild.members.fetch()
            return { members: members }
    } catch (error) {
        return { error: error };
    }
}

exports.getUser = async (playername, projection = {}) => {
    try {
        const user = await pingpongAccounts.collection('users').findOne({ name: playername }, projection);
        console.log(user)
        return user;
    } catch (error) {
        return error;
    }
}

exports.getUserStats = async (playerId) => {
    const allLeaderboards = await gamedb.listCollections().toArray();
    let leaderboardFinal = {};

    for (let i = 0; i < allLeaderboards.length; i++) {
        const leaderboard = allLeaderboards[i];

        const collection = gamedb.collection(leaderboard.name);
        const leaderboardData = await collection.find({playerId: playerId}, { projection: {_id: 0}}).toArray();
        const leaderboardName = leaderboard.name;

        leaderboardFinal[leaderboardName] = leaderboardData;
    }

    return leaderboardFinal;
}

exports.updateOne = async (playerId, data, gamemode) => {
    try {
        const updatedUser = await gamedb.collection(gamemode).updateOne({playerId: playerId}, data);
        updatedUser.message = `Successfully updated!`;
        return updatedUser;
    } catch (error) {
        return {error: error};
    }
}

exports.setNickname = async (playername, playerId, nickname) => {
    const allLeaderboards = await gamedb.listCollections().toArray();
    try {

        const user = await pingpongAccounts.collection('users').updateOne({ name: playername }, { $set: { nickname: nickname } });
        for (let i = 0; i < allLeaderboards.length; i++) {
            const leaderboard = allLeaderboards[i];
            const collection = gamedb.collection(leaderboard.name);
            const leaderboardData = await collection.updateOne({playerId: playerId}, { $set: { nickname: nickname } });
        }
        return "Successfully updated!";
    } catch (error) {
        return error;
    }
}