import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Dropdowns from "../Dropdowns";
import { IconAsButton, IconButton, PrimaryButton, ProfileButton } from "../ui/Button";
import LinkAsButton from "../ui/LinkAsButton";

const Header = () => {
	const { status, data: session } = useSession();

	const [isOpen, setIsOpen] = useState(false);
	const [isAccountMenUOpen, setIsAccountMenuOpen] = useState(false);
	return (
		<header className="bg-white dark:bg-gray-900">
			<nav x-data={`isOpen: ${isOpen} `} className="border-b dark:border-gray-700">
				<div className="container px-6 py-4 mx-auto lg:flex lg:justify-between lg:items-center">
					<div className="flex items-center justify-between">
						<div>
							<a href="/">
								<h1>Brand</h1>
							</a>
						</div>

						{/* Mobile menu button */}
						<div className="flex lg:hidden">
							<PrimaryButton
								type="button"
								className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
								aria-label="toggle menu"
								onClick={() => setIsOpen(!isOpen)}
							>
								<div className={`${isOpen ? "hidden" : "block"}`}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-6 h-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="2"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M4 8h16M4 16h16"
										/>
									</svg>
								</div>
								<div className={`${isOpen ? "block" : "hidden"}`}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-6 h-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="2"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</div>
							</PrimaryButton>
						</div>
					</div>

					{/* Mobile Menu open: "block", Menu closed: "hidden" */}
					<div
						className={`${
							isOpen ? "translate-x-0 opacity-100 " : "opacity-0 -translate-x-full"
						} absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white shadow-md lg:bg-transparent lg:dark:bg-transparent lg:shadow-none dark:bg-gray-900 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center`}
					>
						<div className="flex flex-col space-y-8 lg:flex-row lg:items-center lg:space-y-0 lg:-px-8">
							<a
								className="block font-medium text-gray-700 dark:text-gray-200 lg:mx-8 hover:text-gray-900 dark:hover:text-gray-400 hover:underline"
								href="#"
							>
								glasses Search
							</a>
							<a
								className="block font-medium text-gray-700 dark:text-gray-200 lg:mx-8 hover:text-gray-900 dark:hover:text-gray-400 hover:underline"
								href="/user"
							>
								Users
							</a>
							<a
								className="block font-medium text-gray-700 dark:text-gray-200 lg:mx-8 hover:text-gray-900 dark:hover:text-gray-400 hover:underline"
								href="#"
							>
								Why us?
							</a>
							<a
								className="block font-medium text-gray-700 dark:text-gray-200 lg:mx-8 hover:text-gray-900 dark:hover:text-gray-400 hover:underline"
								href="#"
							>
								Contact
							</a>
							{status === "authenticated" ? (
								<div className="flex items-center mt-4 lg:mt-0">
									<IconAsButton aria-label="show notifications">
										<svg
											className="w-6 h-6"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
											/>
										</svg>
									</IconAsButton>
									<div className="relative inline-block">
										<ProfileButton
											onClick={() => {
												console.log("clicked");
												setIsAccountMenuOpen(!isAccountMenUOpen);
											}}
											aria-label="toggle profile dropdown"
										>
											<div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
												<img
													src={session.user?.image || ""}
													alt="avatar"
													className="object-cover w-full h-full"
												/>
											</div>

											<h3 className="mx-2 text-gray-700 dark:text-gray-200 lg:hidden">
												{session.user?.name || ""}
											</h3>
										</ProfileButton>
										<Dropdowns isOpen={isAccountMenUOpen} user={session.user} />
									</div>
								</div>
							) : (
								<LinkAsButton href="/auth/signin">
									<PrimaryButton>تسجيل الدخول</PrimaryButton>
								</LinkAsButton>
							)}
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
