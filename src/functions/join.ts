import Say from "./Say";
const fs = require("fs");
import { client } from "../bot";
import getUser from "./getUser";

async function join(msg: any) {
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
    Say(msg.channelName, 75, `Канал уже добавлен!`);
  } else {
    client.join(msg.args[0]);
    fileJson.channels.push(msg.args[0]);
    await fs.writeFileSync("./utils/settings.json", JSON.stringify(fileJson));
    Say(
      msg.channelName,
      75,
      `Канал ${msg.messageText
        .split(" ")
        .slice(1, 2)
        .join(" ")} успешно добавлен!`
    );
  }
}

export default join;
