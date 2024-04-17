import {useState} from 'react'

const HyperLinks = () => {
	const [openDialog, setOpenDialog] = useState(false)

	return (
		<div className='row'>
			<div className='column'>
				<img className='logo-img' src='./favicon.jpeg' alt='logo' />
				<h1 className='button-clear logo-text'>Engagement Tools</h1>
			</div>
			<div className='column'>
				<button className='button button-clear float-right' onClick={() => setOpenDialog(true)}>
					How it works? 🎬
				</button>
			</div>
			{openDialog && (
				<dialog open>
					<div className='container'>
						<div className='row'>
							<div className='column'>
								<center>
									<iframe
										style={{border: 'none'}}
										width='320'
										height='569'
										src='https://www.youtube-nocookie.com/embed/_5vtalwHYrQ?autoplay=1&si=ayCEwvp9ncU9BX7Z&amp;controls=0'
										title='How it works? 🎬'
										allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
									/>
								</center>
								<br />
								<button className='button' onClick={() => setOpenDialog(false)}>
									close
								</button>
							</div>
						</div>
					</div>
				</dialog>
			)}
		</div>
	)
}

export default HyperLinks
