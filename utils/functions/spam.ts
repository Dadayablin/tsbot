import Say from "./Say";
import { client } from "../../src/bot";
import getUser from "./getUser";
import invisChars from "../invisChars";

const modsId = require("../mods.json");
const prefix = "-";

async function spam(msg: any) {
  if (msg.args[1] == "i") {
    if (msg.args[0] == "t") {
      let time = Number(msg.args[2]) * 1000;
      let mess = msg.args.splice(3).join(" ");
      let inter = setInterval(() => {
        Say(msg.channelName, 0, mess);
        client.on("PRIVMSG", async (msg: any) => {
          if (modsId.id.includes(msg.senderUserID)) {
            msg.text = msg.messageText.replace(invisChars, "");
            msg.args = msg.text.slice(prefix.length).trim().split(/ +/);
            const command = msg.args.shift().toLowerCase();
            if (command == "stop") {
              clearInterval(inter);
            }
          }
        });
      }, time);
    } else {
      const user = await getUser(
        msg.args[0] ? msg.args[0].replace("@", "") : msg.senderUsername
      );
      if (!user) {
        return client.privmsg(
          msg.channelName,
          `Указанного пользователя не существует.`
        );
      }
      let chan = msg.args[0];
      let time = Number(msg.args[2]) * 1000;
      let mess = msg.args.splice(3).join(" ");
      let inter = setInterval(() => {
        Say(chan, 0, mess);
        client.on("PRIVMSG", async (msg: any) => {
          msg.text = msg.messageText.replace(invisChars, "");
          msg.args = msg.text.slice(prefix.length).trim().split(/ +/);
          if (modsId.id.includes(msg.senderUserID)) {
            const command = msg.args.shift().toLowerCase();
            if (command == "stop") {
              clearInterval(inter);
            }
          }
        });
      }, time);
    }
  } else {
    if (msg.args[0] == "t") {
      let num = Number(msg.args[1]);
      let time = Number(msg.args[2]) * 1000;
      let mess = msg.args.splice(3).join(" ");
      for (let y = 0; y < num; y++) {
        Say(msg.channelName, time * y, mess);
      }
    } else {
      const user = await getUser(
        msg.args[0] ? msg.args[0].replace("@", "") : msg.senderUsername
      );
      if (!user) {
        return client.privmsg(
          msg.channelName,
          `Указанного пользователя не существует.`
        );
      }
      let chan = msg.args[0];
      let num = Number(msg.args[1]);
      let time = Number(msg.args[2]) * 1000;
      let mess = msg.args.splice(3).join(" ");
      for (let y = 0; y < num; y++) {
        Say(chan, time * y, mess);
      }
    }
  }
}

export default spam;
