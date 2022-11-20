import { ButtonHTMLAttributes, Children, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const PrimaryButton = (props: Props) => {
	return (
		<button
			{...props}
			className={`px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none ${props.className}`}
		>
			{props.children}
		</button>
	);
};

export const IconButton = (props: Props) => {
	return (
		<button
			type="button"
			{...props}
			className={`flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 ${props.className}`}
		>
			{props.children}
		</button>
	);
};

export const IconAsButton = (props: Props) => {
	return (
		<button
			type="button"
			{...props}
			className={`hidden mx-4 text-gray-600 transition-colors duration-300 transform lg:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none ${props.className}`}
		>
			{props.children}
		</button>
	);
};

export const ProfileButton = (props: Props) => {
	return (
		<button
			type="button"
			{...props}
			className={`relative z-10 flex items-center p-2 text-sm text-gray-600 bg-transparent hover:bg-transparent border border-transparent rounded-md  dark:text-white dark:bg-gray-800 focus:outline-none ${props.className}`}
		>
			{props.children}
		</button>
	);
};
