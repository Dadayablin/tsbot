const { ChatClient } = require("dank-twitch-irc");

const prefix = "-";
const runTime = new Date().toString();

const sett = require("../utils/settings.json");
const modsId = require("../utils/mods.json");

import invisChars from "../utils/invisChars";
import commands from "./commands";

let client = new ChatClient({
  rateLimits: "verifiedBot",
  maxChannelCountPerConnection: 1,
  connectionRateLimits: { parallelConnections: 50, releaseTime: 50 },
  ignoreUnhandledPromiseRejections: true,
  password: sett.ytwx,
  username: sett.name,
});

try {
  client.on("ready", () => console.log("successfully connected"));
  client.on("close", (error: any) => {
    if (error != null) {
      console.error("error: ", error);
    }
  });
  client.on("PRIVMSG", async (msg: any) => {
    if (modsId.id.includes(msg.senderUserID)) {
      msg.text = msg.messageText.replace(invisChars, "");
      msg.args = msg.text.slice(prefix.length).trim().split(/ +/);
      const command = msg.args.shift().toLowerCase();
      if (!msg.text.startsWith(prefix)) {
        return;
      }
      console.log(
        `[#${msg.channelName}] ${msg.displayName}: ${msg.messageText}`
      );
      commands(msg, command);
      if (command == "q") {
        process.exit(0);
      }
    }
  });

  // See below for more events
  client.connect();
  client.joinAll(sett.channels);
} catch (e) {
  console.log(e);
}
export { client, runTime };
