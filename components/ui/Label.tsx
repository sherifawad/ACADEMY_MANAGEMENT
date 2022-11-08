import { LabelHTMLAttributes } from "react";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {}

const Label = (props: Props) => {
	return (
		<label {...props} className={`block text-sm text-gray-800 dark:text-gray-200 ${props.className}`}>
			{props.children ? props.children : props.title}
		</label>
	);
};

export default Label;
