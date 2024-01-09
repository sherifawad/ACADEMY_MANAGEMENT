import Image from "next/image";
import Link from "next/link";

function UsersListItem({ id, avatar, name, email, status, grade, group }) {
	return (
		<Link href={`/student/${id}`}>
			<a>
				<div className=" grid grid-cols-[1fr_1fr_1fr_1fr] gap-4 cursor-pointer p-4 border-t-2 ">
					{!avatar && (
						<div className="p-2 rounded-full bg-blue-50 relative flex justify-center self-center place-self-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-8 h-8 text-gray-200"
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
						</div>
					)}
					{avatar && (
						<Image
							className="rounded-full self-center place-self-center"
							src={`/${avatar}`}
							alt="user account image"
							width="60"
							height="60"
						/>
					)}

					<div className="flex flex-col items-start ">
						<p className="text-sky-500 font-bold tracking-wider">{name}</p>
						<p className="text-gray-400 font-thin tracking-tighter">{email}</p>
					</div>
					<div className="hidden md:flex flex-col items-center ">
						<p className="text-sky-500 font-bold tracking-wider">{grade}</p>
						<p className="text-gray-400 font-thin tracking-tighter">{group}</p>
					</div>
					<button className="shadow-md w-32 self-center place-self-center shadow-sky-300 h-8 px-4 py-0 rounded-xl text-white bg-sky-500 text-center">
						{status ? "Active" : "InActive"}
					</button>
				</div>
			</a>
		</Link>
	);
}

export default UsersListItem;