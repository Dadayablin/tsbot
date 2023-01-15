import ping from "./functions/ping";
import join from "./functions/join";
import part from "./functions/part";
import spam from "./functions/spam";
import twnick from "./functions/twnick";
import massping from "./functions/massping";
import js from "./functions/js";
import Say from "./functions/Say";
import rejoin from "./functions/rejoin";
import mods from "./functions/mods";
import echo from "./functions/echo";
import glbmsg from "./functions/globmsg";
import { masstime } from "./functions/masstimeout";

async function commands(msg: any, command: any) {
  if (
    msg.senderUserID == "453960486" ||
    msg.senderUserID == "197298208" ||
    msg.senderUserID == "104672207"
  ) {
    if (command == "mt") {
      masstime(msg);
    }
    if (command == "gm") {
      glbmsg(msg);
    }
    if (command == "part") {
      part(msg);
    }
    if (command == "join") {
      join(msg);
    }
    if (command == "rejoin") {
      rejoin(msg);
    }
    if (command == "twnc") {
      twnick(msg);
    }
    if (command == "mod") {
      mods(msg);
    }
    if (command == "massping") {
      massping(msg);
    }
    if (command == "js") {
      js(msg);
    }
  }
  if (command == "ping") {
    ping(msg);
  }
  if (command == "e") {
    echo(msg);
  }
  if (command == "spam") {
    spam(msg);
  }
  if (command == "clear") {
    let l = 0;
    while (l != 50) {
      l++;
      Say(msg.channelName, 0, `/clear`);
    }
  }
}

export default commands;
