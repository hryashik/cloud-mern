import { RootState, useAppDispatch } from "../../redux/store"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { useEffect } from "react"
import { api } from "../../api/api"
import styles from './Main.module.scss'
import { FilesList } from "../../components/FilesList/FilesList"
import { getFiles } from "../../redux/slices/filesSlice"

/* const files = [
	{ _id: 1, name: 'first_dir', type: 'dir', childs: null, date: new Date() },
	{ _id: 2, name: 'second_dirrrrrrr', type: 'dir', childs: null, date: new Date() }
] */

export const Main: React.FC = () => {
	const dispatch = useAppDispatch()
	const files = useSelector((state: RootState) => state.files.files)
	const isAuth = useSelector((state: RootState) => state.user.isAuth)
	const currentDir = useSelector((state: RootState) => state.files.currentDir)

	async function initialFiles() {
		try {
			const response = await api.getFiles()
			const data = response?.data
			console.log(data)
			if (data !== undefined) dispatch(getFiles(data))
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		initialFiles()
	}, [])
	if (!isAuth) {
		return <Navigate to="/auth" />
	}
	return (
		<div className={styles.main}>

			<FilesList files={files.filter(el => el.parent === undefined)} />
		</div>
	)
}