import { TextField } from "@mui/material";
import React from "react";

type InputTypeProps = {
	value: string
	label: string
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<InputTypeProps> = ({ value, label, onChange }) => {
	return (
		<TextField
			onChange={onChange}
			value={value}
			label={label}
			type={label === 'Password' ? 'password' : 'text'}
			style={{ width: "300px", marginBottom: '5px' }}
		/>
	);
}

export default Input;