import { RootState, useAppDispatch } from "../../redux/store"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import React, { ChangeEvent, useEffect, useState } from "react"
import { api, FileType } from "../../api/api"
import styles from './Main.module.scss'
import { FilesList } from "../../components/FilesList/FilesList"
import { createDirThunk, deleteFileThunk, initialFilesThunk, outDir, renameSelectFile, setCurrentDir, setSelectedFile, uploadFileThunk } from "../../redux/slices/filesSlice"
import { Popup } from "../../components/Popup/Popup"
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ContextMenu } from "../../components/ContextMenu/ContextMenu"
import { deleteArea, initArea } from "../../redux/slices/textAreaSlice"
import UploadFileIcon from '@mui/icons-material/UploadFile';

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
	const [dragEnter, setDragEnter] = useState(false)

	function createDir(nameDir: string) {
		dispatch(createDirThunk({ nameDir, parentId: currentDir }))
		setVisiblePopUp(false)
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
	function contextMenuDelete() {
		dispatch(deleteFileThunk(selectedFile))
		setContextMenu({ visible: false, coordinates: [] })
	}
	function contextMenuRename() {
		const { _id, name } = files.find(el => el._id === selectedFile) as FileType
		dispatch(initArea({ _id, name }))
		setContextMenu({ visible: false, coordinates: [] })
	}
	function contextMenuDownload() {
		const file = files.find(el => el._id === selectedFile)
		if (file) api.downloadFile(file)
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
	async function uploadFileHandler(event: ChangeEvent<HTMLInputElement>) {
		const fileList = event.target.files
		if (fileList) {
			const files = Array.from(fileList)
			files.forEach(file => dispatch(uploadFileThunk({ file, currentDir })))
		}
	}
	function dragEnterHandler(event: React.DragEvent<HTMLDivElement>) {
		event.preventDefault()
		event.stopPropagation()
		setDragEnter(true)
	}
	function dragLeaveHandler(event: React.DragEvent<HTMLDivElement>) {
		event.preventDefault()
		event.stopPropagation()
		setDragEnter(false)
	}
	function onDrop(event: React.DragEvent) {
		event.preventDefault()
		event.stopPropagation()
		const files = Array.from(event.dataTransfer.files)
		files.forEach(file => dispatch(uploadFileThunk({ file, currentDir })))
		setDragEnter(false)
	}
	useEffect(() => {
		dispatch(initialFilesThunk(currentDir))
	}, [currentDir])

	if (!isAuth) {
		return <Navigate to="/auth" />
	}
	return (!dragEnter ?
		<>
			{visiblePopUp === true && <Popup hiddenPopUp={setVisiblePopUp} clickOnButton={createDir} />}
			{contextMenu.visible &&
				<ContextMenu
					contextMenu={contextMenu}
					contextMenuRename={contextMenuRename}
					contextMenuDelete={contextMenuDelete}
					contextMenuDownload={contextMenuDownload}
					hiddenContext={hiddenContextAndSelect}
				/>
			}
			<div
				className={styles.main}
				onClick={clickOnMainDiv}
				onDragEnter={dragEnterHandler}
				onDragLeave={dragLeaveHandler}
				onDragOver={dragEnterHandler}
			>
				<header>
					<ArrowBackIcon
						color={pathStack.length > 1 ? 'primary' : 'disabled'}
						onClick={backClickHandler}
						style={{ cursor: pathStack.length > 1 ? 'pointer' : '' }} />
					<Button
						className={styles.createDirButton}
						variant="outlined"
						color="primary"
						onClick={() => setVisiblePopUp(true)}
					>
						Создать папку
					</Button>
					<Button variant="contained" component="label">
						Загрузить файл
						<input hidden accept="image/*" multiple type="file" onChange={uploadFileHandler} />
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
		:
		<div
			className={styles.dragArea}
			onDragEnter={dragEnterHandler}
			onDragLeave={dragLeaveHandler}
			onDragOver={dragEnterHandler}
			onDrop={onDrop}
		>
			<p>Перетащите файлы сюда</p>
			<UploadFileIcon fontSize="large" color="primary" />
		</div>
	)
}