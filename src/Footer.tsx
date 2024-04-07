const HyperLinks = () => (
	<div className='container'>
		<div className='row'>
			<div className='column'>
				<button
					className='button button-clear float-right'
					onClick={() => window.open('https://streamelements.com/lielaiswuu/tip', '_blank')}
				>
					tip
				</button>
				<button
					className='button button-clear float-right'
					onClick={() => window.open('https://github.com/mjasnikovs/engagement-tools', '_blank')}
				>
					github
				</button>
			</div>
		</div>
	</div>
)

export default HyperLinks
