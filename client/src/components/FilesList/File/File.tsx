import FolderIcon from '@mui/icons-material/Folder';
import React from 'react';
import { useSelector } from 'react-redux';
import { FileType } from '../../../api/api';
import { openDir } from '../../../redux/slices/filesSlice';
import { RootState, useAppDispatch } from '../../../redux/store';
import styles from './File.module.scss'


interface FileProps extends FileType {
	deleteFile: (fileId: string) => void
	selectFile: (id: string) => void
	selectedFile: string
}

export const File: React.FC<FileProps> = ({ name, date, _id, type, selectedFile, deleteFile, selectFile }) => {
	const dispatch = useAppDispatch()
	const currentDir = useSelector((state: RootState) => state.files.currentDir)
	const fileDate = date.slice(0, 19).replace('T', ' ')
	function openDirHandler() {
		dispatch(openDir(_id))
	}
	return (
		<div
			className={selectedFile === _id ? [styles.file, styles.selected].join(' ') : styles.file}
			onClick={openDirHandler}
		>
			<div className={styles.name}>
				<FolderIcon color='action' />
				<p>{name}</p>
			</div>
			<p>{fileDate}</p>
			<p>{type === 'dir' ? 'Папка' : 'Файл'}</p>
			<p>Размер файла</p>
		</div>
	)
}