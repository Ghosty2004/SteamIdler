import SteamUser from "steam-user";

const user = new SteamUser({enablePicsCache: true});

const customStatus = "Ghosty2004 on GitHub <3";

user.logOn({
    accountName: "yourUserName",
    password: "yourPassword",
    twoFactorCode: "your2FA" // (Only if you have, if you don't have delete this property...)
});

function gamesUpdate() {
    user.gamesPlayed([]);
    const activity: Array<any> = user.getOwnedApps();
    if(customStatus) activity.push(customStatus);
    user.gamesPlayed(activity.reverse());
}

user.on("appOwnershipCached", () => {
    gamesUpdate();
    setInterval(gamesUpdate, 60000 * 60);
    console.log("Playing every games from your library...");
})

user.on("loggedOn", () => {
	user.setPersona(SteamUser.EPersonaState.Online);
	console.log("Successfully logged in.");
});