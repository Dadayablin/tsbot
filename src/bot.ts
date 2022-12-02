const { ChatClient } = require("dank-twitch-irc");

const prefix = "-";
const runTime = new Date().toString();

const sett = require("../utils/settings.json");
const modsId = require("../utils/mods.json");

import invisChars from "../utils/invisChars";
import ping from "./functions/ping";
import join from "./functions/join";
import part from "./functions/part";
import spam from "./functions/spam";
import twnick from "./functions/twnick";

let client = new ChatClient({
  rateLimits: "verifiedBot",
  maxChannelCountPerConnection: 1,
  connectionRateLimits: { parallelConnections: 50, releaseTime: 50 },
  ignoreUnhandledPromiseRejections: true,
  password: sett.password,
  username: sett.name,
});

try {
  client.on("ready", () => console.log("ez"));
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
      if (command == "ping") {
        ping(msg);
      }
      if (command == "join") {
        join(msg);
      }
      if (command == "part") {
        part(msg);
      }
      if (command == "spam") {
        spam(msg);
      }
      if (command == "twnc") {
        twnick(msg);
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
