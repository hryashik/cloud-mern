import React, { useState } from "react";
import Input from "../../components/UI/Input";
import style from './Registration.module.scss'
import { Button, Typography } from '@mui/material'
import { api } from "../../api/api";
import { Link } from "react-router-dom";

export const Registration: React.FC = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isRegister, setRegister] = useState(false)
	const [notification, setNotification] = useState('')
	function changeEmail(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value
		setEmail(value)
	}
	function changePassword(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value
		setPassword(value)
	}
	function handlerError(message: string) {
		//Перебираю ошибки
		if (message.indexOf('Uncorrect') >= 0) {
			return 'Форма некорректно заполнена'
		}
		if (message.indexOf('exist')) {
			const user = message.split(' ')[2]
			return `Пользователь ${user} уже существует`
		}
	}

	async function registration() {
		try {
			const resp = await api.registration(email, password)
			setRegister(true)
		} catch (e: any) {
			const message = e.response.data.message
			setNotification(message)
			console.log(e)
		}
	}
	return (
		<div className={style.wrapper}>
			{!isRegister ?
				<div className={style.registration}>
					<Typography fontSize={"20px"} variant={"h3"}>Форма регистрации</Typography>
					<Input focus={true} value={email} label="Email" onChange={changeEmail} />
					<Input value={password} label="Password" onChange={changePassword} />
					<Button onClick={registration} variant="contained">Зарегистрироваться</Button>
					{notification && <Typography variant="subtitle1">{handlerError(notification)}</Typography>}
				</div>
				:
				<div>
					<Typography>Регистрация прошла успешно</Typography>
					<Link to="/">Перейти на свою страницу</Link>
				</div>
			}

		</div>
	);
}