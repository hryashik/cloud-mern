import React, { useState } from "react";
import Input from "../../components/UI/Input";
import style from '../Registration/Registration.module.scss'
import { Button, Typography } from '@mui/material'
import { api } from "../../api/api";
import { Link } from "react-router-dom";

export const Login: React.FC = () => {
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
		if (message.indexOf('User') >= 0) {
			const email = message.split(' ')[1]
			return `Такого пользователя не существует`
		}
		if (message.indexOf('password') >= 0) {
			return 'Неверный пароль'
		}
	}

	async function auth() {
		try {
			const resp = await api.auth(email, password)
		} catch (e: any) {
			const message = e.response.data.message
			setNotification(message)
			console.log(message)
		}
	}
	return (
		<div className={style.wrapper}>
			{!isRegister ?
				<div className={style.registration}>
					<Typography fontSize={"20px"} variant={"h3"}>Форма авторизации</Typography>
					<Input focus={true} value={email} label="Email" onChange={changeEmail} />
					<Input value={password} label="Password" onChange={changePassword} />
					<Button onClick={auth} variant="contained">Войти</Button>
					{notification && <Typography variant="subtitle1">{handlerError(notification)}</Typography>}
				</div>
				:
				''
			}

		</div>
	);
}