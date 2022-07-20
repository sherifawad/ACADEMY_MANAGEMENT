import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";

function MiniCard({ width = "", cardDetailLink = "", name = "", isActive = false, EditItem = () => {} }) {
	return (
		<div className={`bg-white rounded-lg shadow-xl border p-4 ${width}`}>
			<div className="grid grid-cols-[1fr_auto] gap-4 items-center">
				<Link href={cardDetailLink}>
					<a className="grid grid-cols-[1fr_auto] gap-2 items-center">
						<p className="text-sky-500 font-bold tracking-wider m-auto whitespace-nowrap">
							{name}
						</p>
						<div
							className={`w-6 h-6 ${isActive ? "bg-green-600" : "bg-red-600"} rounded-full`}
						></div>
					</a>
				</Link>
				<a
					href="#"
					onClick={EditItem}
					className={`${isActive ? "hover:text-teal-400" : "hover:text-red-400"} px-4`}
				>
					<FaRegEdit />
				</a>
			</div>
		</div>
	);
}

export default MiniCard;
