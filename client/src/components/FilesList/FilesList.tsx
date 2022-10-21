import { File } from './File/File'
import styles from './FilesList.module.scss'

type FilesListProps = {
	files:
	{
		_id: number
		name: string
		type: string
		childs: null
	}[]
}

export const FilesList: React.FC<FilesListProps> = ({ files }) => {
	const filesMapped = files.map(file => <File name={file.name} key={file._id} />)
	return (
		<div className={styles.list}>
			{filesMapped}
		</div>
	)
}