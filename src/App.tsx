import SessionContext from './session'

import AudioDeviceSelector from './AudioDeviceSelector'
import AudioDeviceAnalyser from './AudioDeviceAnalyser'
import Speech from './Speech'
import Errors from './Errors'
import Footer from './Footer'

const App = () => (
	<SessionContext>
		<AudioDeviceSelector />
		<AudioDeviceAnalyser />
		<Speech />
		<Errors />
		<Footer />
	</SessionContext>
)

export default App
