import { HtmlHTMLAttributes, ReactNode } from "react";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
	isOpen: boolean;
}

// css multiple transitions [transition:_opacity_.3s_ease-in-out,_visibility_.3s_ease-in-out]
const Dropdowns = (props: Props) => {
	return (
		<div
			className={`${
				props.isOpen ? "opacity-100 visible" : "opacity-0 invisible"
			} transition-all duration-500 ease-in-out absolute left-0 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800`}
		>
			<a
				href="#"
				className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
			>
				<img
					className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
					src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200"
					alt="jane avatar"
				/>
				<div className="mx-1">
					<h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Jane Doe</h1>
					<p className="text-sm text-gray-500 dark:text-gray-400">janedoe@exampl.com</p>
				</div>
			</a>

			<hr className="border-gray-200 dark:border-gray-700 " />

			<a
				href="#"
				className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
			>
				view profile
			</a>

			<a
				href="#"
				className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
			>
				Settings
			</a>

			<a
				href="#"
				className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
			>
				Keyboard shortcuts
			</a>

			<hr className="border-gray-200 dark:border-gray-700 " />

			<a
				href="#"
				className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
			>
				Company profile
			</a>

			<a
				href="#"
				className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
			>
				Team
			</a>

			<a
				href="#"
				className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
			>
				Invite colleagues
			</a>

			<hr className="border-gray-200 dark:border-gray-700 " />

			<a
				href="#"
				className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
			>
				Help
			</a>
			<a
				href="#"
				className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
			>
				Sign Out
			</a>
		</div>
	);
};

export default Dropdowns;
