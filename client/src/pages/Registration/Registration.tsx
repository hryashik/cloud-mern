import React, { useState } from "react";
import Input from "../../components/UI/Input";
import style from './Registration.module.scss'
import { Button, Typography } from '@mui/material'

export const Registration: React.FC = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	function changeEmail(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value
		setEmail(value)
	}
	function changePassword(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value
		setPassword(value)
	}
	function registration() {

	}
	return (
		<div className={style.wrapper}>
			<div className={style.registration}>
				<Typography fontSize={"20px"} variant={"h3"}>Registration form</Typography>
				<Input value={email} label="Email" onChange={changeEmail} />
				<Input value={password} label="Password" onChange={changePassword} />
				<Button variant="contained">Sign up</Button>
			</div>
		</div>
	);
}