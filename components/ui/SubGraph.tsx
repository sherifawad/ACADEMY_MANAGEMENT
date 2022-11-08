import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLParagraphElement> {}

const SubGraph = (props: Props) => {
	return (
		<p {...props} className={`mt-8 text-xs font-light text-center text-gray-400 ${props.className}`}>
			{props.children}
		</p>
	);
};

export default SubGraph;
