import { RootState, useAppDispatch } from "../../redux/store"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import React, { RefObject, useEffect, useState } from "react"
import { api, FileType } from "../../api/api"
import styles from './Main.module.scss'
import { FilesList } from "../../components/FilesList/FilesList"
import { deleteFileThunk, getFiles, outDir, renameSelectFile, setCurrentDir, setSelectedFile } from "../../redux/slices/filesSlice"
import { Popup } from "../../components/Popup/Popup"
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ContextMenu } from "../../components/ContextMenu/ContextMenu"
import { deleteArea, initArea } from "../../redux/slices/textAreaSlice"

export type contextMenuType = {
	visible: boolean
	coordinates: number[]
}

export const Main: React.FC = () => {
	const dispatch = useAppDispatch()
	const files = useSelector((state: RootState) => state.files.files)
	const selectedFile = useSelector((state: RootState) => state.files.selectedFile)
	const isAuth = useSelector((state: RootState) => state.user.isAuth)
	const currentDir = useSelector((state: RootState) => state.files.currentDir)
	const pathStack = useSelector((state: RootState) => state.files.pathStack)
	const textArea = useSelector((state: RootState) => state.textArea)

	const [visiblePopUp, setVisiblePopUp] = useState(false)
	const [contextMenu, setContextMenu] = useState({ visible: false, coordinates: [0, 0] })

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
	function backClickHandler() {
		if (pathStack.length > 1) {
			dispatch(outDir())
		}
	}
	function rightClickOnFile(fileId: string, coordinates: number[]) {
		dispatch(setSelectedFile(fileId))
		if (!textArea.id) {
			setContextMenu({ visible: true, coordinates })
		}
	}
	async function contextMenuDelete() {
		await dispatch(deleteFileThunk(selectedFile))
		setContextMenu({ visible: false, coordinates: [] })
	}
	function contextMenuRename() {
		const { _id, name } = files.find(el => el._id === selectedFile) as FileType
		dispatch(initArea({ _id, name }))
		setContextMenu({ visible: false, coordinates: [] })
	}
	function hiddenContextAndSelect() {
		setContextMenu({ visible: false, coordinates: [] })
		dispatch(setSelectedFile(''))
	}
	async function clickOnMainDiv() {
		if (textArea.isSeen) {
			const { name } = files.find(el => el._id === textArea.id) as FileType
			if (name !== textArea.value) {
				const resp = await api.renameFile(selectedFile, textArea.value)
				dispatch(renameSelectFile(textArea.value))
			}
			dispatch(deleteArea())
		}
		if (selectedFile) dispatch(setSelectedFile(''))
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
			{contextMenu.visible &&
				<ContextMenu
					contextMenu={contextMenu}
					contextMenuRename={contextMenuRename}
					contextMenuDelete={contextMenuDelete}
					hiddenContext={hiddenContextAndSelect}
				/>}
			<div className={styles.main} onClick={clickOnMainDiv}>
				<header>
					<ArrowBackIcon
						color={pathStack.length > 1 ? 'primary' : 'disabled'}
						onClick={backClickHandler}
						style={{ cursor: pathStack.length > 1 ? 'pointer' : '' }} />
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
					files={files}
					rightClickOnFile={rightClickOnFile}
				/>
			</div>
		</>
	)
}