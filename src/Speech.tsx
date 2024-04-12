import {useContext} from 'react'
import {Context} from './session'

const secondsToMinutesAndSeconds = (seconds: number): string => {
	const minutes = Math.floor(seconds / 60)
	const remainingSeconds = seconds % 60
	const minutesString = minutes.toString().padStart(2, '0')
	const secondsString = remainingSeconds.toString().padStart(2, '0')
	return `${minutesString}:${secondsString}`
}

const Speech = () => {
	const {speechTimeout, setSpeechTimeout, speechSilence} = useContext(Context)

	return (
		<>
			{/*<div className='row'>
				<div className='column'>
					<label>Silence Sensetivity</label>
				</div>
				<div className='column'>
					<label className='float-right'>{secondsToMinutesAndSeconds(parseInt(speechSensetivity))}</label>
				</div>
			</div>
			<div className='row'>
				<div className='column'>
					<input
						value={speechSensetivity}
						onChange={e => setSpeechSensetivity(e.target.value)}
						type='range'
						min='0'
						max='10'
					/>
				</div>
			</div>*/}
			<div className='row'>
				<div className='column'>Speech Timeout</div>
				<div className='column'>
					<label className='float-right'>{secondsToMinutesAndSeconds(parseInt(speechTimeout))}</label>
				</div>
			</div>
			<div className='row'>
				<div className='column'>
					<input
						value={speechTimeout}
						onChange={e => setSpeechTimeout(e.target.value)}
						type='range'
						min='0'
						max='300'
					/>
				</div>
			</div>
			<div className='row'>
				<div className='column'>Silence</div>
				<div className='column'>
					<label className='float-right'>{secondsToMinutesAndSeconds(parseInt(speechSilence))}</label>
				</div>
			</div>
			<div className='row'>
				<div className='column'>
					<meter
						className={parseInt(speechTimeout) > parseInt(speechSilence) ? 'disabled' : 'active'}
						min='0'
						max='300'
						value={speechSilence}
					/>
				</div>
			</div>
		</>
	)
}

export default Speech
