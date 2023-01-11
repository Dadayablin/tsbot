const sett = require("../../utils/settings.json");
import getUser from "./getUser";
import Say from "./Say";
var fs = require("fs");

async function twnick(msg: any) {
  if (msg.args[0] == "--start") {
    let inttw = setInterval(async () => {
      sett.twn = inttw;
      const chars = "abcdefghiklmnopqrstuvwxyz";
      const stringLength = 4;
      let text = "";
      let textt = "";
      for (let i = 0; i < stringLength; i++) {
        let rand = Math.floor(Math.random() * chars.length);
        text += chars.substring(rand, rand + 1);
      }
      for (let i = 0; i < stringLength; i++) {
        let rand = Math.floor(Math.random() * chars.length);
        textt += chars.substring(rand, rand + 1);
      }
      const user = await getUser(text);
      const userr = await getUser(textt);
      if (!user) {
        fs.readFile("./utils/nikabs.txt", "utf8", (err: any, data: any) => {
          if (err) throw err;
          let spisok = data.split(" ");
          if (!spisok.includes(text)) {
            Say(msg.channelName, 75, `${text} рабочий: ${spisok.length}`);
            fs.appendFile("./utils/nikabs.txt", `${text} `, (err: any) => {
              if (err) throw err;
              console.log(`Добавлен ${text}`);
            });
          }
        });
      }
      if (!userr) {
        fs.readFile("./utils/nikabs.txt", "utf8", (err: any, data: any) => {
          if (err) throw err;
          let spisok = data.split(" ");
          if (!spisok.includes(textt)) {
            Say(msg.channelName, 75, `${textt} рабочий: ${spisok.length}`);
            fs.appendFile("./utils/nikabs.txt", `${textt} `, (err: any) => {
              if (err) throw err;
              console.log(`Добавлен ${textt}`);
            });
          }
        });
      }
    }, 1);
  }
  if (msg.args[0] == "--stop") {
    if (sett.twn != null) {
      clearInterval(sett.twn);
      sett.twn = null;
    }
  }
}

export default twnick;
