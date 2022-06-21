import { REVOKE_TOKEN_MUTATION } from "core/mutations/authPayloadMutations";
import Paths from "core/paths";
import { createAxiosService } from "core/utils";
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "react-query";

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [accountMenuOpen, setAccountMenuOpen] = useState(false);
	const { data: session } = useSession();
	const router = useRouter();

	const mutation = useMutation(
		"AddGrade",
		() =>
			createAxiosService(REVOKE_TOKEN_MUTATION, {
				token: session.refreshToken,
				userId: (session.user as User).id,
			}).then((response) => response.data.data),
		{
			onSuccess: () => {
				console.log("Grade Created Successfully");
				router.push(Paths.Home);
			},
		}
	);
	const handleSignOut = async (e) => {
		e.preventDefault();
		if (mutation.isLoading) return;
		await mutation.mutateAsync();
	};
	const openMenu = () => {
		setMenuOpen(true);
	};

	const closeMenu = () => {
		setMenuOpen(false);
	};

	return (
		<nav className="grid grid-cols-3 md:grid-cols-[1fr_2fr_1fr] grid-rows-[auto_1fr] py-2 mb-8 bg-white shadow-xl">
			<div className="flex items-center columns-1 mx-8">
				<h3 className="text-2xl font-medium text-blue-500">LOGO</h3>
			</div>
			{
				//#region menu Items
			}
			<div
				className={` ${
					menuOpen ? "flex flex-col " : "hidden"
				} md:flex md:flex-row md:items-center md:justify-center md:row-start-1 md:col-start-2 md:col-end-3  col-start-1 col-span-3 row-start-2 items-start justify-center content-center space-x-8`}
			>
				<Link href="/">
					<a className="md:mx-0 mx-8 menu-line">Home</a>
				</Link>

				<Link href="/admin">
					<a className="menu-line">Admin</a>
				</Link>

				<Link href="/grade">
					<a className="menu-line">Grade</a>
				</Link>

				<Link href="/group">
					<a className="menu-line">Group</a>
				</Link>
			</div>
			{
				//#endregion
			}

			{session && (
				<div className="flex items-center justify-center space-x-2 md:col-start-3 md:row-start-1 col-start-2  mx-8">
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

					<button
						className="p-2 rounded-full bg-blue-50 relative flex justify-center"
						onClick={() => {
							setAccountMenuOpen(!accountMenuOpen);
						}}
					>
						{!(session.user as User).avatar && (
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
						)}
						{(session.user as User).avatar && (
							<Image
								src={`/${(session.user as User).avatar}`}
								alt="user account image"
								width="40"
								height="40"
							/>
						)}
						<div
							className={`${
								accountMenuOpen ? "flex" : "hidden"
							}  z-10 absolute w-36 top-full  flex-col items-center justify-center`}
						>
							<svg
								className="w-6 h-8 ml-1 text-white"
								fill="currentColor"
								stroke="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clipRule="evenodd"
								></path>
							</svg>
							<Link href="#">
								<a
									className="bg-red-400 rounded-full text-white text-center p-2"
									onClick={handleSignOut}
								>
									Sign Out
								</a>
							</Link>
						</div>
					</button>
				</div>
			)}
			{!session && (
				<Link href="/auth">
					<a className="bg-green-400 w-20 rounded-full text-white text-center py-2">Log In</a>
				</Link>
			)}
			<div
				className={`md:hidden items-center justify-center ${
					menuOpen ? "hidden" : "flex"
				} col-start-3`}
			>
				<button className="outline-none mobile-menu-button" onClick={openMenu}>
					<svg
						className=" w-6 h-6 text-gray-500 hover:text-green-500"
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
			<div
				className={`md:hidden items-center justify-center ${
					menuOpen ? "flex" : "hidden"
				}  col-start-3`}
				onClick={closeMenu}
			>
				<button className="outline-none mobile-menu-button">
					<svg
						className=" w-6 h-6 text-gray-500 hover:text-green-500"
						viewBox="0 0 20 19.84"
						x-show="!showMenu"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						stroke="currentColor"
					>
						<path d="M10.17,10l3.89-3.89a.37.37,0,1,0-.53-.53L9.64,9.43,5.75,5.54a.37.37,0,1,0-.53.53L9.11,10,5.22,13.85a.37.37,0,0,0,0,.53.34.34,0,0,0,.26.11.36.36,0,0,0,.27-.11l3.89-3.89,3.89,3.89a.34.34,0,0,0,.26.11.35.35,0,0,0,.27-.11.37.37,0,0,0,0-.53Z" />
					</svg>
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
