import { RootState, useAppDispatch } from "../../redux/store"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import React, { RefObject, useEffect, useState } from "react"
import { api } from "../../api/api"
import styles from './Main.module.scss'
import { FilesList } from "../../components/FilesList/FilesList"
import { getFiles, outDir, setCurrentDir } from "../../redux/slices/filesSlice"
import { Popup } from "../../components/Popup/Popup"
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { style } from "@mui/system"

export const Main: React.FC = () => {
	const dispatch = useAppDispatch()
	const files = useSelector((state: RootState) => state.files.files)
	const isAuth = useSelector((state: RootState) => state.user.isAuth)
	const currentDir = useSelector((state: RootState) => state.files.currentDir)
	const pathStack = useSelector((state: RootState) => state.files.pathStack)
	const [visiblePopUp, setVisiblePopUp] = useState(false)
	const [selectedFile, setSelectedFile] = useState('')

	async function initialFiles() {
		try {
			const response = await api.getFiles(currentDir)
			const data = response?.data
			console.log(data)
			if (data !== undefined) dispatch(getFiles(data))
		} catch (e) {
			console.log(e)
		}
	}
	async function createDir(name: string) {
		try {
			const resp = await api.createDir(name, currentDir)
			initialFiles()
			setVisiblePopUp(false)
		} catch (e) {
			console.log(e)
		}

	}
	async function deleteFile(fileId: string) {
		try {
			const resp = await api.deleteFile(fileId)
			initialFiles()
		} catch (e) {
			console.log(e)
		}
	}
	function selectFile(id: string) {
		setSelectedFile(id)
	}
	function backClickHandler() {
		if (pathStack.length > 1) {
			dispatch(outDir())
		}
	}
	useEffect(() => {
		initialFiles()
	}, [currentDir])
	if (!isAuth) {
		return <Navigate to="/auth" />
	}
	return (
		<>
			{visiblePopUp === true && <Popup hiddenPopUp={setVisiblePopUp} clickOnButton={createDir} />}
			<div className={styles.main}>
				<header>
					<ArrowBackIcon color={pathStack.length > 1 ? 'primary' : 'disabled'} onClick={backClickHandler} />
					<Button
						variant="outlined"
						color="primary"
						onClick={() => setVisiblePopUp(true)}
					>
						Создать папку
					</Button>
				</header>
				<div className={styles.path}>
					<a href="#">/root/{currentDir}</a>
				</div>
				<FilesList
					deleteFile={deleteFile}
					files={files}
					selectedFile={selectedFile}
					selectFile={selectFile}
				/>
			</div>
		</>
	)
}