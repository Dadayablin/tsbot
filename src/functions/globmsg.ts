import Say from "./Say";

const sett = require("../../utils/settings.json");

async function glbmsg(msg: any) {
  for (let u in sett.channels) {
    setTimeout(() => {
      Say(`#${sett.channels[u]}`, 75, msg.args.join(" "));
    }, 75 * Number(u));
  }
}

export default glbmsg
