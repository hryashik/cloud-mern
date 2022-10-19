import React, { useState } from "react";
import Input from "../../components/UI/Input";
import style from '../Registration/Registration.module.scss'
import { Button, Typography } from '@mui/material'
import { api } from "../../api/api";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
/* import { authUser } from "../../redux/slices/userSlice"; */
import { defineUser } from "../../redux/slices/userSlice";
import { Navigate } from "react-router-dom";

export const Login: React.FC = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [notification, setNotification] = useState('')

	const dispatch = useAppDispatch()
	const isAuth = useSelector((store: RootState) => store.user.isAuth)
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
			return `Такого пользователя не существует`
		}
		if (message.indexOf('password') >= 0) {
			return 'Неверный пароль'
		}
	}

	async function auth() {
		try {
			const resp = await api.login(email, password)
			const data = resp.data
			dispatch(defineUser(data))

		} catch (e: any) {
			const message = e.response.data.message
			console.log(message)
			setNotification(message)
		}
	}
	if (isAuth) {
		return <Navigate to={'/'} />
	}
	return (
		<div className={style.wrapper}>
			{!isAuth ?
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