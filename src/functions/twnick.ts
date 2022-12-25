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
            Say(msg.channelName, 100, `${text} рабочий: ${spisok.length}`);
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
            Say(msg.channelName, 100, `${textt} рабочий: ${spisok.length}`);
            fs.appendFile("./utils/nikabs.txt", `${textt} `, (err: any) => {
              if (err) throw err;
              console.log(`Добавлен ${textt}`);
            });
          }
        });
      }
    }, 1);
  }
  if (msg.args[0] == "--test") {
    let z = 0;
    let x = 0;
    let c = 0;
    let v = 0;
    let intt = setInterval(async () => {
      const chars = "abcdefghiklmnopqrstuvwxyz";
      let text = "";
      text += chars[z] + chars[x] + chars[c] + chars[v];
      const user = await getUser(text);
      if (!user) {
        await fs.readFile("./utils/nikabs.txt", "utf8", (err: any, data: any) => {
          if (err) throw err;
          let spisok = data.split(" ");
          if (!spisok.includes(text)) {
            Say(msg.channelName, 100, `${text} рабочий: ${spisok.length}`);
            fs.appendFile("./utils/nikabs.txt", `${text} `, (err: any) => {
              if (err) throw err;
              console.log(`Добавлен ${text}`);
            });
          }
        });
      }
      if (v == 24) {
        v = 0;
        c += 1;
        console.log(`c+1 ` + c)
      }
      if (c == 24) {
        c = 0;
        x += 1;
        console.log(`x+1 ` + x)
      }
      if (x == 24) {
        x = 0;
        z += 1;
        console.log(`z+1 ` + z)
      }
      if (z == 24) {
        console.log(`stop`)
        clearInterval(intt)
      }
      v += 1;
      console.log(text)
    }, 10);
  }
  if (msg.args[0] == "--stop") {
    if (sett.twn != null) {
      clearInterval(sett.twn);
      sett.twn = null;
    }
  }
}

export default twnick;
