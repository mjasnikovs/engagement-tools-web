import SessionContext from './session'

import Hyperlinks from './HyperLinks'
import AudioDeviceSelector from './AudioDeviceSelector'
import AudioDeviceAnalyser from './AudioDeviceAnalyser'
import Speech from './Speech'
import Errors from './Errors'
import TwitchChat from './TwitchChat'

const App = () => (
	<SessionContext>
		<Hyperlinks />
		<AudioDeviceSelector />
		<AudioDeviceAnalyser />
		<Speech />
		<Errors />
		<div className='container'>
			<hr />
		</div>
		<TwitchChat />
	</SessionContext>
)

export default App
