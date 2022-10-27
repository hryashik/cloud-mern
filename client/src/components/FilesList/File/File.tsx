import FolderIcon from '@mui/icons-material/Folder';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FileType } from '../../../api/api';
import { openDir } from '../../../redux/slices/filesSlice';
import { RootState, useAppDispatch } from '../../../redux/store';
import { TextAreaComponent } from '../../TextArea/TextAreaComponent';
import styles from './File.module.scss'


interface FileProps extends FileType {
	deleteFile: (fileId: string) => void
	selectFile: (id: string) => void
	selectedFile: string
	rightClickOnFile: (fileId: string, coordinates: number[]) => void
	textAreaId: string
}

export const File: React.FC<FileProps> = ({
	name,
	date,
	_id,
	type,
	selectedFile,
	textAreaId,
	deleteFile,
	selectFile,
	rightClickOnFile
}) => {
	const dispatch = useAppDispatch()
	const fileDate = date.slice(0, 19).replace('T', ' ')

	function openDirHandler() {
		dispatch(openDir(_id))
	}
	function onRightClick(event: React.MouseEvent) {
		event.preventDefault()
		rightClickOnFile(_id, [event.pageX, event.pageY])
		selectFile(_id)
	}

	return (
		<div
			className={selectedFile === _id ? [styles.file, styles.selected].join(' ') : styles.file}
			onClick={() => selectFile(_id)}
			onDoubleClick={openDirHandler}
			onContextMenu={onRightClick}
		>
			<div className={styles.name}>
				<FolderIcon color='action' />
				{textAreaId !== _id
					? <p>{name}</p>
					: <TextAreaComponent fileId={_id} />
				}
			</div>



			<p>{fileDate}</p>
			<p>{type === 'dir' ? 'Папка' : 'Файл'}</p>
			<p>Размер файла</p>
		</div>
	)
}