import SessionContext from './session'

import Hyperlinks from './HyperLinks'
import AudioDeviceSelector from './AudioDeviceSelector'
import AudioDeviceAnalyser from './AudioDeviceAnalyser'
import Speech from './Speech'
import Errors from './Errors'
import TwitchChat from './TwitchChat'
import Footer from './Footer'

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
		<Footer />
	</SessionContext>
)

export default App
