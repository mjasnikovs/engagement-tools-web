import {FacebookShare, TwitterShare, LinkedinShare, TelegramShare, WhatsappShare} from 'react-share-kit'

const props = {
	url: 'https://egtools.app',
	title: 'Engagement-Tools: Enhancing Interaction During Live Streams',
	quote: 'Engagement-Tools: Enhancing Interaction During Live Streams',
	blankTarget: true,
	size: 40
}

const Footer = () => (
	<div className='row'>
		<div className='column'>
			<button
				className='button button-clear'
				onClick={() => window.open('https://streamelements.com/lielaiswuu/tip', '_blank')}
			>
				tip
			</button>
			<button
				className='button button-clear'
				onClick={() => window.open('https://github.com/mjasnikovs/engagement-tools-web', '_blank')}
			>
				github
			</button>
		</div>
		<div className='column'>
			<div className='float-right'>
				<FacebookShare {...props} />
				<TwitterShare {...props} />
				<LinkedinShare {...props} />
				<TelegramShare {...props} />
				<WhatsappShare {...props} />
			</div>
		</div>
	</div>
)

export default Footer
