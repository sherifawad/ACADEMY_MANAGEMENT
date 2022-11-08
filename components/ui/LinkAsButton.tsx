import { AnchorHTMLAttributes } from "react";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {}

function LinkAsButton(props: Props) {
	return (
		<a
			{...props}
			className="p-2 mx-2 text-sm font-medium text-gray-500 transition-colors duration-300 transform bg-gray-300 rounded-md hover:bg-gray-200"
		>
			{props.children}
		</a>
	);
}

export default LinkAsButton;
