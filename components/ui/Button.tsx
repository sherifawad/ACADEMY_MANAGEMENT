import { ButtonHTMLAttributes, Children, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const PrimaryButton = (props: Props) => {
	return (
		<button
			{...props}
			className={`px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 ${props.className}`}
		>
			{props.children}
		</button>
	);
};

export const IconButton = (props: Props) => {
	return (
		<button
			{...props}
			className={`flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 ${props.className}`}
		>
			{props.children}
		</button>
	);
};
