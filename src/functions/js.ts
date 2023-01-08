import humanizer from './RussianHumanizer'
import Say from './Say'

const got = require('got')

async function js(msg: any) {
	let userPing = `${msg.senderUsername},`
	if (msg.senderUserID === '197298208' || msg.senderUserID === '453960486') {
		userPing = ''
	}

	if (!msg.args.length) {
		return Say(msg.channelName,75, `${userPing} Укажи аргументы.`)
	}

	try {
		let content = msg.args.join(' ')

		content = content.toString().split(/(?<=;)/)
		let index = content.length - 1
		if (!/\breturn\b/.test(content[index])) {
			const pairs = ['`', `"`, `'`, `/`].map((i) => new RegExp(`(?<!\\\\)` + i, `g`))

			for (const reg of pairs) {
				for (let i = content.length; i > 1; i--) {
					const matches = content[index].match(reg)
					if (!matches || matches?.length > 1) break
					content[index] = content[--index] + content[index + 1]
					content.splice(index, 1)
				}
			}
			content[content.length - 1] = `return ${content[content.length - 1].trim()}`
		}

		const js = await eval(`(async () => { ${content.join('')} })()`)
		console.log(js)

		return Say(msg.channelName,75, `${String(js)}`)
	} catch (e) {
		console.log(e)
		return Say(msg.channelName,75, `Ошибка: ${e}`)
	}
}

export default js