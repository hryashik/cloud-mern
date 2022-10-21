import { RootState } from "../../redux/store"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { useEffect } from "react"
import { api } from "../../api/api"
import styles from './Main.module.scss'
import { FilesList } from "../../components/FilesList/FilesList"

const files = [
	{ _id: 1, name: 'first_dir', type: 'dir', childs: null },
	{ _id: 2, name: 'second_dirrrrrrr', type: 'dir', childs: null }
]

export const Main: React.FC = () => {
	const isAuth = useSelector((state: RootState) => state.user.isAuth)
	/* useEffect(() => {
		api.getFiles()
			.then(resp => console.log(resp))
	}, []) */
	if (!isAuth) {
		return <Navigate to="/auth" />
	}
	return (
		<div className={styles.main}>
			<FilesList files={files} />
		</div>
	)
}