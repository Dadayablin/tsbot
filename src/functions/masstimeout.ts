import Say from "./Say";
const fs = require("fs");

async function masstimefunc(msg: any) {
  const fileJson = await JSON.parse(
    fs.readFileSync("./utils/settings.json", (err: any, data: any) => data)
  );
  if (fileJson.masstime.length != 0) {
    for (let u in fileJson.masstime) {
      if (fileJson.masstime[u].channel == msg.channelName) {
        let reg = new RegExp(`(${fileJson.masstime[u].text})`);
        const textCheck = msg.text.match(reg);
        if (textCheck) {
          Say(
            msg.channelName,
            100,
            `/timeout ${msg.displayName} ${fileJson.masstime[u].time} Спам`
          );
        }
      }
    }
  }
}

async function masstime(msg: any) {
  const checkС = msg.args.join(" ").match(/(--)(add|del)/);
  let check = checkС ? checkС[2].toLowerCase() : "err";
  if (checkС) {
    msg.args.splice(msg.args.indexOf(checkС[0]), 1);
  }
  if (check == "add") {
    const textCheck = msg.args.join(" ").match(/(m)(:|=)(\w+)/i);
    let text = textCheck ? textCheck[3].toLowerCase() : "err";
    if (textCheck) {
      msg.args.splice(msg.args.indexOf(textCheck[0]), 1);
    }
    if (text == "err") {
      return Say(msg.channelName, 100, `Укажи слово для добавления`);
    }
    const timeCheck = msg.args.join(" ").match(/(t)(:|=)(\w+)/i);
    let time = timeCheck ? timeCheck[3].toLowerCase() : "err";
    if (timeCheck) {
      msg.args.splice(msg.args.indexOf(timeCheck[0]), 1);
    }
    if (time == "err") {
      return Say(msg.channelName, 100, `Укажи время для добавления`);
    }
    const fileJson = await JSON.parse(
      fs.readFileSync("./utils/settings.json", (err: any, data: any) => data)
    );
    let newMass = {
      text: text,
      time: time,
      channel: msg.channelName,
    };
    fileJson.masstime.push(newMass);
    await fs.writeFileSync("./utils/settings.json", JSON.stringify(fileJson));
    Say(msg.channelName, 100, `Слово ${text} успешно добавлено`);
  }
  if (check == "del") {
    const textCheck = msg.args.join(" ").match(/(m)(:|=)(\w+)/i);
    let text = textCheck ? textCheck[3].toLowerCase() : "err";
    if (textCheck) {
      msg.args.splice(msg.args.indexOf(textCheck[0]), 1);
    }
    if (text == "err") {
      return Say(msg.channelName, 100, `Укажи слово для удаления`);
    }
    const fileJson = await JSON.parse(
      fs.readFileSync("./utils/settings.json", (err: any, data: any) => data)
    );
    for (let u in fileJson.masstime) {
      if (fileJson.masstime[u].channel == msg.channelName) {
        if (fileJson.masstime[u].text == text) {
          fileJson.masstime.splice(u, 1);
          await fs.writeFileSync(
            "./utils/settings.json",
            JSON.stringify(fileJson)
          );
          Say(msg.channelName, 100, `Слово ${text} успешно удалено`);
        }
      }
    }
  }
}

export { masstimefunc, masstime };
