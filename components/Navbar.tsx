import Image from "next/image";

const Navbar = () => {
	return (
		<nav className="flex justify-around py-2 mb-8 bg-white shadow-xl">
			<div className="flex items-center">
				<h3 className="text-2xl font-medium text-blue-500">LOGO</h3>
			</div>
			<div className="items-center hidden space-x-8 md:flex">
				<a href="">Home</a>
				<a href="">About Us</a>
				<a href="">Blogs</a>
				<a href="">Our Team</a>
				<a href="">Contact Us</a>
			</div>
			<div className="flex items-center space-x-2">
				<a href="#">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-6 h-6 text-gray-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
						/>
					</svg>
				</a>
				<a href="#">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-6 h-6 text-gray-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
				</a>
				<a href="#" className="p-2 rounded-full bg-blue-50">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-6 h-6 text-gray-200"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
						/>
					</svg>
				</a>
			</div>

			<div className="md:hidden flex items-center">
				<button className="outline-none mobile-menu-button">
					<svg
						className=" w-6 h-6 text-gray-500 hover:text-green-500 "
						x-show="!showMenu"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path d="M4 6h16M4 12h16M4 18h16"></path>
					</svg>
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
