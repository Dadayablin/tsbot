import Say from "./Say";
const fs = require("fs");
import { client } from "../bot";
import getUser from "./getUser";

async function mods(msg: any) {
  const fileJson = await JSON.parse(
    fs.readFileSync("./utils/mods.json", (err: any, data: any) => data)
  );
  if (msg.args[0] == "add") {
    const user = await getUser(
      msg.args[1] ? msg.args[1].replace("@", "") : msg.senderUsername
    );
    if (!user) {
      return Say(msg.channelName, 75, `Указанного пользователя не существует.`);
    }
    if (fileJson.id.includes(msg.args[1])) {
      Say(msg.channelName, 75, `Модератор уже добавлен`);
    } else {
      client.join(msg.args[1]);
      fileJson.id.push(msg.args[1]);
      await fs.writeFileSync("./utils/mods.json", JSON.stringify(fileJson));
      Say(
        msg.channelName,
        75,
        `Модератор ${user.displayName} успешно добавлен!`
      );
    }
  }
  if (msg.args[0] == "del") {
    const user = await getUser(
      msg.args[1] ? msg.args[1].replace("@", "") : msg.senderUsername
    );
    if (!user) {
      return Say(msg.channelName, 75, `Указанного пользователя не существует.`);
    }
    if (fileJson.id.includes(msg.args[1])) {
      let num = fileJson.id.indexOf(msg.args[1]);
      fileJson.id.splice(num, 1);
      fs.writeFileSync("./utils/mods.json", JSON.stringify(fileJson));
      Say(msg.channelName, 75, `Модератор ${user.displayName} успешно удалён!`);
    } else {
      Say(msg.channelName, 75, `Модератор ещё не добавлен`);
    }
  }
}

export default mods;
