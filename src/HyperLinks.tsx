const HyperLinks = () => (
	<div className='container'>
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
					tip
				</button>
				<button
					className='button button-clear float-right'
					onClick={() => window.open('https://github.com/mjasnikovs/engagement-tools-web', '_blank')}
				>
					github
				</button>
			</div>
		</div>
	</div>
)

export default HyperLinks
