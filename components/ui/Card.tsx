import { ReactNode } from "react";

interface Props {
	children?: ReactNode;
}

const Card = (props: Props) => {
	return (
		<div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
			{props.children}
		</div>
	);
};

export default Card;
