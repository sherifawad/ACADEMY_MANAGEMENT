import { InputHTMLAttributes } from "react";
import Input from "./Input";
import Label from "./Label";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

const InputWithLabel = ({ label, ...rest }: Props) => {
	return (
		<div>
			<Label htmlFor={rest.id} title={label} />
			<Input {...rest} />
		</div>
	);
};

export default InputWithLabel;
