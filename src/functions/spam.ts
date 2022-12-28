import { client } from "../bot";
const sett = require("../../utils/settings.json");

async function spam(msg: any) {
  if (!msg.args.length) {
    return client.privmsg(msg.channelName, `Укажи фразу.`);
  }
  const channelCheck = msg.args.join(" ").match(/(channel)(:|=)(\w+)/i);
  let channelTarget = channelCheck
    ? channelCheck[3].toLowerCase()
    : msg.channelName;
  if (channelCheck) {
    msg.args.splice(msg.args.indexOf(channelCheck[0]), 1);
  }
  const intCheck = msg.args.join(" ").match(/(i|int)(:|=)(\d+)/i);
  let spamTime = intCheck ? intCheck[3] : 1060;
  if (intCheck) {
    msg.args.splice(msg.args.indexOf(intCheck[0]), 1);
  }
  const countCheck = msg.args.join(" ").match(/(c|count)(:|=)(\d+)/i);
  let countAmount = countCheck ? countCheck[3] : 99999999;
  if (countCheck) {
    msg.args.splice(msg.args.indexOf(countCheck[0]), 1);
  }
  if (msg.args[0] === "--me") {
    let i = 1;
    let spammer = setInterval(() => {
      if (i & 1) {
        client.privmsg(channelTarget, `${msg.args.slice(1).join(" ")}`);
      } else {
        client.privmsg(
          channelTarget,
          `/me ${msg.args.slice(1).join(" ")} \u{E0000}`
        );
      }
      if (i++ == countAmount) clearInterval(spammer);
    }, spamTime);
    return;
  }
  if (msg.args[0] != "--stop") {
    let i = 1;
    let spammer = setInterval(() => {
      if (i == 1) {
        let num = Math.floor(Math.random() * 10000);
        let addJson = {
          data: spammer,
          id: num,
        };
        sett.int.push(addJson)
        client.privmsg(channelTarget, `Создан спам с id: ${num}`);
      }
      if (i & 1) {
        client.privmsg(channelTarget, `${msg.args.join(" ")}`);
      } else {
        client.privmsg(channelTarget, `${msg.args.join(" ")} \u{E0000}`);
      }
      if (i++ == countAmount) clearInterval(spammer);
    }, spamTime);
  }
  if (msg.args[0] == "--stop") {
    if (sett.int != null) {
      for (let i in sett.int){
        if (sett.int[i].id == msg.args[1]){
          clearInterval(sett.int[i].data)
        }
      }
    }
  }
}

export default spam;
