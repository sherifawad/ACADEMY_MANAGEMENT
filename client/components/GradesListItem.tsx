import Image from "next/image";

function GradesListItem({ name, active }) {
	return (
		<div className="flex flex-row justify-around items-center bg-gray-100 border-2 border-gray-300 rounded-xl p-2">
			<p className="text-sky-500 font-bold tracking-wider">{name}</p>
			<div className={`w-6 h-6 ${active ? "bg-green-600" : "bg-red-600"} rounded-full`}></div>
		</div>
	);
}

export default GradesListItem;
