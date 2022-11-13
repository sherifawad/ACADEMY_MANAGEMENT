import { AnchorHTMLAttributes } from "react";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {}

function LinkAsButton(props: Props) {
	return (
		<a {...props} className={` hover:no-underline ${props.className}`}>
			{props.children}
		</a>
	);
}

export default LinkAsButton;
