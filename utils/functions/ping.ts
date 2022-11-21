import Say from "./Say";
import {client, runTime} from '../../src/bot'
import shortRussianHumanizer from "./RussianHumanizer";

function ping(msg:any) {
    const getUptime = new Date().getTime() - Date.parse(runTime);
    const botUptime = shortRussianHumanizer(getUptime, {
      round: true,
      language: "shortRu",
      spacer: "",
    });
    Say(
      msg.channelName,
      200,
      `-pong, Время работы: ${botUptime}, Всего каналов: ${client.joinedChannels.size}`
    );   
}

export default ping