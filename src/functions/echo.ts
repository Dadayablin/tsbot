import Say from "./Say";

async function echo(msg: any) {
  let userPing = `${msg.senderUsername},`;
  if (msg.senderUserID === "197298208" || msg.senderUserID === "453960486") {
    userPing = "";
  }

  if (!msg.args.length) {
    return Say(msg.channelName, 75, `${userPing} Укажи фразу.`);
  }

  const channelCheck = msg.args.join(" ").match(/(channel)(:|=)(\w+)/i);
  let channelTarget = channelCheck
    ? channelCheck[3].toLowerCase()
    : msg.channelName;
  if (channelCheck) {
    msg.args.splice(msg.args.indexOf(channelCheck[0]), 1);
  }

  const text = msg.args.join(" ");

  return Say(channelTarget, 75, `${text}`);
}

export default echo;
