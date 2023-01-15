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
          Say(msg.channelName, 100, `/timeout ${msg.displayName} 30 Спам`);
        }
      }
    }
  }
}

async function masstime(msg: any) {
  const fileJson = await JSON.parse(
    fs.readFileSync("./utils/settings.json", (err: any, data: any) => data)
  );
  if (msg.args[0] == "cl") {
    fileJson.masstime = [];
    await fs.writeFileSync("./utils/settings.json", JSON.stringify(fileJson));
    return Say(msg.channelName, 100, `Список фраз отчищен`);
  }
  let newM = {
    text: msg.args[0],
    channel: msg.channelName,
  };
  fileJson.masstime.push(newM);
  await fs.writeFileSync("./utils/settings.json", JSON.stringify(fileJson));
  return Say(msg.channelName, 100, `Слово успешно добавлено`);
}

export { masstimefunc, masstime };
