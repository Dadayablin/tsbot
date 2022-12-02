import Say from "./Say";
import { client } from "../bot";
import getUser from "./getUser";
const sett = require("../../utils/settings.json");

async function part(msg: any) {
  const user = await getUser(
    msg.args[0] ? msg.args[0].replace("@", "") : msg.senderUsername
  );
  if (!user) {
    return client.privmsg(
      msg.channelName,
      `Указанного пользователя не существует.`
    );
  }
  if (sett.channels.includes(msg.args[0])) {
    client.part(msg.args[0]);
    let num = sett.channels.indexOf(msg.args[0]);
    sett.channels.splice(num, 1);
    Say(msg.channelName, 200, `Канал успешно удалён!`);
  } else {
    Say(msg.channelName, 200, `Канал ещё не подключен!`);
  }
}

export default part;
