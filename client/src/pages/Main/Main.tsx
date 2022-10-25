import { RootState, useAppDispatch } from "../../redux/store"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "../../api/api"
import styles from './Main.module.scss'
import { FilesList } from "../../components/FilesList/FilesList"
import { getFiles } from "../../redux/slices/filesSlice"
import { Popup } from "../../components/Popup/Popup"
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
	async function createDir(name: string) {
		try {
			const resp = await api.createDir(name)
			initialFiles()
			setPopupIsSeen(false)
		} catch (e) {
			console.log(e)
		}

	}

	const [popupIsSeen, setPopupIsSeen] = useState(false)
	useEffect(() => {
		initialFiles()
	}, [])
	if (!isAuth) {
		return <Navigate to="/auth" />
	}
	return (
		<>
			{popupIsSeen === true && <Popup clickOnButton={createDir} />}
			<div className={styles.main}>
				<header>
					<ArrowBackIcon color="disabled" />
					<Button
						variant="outlined"
						color="primary"
						onClick={() => setPopupIsSeen(true)}
					>
						Создать папку
					</Button>
				</header>
				<FilesList files={files.filter(el => el.parent === undefined)} />
			</div>
		</>
	)
}