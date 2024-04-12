import {useState, createContext} from 'react'

type SessionKeys =
	| 'error'
	| 'audioDevice'
	| 'audioThreshold'
	| 'speechTimeout'
	| 'speechSensetivity'
	| 'speechSilence'
	| 'twitchChannel'
type SessionTypes = 'localStorage' | 'sessionStorage'

const Session = {
	__storage: localStorage,
	resetSessionType: (storage: SessionTypes) => {
		Session.clear()
		Session.__storage = storage === 'localStorage' ? localStorage : sessionStorage
	},
	set: (key: SessionKeys, value: string) => Session.__storage.setItem(key, value),
	get: (key: SessionKeys) => Session.__storage.getItem(key),
	setUpdate: (key: SessionKeys, update: (value: string) => void) => {
		return (input: string) => {
			Session.set(key, input)
			update(input)
		}
	},
	clear: () => Session.__storage.clear()
}

export const Context = createContext({
	audioDevice: '',
	setAudioDevice: (_: string) => {},
	audioThreshold: '20',
	setAudioThreshold: (_: string) => {},
	speechTimeout: '20',
	setSpeechTimeout: (_: string) => {},
	speechSensetivity: '2',
	setSpeechSensetivity: (_: string) => {},
	speechSilence: '0',
	setSpeechSilence: (_: string) => {},
	error: '',
	setError: (_: string) => {},
	twitchChannel: '',
	setTwitchChannel: (_: string) => {}
})

const SessionContext: React.FC<{children: React.ReactNode}> = ({children}) => {
	const [audioDevice, setAudioDeviceState] = useState<string>(Session.get('audioDevice') || '')
	const setAudioDevice = Session.setUpdate('audioDevice', setAudioDeviceState)

	const [audioThreshold, setAudioThresholdState] = useState<string>(Session.get('audioThreshold') || '5')
	const setAudioThreshold = Session.setUpdate('audioThreshold', setAudioThresholdState)

	const [speechTimeout, setSpeechTimeoutState] = useState<string>(Session.get('speechTimeout') || '15')
	const setSpeechTimeout = Session.setUpdate('speechTimeout', setSpeechTimeoutState)

	const [speechSensetivity, setSpeechSensetivityState] = useState<string>(Session.get('speechSensetivity') || '2')
	const setSpeechSensetivity = Session.setUpdate('speechSensetivity', setSpeechSensetivityState)

	const [twitchChannel, setTwitchChannelState] = useState<string>(Session.get('twitchChannel') || '')
	const setTwitchChannel = Session.setUpdate('twitchChannel', setTwitchChannelState)

	const [speechSilence, setSpeechSilence] = useState<string>(Session.get('speechSilence') || '0')
	const [error, setError] = useState<string>(Session.get('error') || '')

	return (
		<Context.Provider
			value={{
				audioDevice,
				setAudioDevice,
				audioThreshold,
				setAudioThreshold,
				speechTimeout,
				setSpeechTimeout,
				speechSensetivity,
				setSpeechSensetivity,
				speechSilence,
				setSpeechSilence,
				twitchChannel,
				setTwitchChannel,
				error,
				setError
			}}
		>
			{children}
		</Context.Provider>
	)
}

export default SessionContext
