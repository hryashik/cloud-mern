import preloader from '../../assets/gif/preloader.gif'
import styles from './Preloader.module.scss'

export const Preloader: React.FC = () => {
	return (
		<>
			<img className={styles.preloader} src={preloader} alt="Идет загрузка..." />
		</>
	)
}