import FolderIcon from '@mui/icons-material/Folder';
import React, { useState } from 'react';
import { FileType } from '../../../api/api';
import styles from './File.module.scss'

interface FileProps extends FileType {
	deleteFile: (fileId: string) => void
}

export const File: React.FC<FileProps> = ({ name, date, _id, type, deleteFile }) => {
	const fileDate = date.slice(0, 19).replace('T', ' ')
	return (
		<div className={styles.file} onClick={() => deleteFile(_id)} >
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