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
		<div className='container'>
			<Hyperlinks />
			<TwitchChat />
			<hr />
			<AudioDeviceSelector />
			<AudioDeviceAnalyser />
			<Speech />
			<Errors />
			<hr />
			<Footer />
		</div>
	</SessionContext>
)

export default App
