import { RootState, useAppDispatch } from "../../redux/store"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import React, { RefObject, useEffect, useState } from "react"
import { api, FileType } from "../../api/api"
import styles from './Main.module.scss'
import { FilesList } from "../../components/FilesList/FilesList"
import { getFiles, outDir, setCurrentDir } from "../../redux/slices/filesSlice"
import { Popup } from "../../components/Popup/Popup"
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ContextMenu } from "../../components/ContextMenu/ContextMenu"
import { changeAreaValue } from "../../redux/slices/textAreaSlice"

export type contextMenuType = {
	visible: boolean
	coordinates: number[]
}

export const Main: React.FC = () => {
	const dispatch = useAppDispatch()
	const files = useSelector((state: RootState) => state.files.files)
	const isAuth = useSelector((state: RootState) => state.user.isAuth)
	const currentDir = useSelector((state: RootState) => state.files.currentDir)
	const pathStack = useSelector((state: RootState) => state.files.pathStack)
	const textAreaValue = useSelector((state: RootState) => state.textArea.value)

	const [visiblePopUp, setVisiblePopUp] = useState(false)
	const [selectedFile, setSelectedFile] = useState('')
	const [contextMenu, setContextMenu] = useState({ visible: false, coordinates: [0, 0] })
	const [textAreaId, setTextAreaId] = useState('')

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
		if (contextMenu && id !== selectedFile) {
			setTextAreaId('')
		}
	}
	function backClickHandler() {
		if (pathStack.length > 1) {
			dispatch(outDir())
		}
	}
	function rightClickOnFile(fileId: string, coordinates: number[]) {
		if (!textAreaId) {
			setContextMenu({ visible: true, coordinates })
		}
	}
	async function contextMenuDelete() {
		await deleteFile(selectedFile)
		setSelectedFile('')
		setContextMenu({ visible: false, coordinates: [] })
	}
	function renameFile() {
		setTextAreaId(selectedFile)
		setContextMenu({ visible: false, coordinates: [] })
		const selectedFileName = files.find(el => el._id === selectedFile)?.name as string
		dispatch(changeAreaValue(selectedFileName))
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
			{contextMenu.visible && <ContextMenu
				renameFile={renameFile}
				contextMenu={contextMenu}
				setContextMenu={setContextMenu}
				contextMenuDelete={contextMenuDelete}
			/>}
			<div className={styles.main} onClick={() => {
				setSelectedFile('')
				setTextAreaId('')
				const selectedFileName = files.find(el => el._id === selectedFile)?.name
				if (selectedFile && textAreaValue !== selectedFileName) {
					console.log('Текст был изменен')
				}
			}}>
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
					deleteFile={deleteFile}
					files={files}
					selectedFile={selectedFile}
					selectFile={selectFile}
					rightClickOnFile={rightClickOnFile}
					textAreaId={textAreaId}
				/>
			</div>
		</>
	)
}