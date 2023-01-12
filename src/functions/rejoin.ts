import Say from "./Say";
const fs = require("fs");
import { client } from "../bot";
import getUser from "./getUser";

async function rejoin(msg: any) {
  const fileJson = await JSON.parse(
    fs.readFileSync("./utils/settings.json", (err: any, data: any) => data)
  );
  if (fileJson.channels.includes(msg.args[0])) {
    client.part(msg.args[0]);
    let num = fileJson.channels.indexOf(msg.args[0]);
    fileJson.channels.splice(num, 1);
    fs.writeFileSync("./utils/settings.json", JSON.stringify(fileJson));
    Say(
      msg.channelName,
      75,
      `Канал ${msg.args[0]} успешно удалён!`
    );
  } else {
    Say(msg.channelName, 75, `Канал ещё не подключен!`);
  }
  const userAdd = await getUser(
    msg.args[1] ? msg.args[1].replace("@", "") : msg.senderUsername
  );
  if (!userAdd) {
    return client.privmsg(
      msg.channelName,
      `Указанного пользователя не существует.`
    );
  }
  if (fileJson.channels.includes(msg.args[1])) {
    Say(msg.channelName, 75, `Канал уже добавлен!`);
  } else {
    client.join(msg.args[1]);
    fileJson.channels.push(msg.args[1]);
    await fs.writeFileSync("./utils/settings.json", JSON.stringify(fileJson));
    Say(
      msg.channelName,
      75,
      `Канал ${msg.args[1]} успешно добавлен!`
    );
  }
}

export default rejoin;
