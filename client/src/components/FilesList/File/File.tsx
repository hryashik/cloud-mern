import FolderIcon from '@mui/icons-material/Folder';
import React, { MouseEvent, MouseEventHandler, SyntheticEvent } from 'react';
import { FileType } from '../../../api/api';
import styles from './File.module.scss'


export const File: React.FC<FileType> = ({ name, date, type }) => {
	const fileDate = date.slice(0, 19).replace('T', ' ')
	return (
		<div className={styles.file} >
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