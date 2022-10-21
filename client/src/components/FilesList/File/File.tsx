import FolderIcon from '@mui/icons-material/Folder';
import styles from './File.module.scss'

type FileType = {
	name: string
}

export const File: React.FC<FileType> = ({ name }) => {
	return (
		<div className={styles.file}>
			<FolderIcon color='action' />
			<p>{name}</p>
		</div>
	)
}