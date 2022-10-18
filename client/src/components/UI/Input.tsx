import { TextField } from "@mui/material";
import React from "react";

type InputTypeProps = {
	value: string
	label: string
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	focus?: boolean
}

export const Input: React.FC<InputTypeProps> = ({ value, label, focus, onChange }) => {
	return (
		<TextField
			autoFocus={focus}
			onChange={onChange}
			value={value}
			label={label}
			type={label === 'Password' ? 'password' : 'text'}
			style={{ width: "300px", marginBottom: '7px' }}
		/>
	);
}

export default Input;