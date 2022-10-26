import styles from './Popup.module.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react'

type PopupProps = {
	clickOnButton: (bool: string) => void
	hiddenPopUp: (bool: boolean) => void
}

export const Popup: React.FC<PopupProps> = ({ clickOnButton, hiddenPopUp }) => {
	const [inputValue, setInputValue] = useState('')
	function hidden(e: React.MouseEvent) {
		hiddenPopUp(false)
	}
	return (
		<div className={styles.popupWrapper} onClick={hidden}>
			<div className={styles.popup} onClick={e => e.stopPropagation()}>
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