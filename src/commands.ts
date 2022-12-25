import ping from "./functions/ping";
import join from "./functions/join";
import part from "./functions/part";
import spam from "./functions/spam";
import twnick from "./functions/twnick";

async function commands(msg:any,command:any) {
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

export default commands