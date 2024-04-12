import {useEffect, useState, useContext, useRef} from 'react'
import {Context} from './session'

const buttonText = (connected: boolean | null) => {
	if (connected === null) return 'connect'
	if (connected) return 'connected'
	return 'connecting...'
}

let ws: WebSocket
const twitchUser = new Set()
const latestTwitchUsers: string[] = []
const messagesPerMinute: {time: number; count: number}[] = []

const TwitchChat = () => {
	const {twitchChannel, setTwitchChannel} = useContext(Context)
	const [connected, setConnected] = useState<boolean | null>(null)
	const canvasRef = useRef<HTMLCanvasElement>(null)

	const connectTwich = () => {
		if (ws) ws.close()
		twitchUser.clear()
		ws = new WebSocket('wss://irc-ws.chat.twitch.tv:443')

		ws.onopen = () => {
			setConnected(true)
			ws.send('CAP REQ :twitch.tv/tags')
			ws.send('NICK justinfan9732')
			ws.send('PASS oauth:')
			ws.send(`JOIN #${twitchChannel}`)
		}

		ws.onmessage = e => {
			const data = e.data as string
			if (data.includes('PING')) {
				const pong = data.replace('PING', 'PONG')
				ws.send(pong)
				return
			}

			if (!data.includes('PRIVMSG')) return

			if (messagesPerMinute.length > 60) messagesPerMinute.shift()
			const now = new Date()
			now.setSeconds(0)
			now.setMilliseconds(0)

			const last = messagesPerMinute[messagesPerMinute.length - 1]

			if (last && last.time === now.getTime()) {
				last.count++
			} else {
				messagesPerMinute.push({time: now.getTime(), count: 1})
			}

			const tags = data.split(';')
			const message = tags.find(tag => tag.startsWith('display-name'))

			let name = ''
			if (message) {
				name = message.slice(13)
			} else {
				const userType = tags.find(tag => tag.startsWith('user-type'))
				if (!userType) return
				const base = userType.split('!')
				if (base.length > 0 && base[0].length > 11) name = base[0].slice(11)
			}

			if (name === '') return
			if (twitchUser.has(name)) return
			twitchUser.add(name)
			if (latestTwitchUsers.length >= 5) latestTwitchUsers.pop()
			latestTwitchUsers.unshift(name)
		}

		ws.onerror = e => console.error(e)

		ws.onclose = () => {
			setConnected(false)
		}
	}

	useEffect(() => {
		return () => {
			setConnected(null)
			if (ws) ws.close()
		}
	}, [])

	useEffect(() => {
		const interval = setInterval(() => {
			if (!canvasRef.current) return

			const canvas = canvasRef.current
			const ctx = canvas.getContext('2d')
			if (!ctx) return

			ctx.clearRect(0, 0, canvas.width, canvas.height)
			ctx.fillStyle = 'black'
			ctx.fillRect(0, 0, canvas.width, canvas.height)

			const max = Math.max(...messagesPerMinute.map(m => m.count))
			const height = canvas.height / max

			ctx.fillStyle = '#9b4dca'
			messagesPerMinute.forEach((m, i) => {
				ctx.fillRect(i * 3, canvas.height - m.count * height, 2, m.count * height)
			})

			const messagesMedian = messagesPerMinute.reduce((acc, m) => acc + m.count, 0) / messagesPerMinute.length
			ctx.fillStyle = 'white'
			ctx.font = '20px Arial'
			if (messagesMedian > 0) ctx.fillText(messagesMedian.toFixed(0), 200, 20)
		}, 1000)
		return () => clearInterval(interval)
	}, [])

	return (
		<div className='row'>
			<div className='column'>
				<input
					type='text'
					placeholder='Enter twitch channel name'
					id='nameField'
					value={twitchChannel}
					onChange={e => setTwitchChannel(e.target.value)}
				/>
				<input
					className='button-primary button-outline'
					disabled={!twitchChannel}
					type='button'
					value={buttonText(connected)}
					onClick={connectTwich}
				/>
				<label title='Messages per minute'>MPM</label>
				<canvas ref={canvasRef} width={240} height={145} />
			</div>
			<div className='column'>
				<table>
					<tbody>
						{latestTwitchUsers.map((user, i) => (
							<tr key={i}>
								<td className={i === 4 ? 'no-border' : ''}>
									<label>{user}</label>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default TwitchChat
