import { RefObject } from 'react'
import { FileType } from '../../api/api'
import { File } from './File/File'
import styles from './FilesList.module.scss'

type FilesListProps = {
	files: FileType[]
	selectedFile: string
	deleteFile: (fileId: string) => void
	selectFile: (id: string) => void
	rightClickOnFile: (fileId: string, coordinates: number[]) => void
	textAreaId: string
}

export const FilesList: React.FC<FilesListProps> = ({
	files,
	deleteFile,
	selectedFile,
	selectFile,
	rightClickOnFile,
	textAreaId
}) => {
	const filesMapped = files.map(file =>
		<File
			{...file}
			key={file._id}
			selectedFile={selectedFile}
			deleteFile={deleteFile}
			selectFile={selectFile}
			rightClickOnFile={rightClickOnFile}
			textAreaId={textAreaId}
		/>)
	return (
		<div className={styles.filesList} onClick={(e) => e.stopPropagation()}>
			<header>
				<p>Имя</p>
				<p>Дата создания</p>
				<p>Тип</p>
				<p>Размер</p>
			</header>
			{filesMapped}
		</div>
	)
}