import styles from './Popup.module.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react'

type PopupProps = {
	clickOnButton: (bool: string) => void
}

export const Popup: React.FC<PopupProps> = ({ clickOnButton }) => {
	const [inputValue, setInputValue] = useState('')
	return (
		<div className={styles.popupWrapper}>
			<div className={styles.popup}>
				<TextField
					autoFocus={true}
					label="Название папки"
					variant="standard"
					onChange={(e) => setInputValue(e.target.value)}
				/>
				<Button
					variant='text'
					onClick={() => clickOnButton(inputValue)}
				>
					Создать
				</Button>
			</div>
		</div>
	)
}