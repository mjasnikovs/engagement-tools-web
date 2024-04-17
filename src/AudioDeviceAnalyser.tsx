import {useEffect, useContext, useState} from 'react'
import {Context} from './session'
import Meter from './Meter'

let speechTime: number = 0

const AudioDeviceAnalyser = () => {
	const {
		audioDevice,
		audioThreshold,
		setAudioThreshold,
		speechSensetivity,
		speechTimeout,
		speechSilence,
		setSpeechSilence,
		setError
	} = useContext(Context)

	const [audioPeak, setAudioPeak] = useState(0)

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (parseInt(speechSilence) + 1 > parseInt(speechTimeout)) {
				document.body.classList.add('pulls')
				document.title = 'Speek Up!'
			} else {
				document.body.classList.remove('pulls')
				document.title = 'egtools'
			}
			setSpeechSilence(String(parseInt(speechSilence) + 1))
		}, 1000)
		return () => clearTimeout(timeout)
	}, [speechSilence, speechTimeout, setSpeechSilence])

	useEffect(() => {
		if (audioPeak >= parseInt(audioThreshold)) {
			speechTime += 100
		} else {
			speechTime -= 100
		}
		if (speechTime < 0) speechTime = 0

		if (speechTime > parseInt(speechSensetivity) * 1000) {
			speechTime = 0
			setSpeechSilence('0')
		}
	}, [audioPeak, audioThreshold, speechSensetivity, setSpeechSilence])

	useEffect(() => {
		let source: MediaStreamAudioSourceNode | null = null
		let audioContext: AudioContext | null = null
		let audioStream: MediaStream | null = null
		let interval: NodeJS.Timeout | null = null

		const main = async () => {
			if (audioDevice === null) return

			audioStream = await navigator.mediaDevices.getUserMedia({
				audio: {
					deviceId: audioDevice
				},
				video: false
			})

			audioContext = new AudioContext()
			const analyser = audioContext.createAnalyser()
			analyser.fftSize = 128
			const bufferLength = analyser.frequencyBinCount
			const dataArray = new Uint8Array(bufferLength)

			source = audioContext.createMediaStreamSource(audioStream)
			source.connect(analyser)

			interval = setInterval(() => {
				analyser.getByteFrequencyData(dataArray)
				setAudioPeak((Math.max(...dataArray) / 255) * 100)
			}, 100)
		}

		main().catch(err => {
			if (err instanceof Error) setError(err.message)
		})

		return () => {
			if (interval) clearInterval(interval)
			if (source) source.disconnect()
			if (audioContext) audioContext.close().catch(console.error)
			if (audioStream) audioStream.getTracks().forEach(track => track.stop())
		}
	}, [audioDevice, setError])

	return (
		<>
			<div className='row'>
				<div className='column'>
					<Meter
						active={audioPeak > parseInt(audioThreshold)}
						max={100}
						value={Number(audioPeak.toFixed(0))}
					/>
				</div>
			</div>
			<div className='row'>
				<div className='column'>Audio Threshold</div>
				<div className='column'>
					<label className='float-right'>{audioThreshold}</label>
				</div>
			</div>
			<div className='row'>
				<div className='column'>
					<input
						value={audioThreshold}
						onChange={e => setAudioThreshold(e.target.value)}
						type='range'
						min='0'
						max='100'
					/>
				</div>
			</div>
		</>
	)
}

export default AudioDeviceAnalyser
