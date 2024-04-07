import {useEffect, useState, useContext} from 'react'
import {Context} from './session'

const buttonText = (connected: boolean | null) => {
	if (connected === null) return 'connect'
	if (connected) return 'connected'
	return 'connecting...'
}

let ws: WebSocket
const twitchUser = new Set()
const latestTwitchUsers: string[] = []

const TwitchChat = () => {
	const {twitchChannel, setTwitchChannel} = useContext(Context)
	const [connected, setConnected] = useState<boolean | null>(null)

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
			if (!data.includes('PRIVMSG')) return

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

	return (
		<div className='container'>
			<div className='row'>
				<div className='column'>
					<label htmlFor='nameField'>Twitch Channel</label>
				</div>
			</div>
			<div className='row'>
				<div className='column'>
					<input
						type='text'
						placeholder='lielaiswuu...'
						id='nameField'
						value={twitchChannel}
						onChange={e => setTwitchChannel(e.target.value)}
					/>
				</div>
				<div className='column'>
					<input
						className='button-primary float-right'
						disabled={!twitchChannel}
						type='button'
						value={buttonText(connected)}
						onClick={connectTwich}
					/>
				</div>
			</div>
			<div className='row'>
				<div className='column'>
					<label>Chat Messages/Minute</label>
				</div>
				<div className='column'>
					<label>Latest Chat Users</label>
				</div>
			</div>
			<div className='row'>
				<div className='column'>
					<p>{latestTwitchUsers.length}</p>
				</div>
				<div className='column'>
					<ul>
						{latestTwitchUsers.map((user, i) => (
							<li key={i}>{user}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default TwitchChat
