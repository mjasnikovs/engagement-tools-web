import {FacebookShare, TwitterShare, LinkedinShare, TelegramShare} from 'react-share-kit'

const props = {
	url: 'https://egtools.app',
	title: 'Engagement-Tools: Enhancing Interaction During Live Streams',
	quote: 'Engagement-Tools: Enhancing Interaction During Live Streams',
	blankTarget: true,
	size: 30
}

const Footer = () => (
	<div className='container'>
		<div className='row'>
			<div className='column'>
				<div className='float-right'>
					<FacebookShare {...props} />
					<TwitterShare {...props} />
					<LinkedinShare {...props} />
					<TelegramShare {...props} />
				</div>
			</div>
		</div>
	</div>
)

export default Footer
