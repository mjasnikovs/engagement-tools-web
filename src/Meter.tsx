type MeterProps = {
	active: boolean
	value: number
	max: number
}

const Meter: React.FC<MeterProps> = ({value, max, active}) => (
	<div className={`meter ${active ? 'meter-bar-active' : 'meter-bar-inactive'}`}>
		<div className='meter-bar' style={{width: `${(value / max) * 100}%`}}></div>
	</div>
)

export default Meter
