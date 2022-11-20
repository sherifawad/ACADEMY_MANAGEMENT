import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { HtmlHTMLAttributes, ReactNode } from "react";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
	isOpen: boolean;
	user?: {
		name?: string | null;
		email?: string | null;
		image?: string | null;
	};
}

// css multiple transitions [transition:_opacity_.3s_ease-in-out,_visibility_.3s_ease-in-out]
const Dropdowns = (props: Props) => {
	const handleLogout = async () => {
		await signOut({
			callbackUrl: "http://localhost:3000/",
		});
	};
	return (
		<div
			className={`${
				props.isOpen ? "opacity-100 visible" : "opacity-0 invisible"
			} transition-all duration-500 ease-in-out absolute left-0 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800`}
		>
			<a
				href="#"
				className="flex flex-wrap items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
			>
				<img
					className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
					src={props.user?.image || ""}
					alt="avatar"
				/>
				<div className="mx-1">
					<h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
						{props?.user?.name}
					</h1>
					<p className="text-sm text-gray-500 dark:text-gray-400">{props?.user?.email}</p>
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
				onClick={handleLogout}
				className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
			>
				Sign Out
			</a>
		</div>
	);
};

export default Dropdowns;
