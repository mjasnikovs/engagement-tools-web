import {useEffect, useState, useContext} from 'react'
import {Context} from './session'

export interface AudioInputDeviceInterface {
	kind: MediaDeviceKind
	label: string
	deviceId: string
}

const AudioDeviceSelector = () => {
	const [audioDeviceList, setAudioDeviceList] = useState<AudioInputDeviceInterface[]>([])
	const {audioDevice, setAudioDevice, setError} = useContext(Context)

	const setDefaultAudioDevice = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const find = audioDeviceList.find(d => d.deviceId === e.target.value)
		if (typeof find === 'undefined') return
		setAudioDevice(find.deviceId)
	}

	useEffect(() => {
		const main = async () => {
			await navigator.mediaDevices.getUserMedia({audio: true, video: false})
			const devices = await navigator.mediaDevices.enumerateDevices()
			const audioDevices = devices
				.map(device => {
					return {kind: device.kind, label: device.label, deviceId: device.deviceId}
				})
				.filter(device => device.kind === 'audioinput')

			setAudioDeviceList(audioDevices)
		}

		main().catch(err => {
			if (err instanceof Error) setError(err.message)
		})
	}, [setError])

	return (
		<div className='row'>
			<div className='column'>
				<h5>Audio Device</h5>
				<select onChange={setDefaultAudioDevice} value={audioDevice}>
					{audioDeviceList.map(device => (
						<option key={device.deviceId} value={device.deviceId}>
							{device.label}
						</option>
					))}
				</select>
			</div>
		</div>
	)
}

export default AudioDeviceSelector
