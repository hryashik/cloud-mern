import { RefObject } from 'react'
import { FileType } from '../../api/api'
import { File } from './File/File'
import styles from './FilesList.module.scss'

type FilesListProps = {
	files: FileType[]
	rightClickOnFile: (fileId: string, coordinates: number[]) => void
}

export const FilesList: React.FC<FilesListProps> = ({
	files,
	rightClickOnFile,
}) => {
	const filesMapped = files.map(file =>
		<File
			{...file}
			key={file._id}
			rightClickOnFile={rightClickOnFile}
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