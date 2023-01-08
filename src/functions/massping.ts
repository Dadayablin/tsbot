import Say from "./Say";

const got = require('got')

async function massping(msg: any) {
	const channelCheck = msg.args.join(' ').match(/(channel)(:|=)(\w+)/i)
	let channelTarget = channelCheck ? channelCheck[3].toLowerCase() : msg.channelName
	if (channelCheck) {
		msg.args.splice(msg.args.indexOf(channelCheck[0]), 1)
	}

	try {
		const tf = await got(`https://tmi.twitch.tv/group/user/${channelTarget}/chatters`).json()
		const all = tf.chatters
		const array = [...all.viewers, ...all.vips, ...all.moderators]
		const chatters = array.values()
		for (let user of chatters) {
      if (user === "cuvi" || user === "ytwx") {
				continue
			}
			Say(channelTarget,75, `${msg.args.join(' ')} ${user}`)
		}
	} catch (e) {
		console.log(e)
		return Say(msg.channelName,75, `Ошибка `)
	}
}

export default massping