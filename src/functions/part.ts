import Say from "./Say";
const fs = require("fs");
import { client } from "../bot";
import getUser from "./getUser";

async function part(msg: any) {
  if (!msg.args[0]) {
    return Say(msg.channelName, 75, `Укажи канал`);
  }
  const fileJson = await JSON.parse(
    fs.readFileSync("./utils/settings.json", (err: any, data: any) => data)
  );
  const user = await getUser(
    msg.args[0] ? msg.args[0].replace("@", "") : msg.senderUsername
  );
  if (!user) {
    return client.privmsg(
      msg.channelName,
      `Указанного пользователя не существует.`
    );
  }
  if (fileJson.channels.includes(msg.args[0])) {
    client.part(msg.args[0]);
    let num = fileJson.channels.indexOf(msg.args[0]);
    fileJson.channels.splice(num, 1);
    fs.writeFileSync("./utils/settings.json", JSON.stringify(fileJson));
    Say(msg.channelName, 75, `Канал ${msg.args[0]} успешно удалён!`);
  } else {
    Say(msg.channelName, 75, `Канал ещё не подключен!`);
  }
}

export default part;
