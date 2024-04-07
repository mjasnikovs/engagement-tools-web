import {useContext} from 'react'
import {Context} from './session'

const Errors = () => {
	const {error, setError} = useContext(Context)

	if (error === '') return null
	return (
		<div className='container'>
			{error && (
				<blockquote>
					<h5>Error</h5>
					<p>{error}</p>
					<input onClick={() => setError('')} className='button button-clear' type='button' value='Clear' />
				</blockquote>
			)}
		</div>
	)
}

export default Errors
