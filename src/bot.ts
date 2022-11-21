const { ChatClient } = require("dank-twitch-irc");

const prefix = "-";
const runTime = new Date().toString();

const sett = require('../utils/settings.json')
const modsId = require('../utils/mods.json');

import invisChars from '../utils/invisChars'
import ping from "../utils/functions/ping"
import join from '../utils/functions/join';
import part from '../utils/functions/part';
import spam from '../utils/functions/spam'


let client = new ChatClient({
  password: sett.password,
  username: sett.name,
  maxChannelCountPerConnection: 200,
});

try {
  client.on("ready", () => console.log("ez"));
  client.on("close", (error:any) => {
    if (error != null) {
      console.error("error: ", error);
    }
  });
  client.on("PRIVMSG", async (msg:any) => {
    if (modsId.id.includes(msg.senderUserID)) {
    msg.text = msg.messageText.replace(invisChars, "");
    msg.args = msg.text.slice(prefix.length).trim().split(/ +/);
    const command = msg.args.shift().toLowerCase();
    console.log(`[#${msg.channelName}] ${msg.displayName}: ${msg.messageText}`);
      if (command == "ping") {
        ping(msg)
      }
      if (command == "join") {
        join(msg)
      }
      if (command == "part") {
        part(msg)
      }
      if (command == "spam") {
        spam(msg)
      }
    }
  });

  // See below for more events
  client.connect();
  client.joinAll(sett.channels);
} catch (e) {
  console.log(e);
}
export {client, runTime}

