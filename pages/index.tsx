import Head from "next/head";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa";
import { BiLock } from "react-icons/bi";
import Link from "next/link";

export default function Home() {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head> 
			<div
				className="container py-4 flex flex-col overflow-hidden
            mx-auto w-2/5 border rounded-2xl shadow-md shadow-slate-400"
			>
				<h1 className="font-bold text-2xl text-center pb-4">Login</h1>
				<div className="flex flex-col gap-4 ">
					<div className="flex flex-col px-4 gap-2">
						<p className="text-gray-700">Username</p>
						<div
							className="flex relative after:absolute after:w-full after:top-full after:g-gray-100 after:border-b-2
            after:contents-['']"
						>
							<h3 className="plb-2 pli-4">
								<FaRegUser />
							</h3>
							<input
								className="flex-grow outline-none"
								type="email"
								placeholder="Type your email"
							/>
						</div>
					</div>
					<div className="flex flex-col px-4 gap-2">
						<p className="text-gray-700">Password</p>
						<div
							className="flex relative after:absolute after:w-full after:top-full after:g-gray-100 after:border-b-2
            after:contents-['']"
						>
							<h3 className="plb-2 pli-4">
								<BiLock />
							</h3>
							<input
								className=" flex-grow outline-none"
								type="password"
								placeholder="Password"
							/>
						</div>
					</div>
				</div>
				<Link href="#">
					<a className="text-end py-4 text-slate-500">Forget Password</a>
				</Link>
				<button className="bg-gradient-to-r from-cyan-300 to-fuchsia-700 rounded-full text-white p-1">
					LOGIN
				</button>

				<Link href="#">
					<a className="text-center py-4 text-slate-500">SIGN UP</a>
				</Link>
			</div>
		</div>
	);
}
