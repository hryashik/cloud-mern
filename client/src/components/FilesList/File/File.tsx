import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FileType } from '../../../api/api';
import { openDir, setSelectedFile } from '../../../redux/slices/filesSlice';
import { RootState, useAppDispatch } from '../../../redux/store';
import { TextAreaComponent } from '../../TextArea/TextAreaComponent';
import styles from './File.module.scss'


interface FileProps extends FileType {
	rightClickOnFile: (fileId: string, coordinates: number[]) => void
}

export const File: React.FC<FileProps> = ({
	name,
	date,
	_id,
	type,
	rightClickOnFile,
	size
}) => {
	const dispatch = useAppDispatch()
	const fileDate = date.slice(0, 19).replace('T', ' ')
	const selectedFile = useSelector((state: RootState) => state.files.selectedFile)
	const textArea = useSelector((state: RootState) => state.textArea)

	function openDirHandler() {
		if (type === 'dir') {
			dispatch(openDir(_id))
		}
	}
	function onRightClick(event: React.MouseEvent) {
		event.preventDefault()
		rightClickOnFile(_id, [event.pageX, event.pageY])
	}
	function onLeftClick() {
		dispatch(setSelectedFile(_id))
	}
	return (
		<div
			className={selectedFile === _id ? [styles.file, styles.selected].join(' ') : styles.file}
			onClick={onLeftClick}
			onDoubleClick={openDirHandler}
			onContextMenu={onRightClick}
		>
			<div className={styles.name}>
				{type === 'dir'
					? <FolderIcon color='action' />
					: <InsertDriveFileIcon color='action' />
				}

				{textArea.id !== _id
					? <p>{name}</p>
					: <TextAreaComponent fileId={_id} />
				}
			</div>



			<p>{fileDate}</p>
			<p>{type === 'dir' ? 'Папка' : 'Файл'}</p>
			<p>{size}</p>
		</div>
	)
}