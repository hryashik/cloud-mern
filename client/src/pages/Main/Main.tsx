import { RootState, useAppDispatch } from "../../redux/store"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { api, FileType } from "../../api/api"
import styles from './Main.module.scss'
import { FilesList } from "../../components/FilesList/FilesList"
import { createDirThunk, deleteFileThunk, initialFilesThunk, renameSelectFile, setSelectedFile, SortType, uploadFileThunk } from "../../redux/slices/filesSlice"
import { Popup } from "../../components/Popup/Popup"
import { ContextMenu } from "../../components/ContextMenu/ContextMenu"
import { deleteArea, initArea } from "../../redux/slices/textAreaSlice"
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { BreadCrumbsComponent } from "../../components/BreadCrumbsComponent/BreadCrumbsComponent"
import MainOptions from "../../components/MainOptions/MainOptions"

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
	const selectedSort = useSelector((state: RootState) => state.files.sortType) as SortType
	const textArea = useSelector((state: RootState) => state.textArea)

	const [visiblePopUp, setVisiblePopUp] = useState(false)
	const [contextMenu, setContextMenu] = useState({ visible: false, coordinates: [0, 0] })
	const [dragEnter, setDragEnter] = useState(false)
	const [viewTemplate, setViewTemplate] = useState<'list' | 'module'>('list')

	function createDir(nameDir: string) {
		dispatch(createDirThunk({ nameDir, parentId: currentDir }))
		setVisiblePopUp(false)
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
		dispatch(initialFilesThunk({ parentId: currentDir, selectedSort }))
	}, [currentDir, selectedSort, dispatch])

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
				<MainOptions setVisiblePopUp={setVisiblePopUp} currentDir={currentDir} />
				<div className={styles.path}>
					<BreadCrumbsComponent />
				</div>
				<FilesList
					files={files}
					rightClickOnFile={rightClickOnFile}
					viewTemplate={viewTemplate}
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