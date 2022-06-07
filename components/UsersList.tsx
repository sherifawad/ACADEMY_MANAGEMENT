import Image from "next/image";

function UsersList() {
	return (
		<div className="grid grid-cols-[auto_1fr_auto] gap-4 cursor-pointer">
			<Image
				className="rounded-full"
				height="60px"
				width="60px"
				src="/johnAvatar.png"
				alt="userImage"
			/>
			<div className="flex flex-col justify-start ">
				<p className="text-sky-500 font-bold tracking-wider">Sherif Awad</p>
				<p className="text-gray-400 font-thin tracking-tighter">Sherif@Awad.com</p>
			</div>
			<button className="shadow-md shadow-sky-300 h-8 px-4 py-0 rounded-xl text-white bg-sky-500 text-center">
				Active
			</button>
		</div>
	);
}

export default UsersList;
