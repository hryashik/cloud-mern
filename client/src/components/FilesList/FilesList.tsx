import React from 'react'
import { FileType } from '../../api/api'
import { File } from './File/File'
import styles from './FilesList.module.scss'

type FilesListProps = {
	files: FileType[]
	rightClickOnFile: (fileId: string, coordinates: number[]) => void
	viewTemplate: 'list' | 'module'
}

export const FilesList: React.FC<FilesListProps> = ({
	files,
	rightClickOnFile,
	viewTemplate
}) => {
	const filesMapped = files.map(file =>
		<File
			{...file}
			key={file._id}
			rightClickOnFile={rightClickOnFile}
		/>)
	console.log('fileslist render')
	return (
		<div className={styles.filesList} onClick={(e) => e.stopPropagation()}>
			<header >
				<p>Имя</p>
				<p>Дата создания</p>
				<p>Тип</p>
				<p>Размер</p>
			</header>
			{filesMapped}
		</div>
	)
}