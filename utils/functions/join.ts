import Say from './Say'
import {client} from '../../src/bot'
import getUser from './getUser'
const sett = require('../settings.json')

async function join(msg: any) {
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
    Say(msg.channelName, 200, `Канал уже добавлен!`);
  } else {
    client.join(msg.args[0]);
    sett.channels.push(msg.args[0]);
    Say(
      msg.channelName,
      200,
      `Канал ${msg.messageText
        .split(" ")
        .slice(1, 2)
        .join(" ")} успешно добавлен!`
    );
  }
}

export default join
