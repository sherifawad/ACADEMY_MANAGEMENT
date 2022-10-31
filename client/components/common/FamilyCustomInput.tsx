import { InputHTMLAttributes, MouseEventHandler, useState } from "react";
import ModelButton from "./ui/buttons/ModelButton";
import ModelInput from "./ui/inputs/ModelInput";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

const FamilyCustomInput = ({ onClick = () => {}, ...props }: Props) => {
	return (
		<div className="flex gap-2 w-full">
			<ModelInput {...props} />
			<ModelButton onClick={onClick} className="w-1/3">
				change
			</ModelButton>
		</div>
	);
};

export default FamilyCustomInput;
