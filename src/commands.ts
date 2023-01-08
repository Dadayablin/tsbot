import ping from "./functions/ping";
import join from "./functions/join";
import part from "./functions/part";
import spam from "./functions/spam";
import twnick from "./functions/twnick";
import massping from "./functions/massping";
import js from "./functions/js";
import Say from "./functions/Say";

async function commands(msg: any, command: any) {
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
  if (command == "massping") {
    massping(msg);
  }
  if (command == "js") {
    js(msg);
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
