const HyperLinks = () => (
	<div className='row'>
		<div className='column'>
			<img className='logo-img' src='./favicon.jpeg' alt='logo' />
			<h1 className='button-clear logo-text'>Engagement Tools</h1>
		</div>
		<div className='column'>
			<button
				className='button button-clear float-right'
				onClick={() => window.open('https://streamelements.com/lielaiswuu/tip', '_blank')}
			>
				PRO
			</button>
		</div>
	</div>
)

export default HyperLinks
