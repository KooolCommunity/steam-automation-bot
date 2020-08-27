const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const http = require('http');
const config = require('./config.json');
const SteamID = require('steamid');
const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require('constants');
const client = new SteamUser();

const logOnOptions = {
    accountName: config.username,
    password: config.password,
    twoFactorCode: SteamTotp.generateAuthCode(config.sharedSecret)
}

client.logOn(logOnOptions);

client.on('loggedOn', () => {
    console.log('Successfully logged into steam.')
    client.setPersona(SteamUser.EPersonaState.Online);
    if (config.playgame == true){
        if(config.playingcustomgame == true){
            client.gamesPlayed([config.presetcustomgame]);
            console.log("Now playing " + config.presetcustomgame);
        }else{
            client.gamesPlayed([config.presetgame]);
            console.log("Now playing " + config.presetgame);
        }
        
    }
});

client.on("friendMessage", function(steamid, message) {
    if(message == "hi"){
        client.chatMessage(steamid, "Hello! This is an automated response system to manage trading while AbsoluteMC is offline. If you want to talk to me about a trade, please let me know what you want to trade & I will respond to you as soon as possible. You can view all available commands by typing ?");
    }else{
        if(message == "?" | message == "!help"){
            client.chatMessage(steamid, "Hi! This is an automated response system to manage trading while AbsoluteMC is offline!");
            client.chatMessage(steamid, "You can see all the available commands below.");
            client.chatMessage(steamid, " ");
            client.chatMessage(steamid, "-- Trading");
            client.chatMessage(steamid, "!trade  -  Do this to see the active trades.");
            client.chatMessage(steamid, "-- Information");
            client.chatMessage(steamid, "!profile  -  Do this to see my profiles for trading, esports, & steam.");
            client.chatMessage(steamid, "!links  -  Do this to see links to my tracker network & my discord servers.");
        }
    }
});

client.on("friendMessage", function(steamid, message){
    if(message == "!trade"){
        client.chatMessage(steamid, "You can see all of AbsoluteMC's trades here: https://rocket-league.com/trades/AbsouteMC");
    }
});

client.on("friendMessage", function(steamid, message){
    if(message == "!links"){
        client.chatMessage(steamid, "Tracker Network Links:");
        client.chatMessage(steamid, "Rocket League Tracker: https://rocketleague.tracker.network/profile/steam/76561198834948592");
        client.chatMessage(steamid, "Discord Links:");
        client.chatMessage(steamid, "Impulse Gaming: https://discord.gg/qBR5fSs");
        client.chatMessage(steamid, "Koool Community: https://discord.gg/8euM5Ky");
        client.chatMessage(steamid, "Media Links:");
        client.chatMessage(steamid, "YouTube: https://youtube.com/c/AbsoluteMC");
        client.chatMessage(steamid, "Twitch: https://twitch.tv/AbsoluteMC");
    }
});

client.on("friendMessage", function(steamid, message){
    if(message == "!profile"){
        client.chatMessage(steamid, "You can check out my profiles below.");
        client.chatMessage(steamid, "Steam Profile: https://steamcommunity.com/id/AbsoluteMC/");
        client.chatMessage(steamid, "Trading Profile: https://rocket-league.com/player/AbsouteMC");
        client.chatMessage(steamid, "Esports Profile: https://www.indygamingleague.com/users/5f4568ea564d3800152a08ae");
        client.chatMessage(steamid, "Impulse Gaming Profile: https://www.indygamingleague.com/teams/5f45613b82188900156c7897");
    }
});

client.on("friendMessage", function(steamid, message){
    console.log(steamid + ": " + message);
});

client.on('friendRelationshop', function(steamid){
    if (relationshop == SteamUser.EFriendRelationshop.RequestRecipient){
        client.console.log("Recieved a friend request from " + steamid);
        client.addFriend(steamid, function(err,name){
            if (err){
                console.log(err);
                return;
            }
            console.log("Accepted " + name + "'s friend request.");
        });
        client.chatMessage(steamid, "Thank you for adding me on steam! If you are adding me for a trade, please let me know what you want to trade. I will respond to you as soon as possible.");
        console.log("Sent new friend message to " + steamid);
    }
});