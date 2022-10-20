import preloader from '../../assets/gif/preloader.gif'

export const Preloader: React.FC = () => {
	return (
		<>
			<img src={preloader} alt="Идет загрузка..." />
		</>
	)
}