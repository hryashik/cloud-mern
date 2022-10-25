import { FileType } from '../../api/api'
import { File } from './File/File'
import styles from './FilesList.module.scss'

type FilesListProps = {
	files: FileType[]
	deleteFile: (fileId: string) => void
}

export const FilesList: React.FC<FilesListProps> = ({ files, deleteFile }) => {
	const filesMapped = files.map(file => <File {...file} key={file._id} deleteFile={deleteFile} />)
	return (
		<div className={styles.filesList}>
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