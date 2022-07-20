import Image from "next/image";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { Grade } from "./GradesListItem";

export interface Group {
	id: string;
	isActive: boolean;
	name: string;
	startAt: Date;
	endAt: Date;
	grade: Grade;
}

export interface GroupItemProps extends Group {
	key?: any;
	setGroupItemData: Function;
}

function GroupsListItem({ id, isActive, name, startAt, endAt, grade, setGroupItemData }) {
	const EditItem = () => {
		setGroupItemData({ id, isActive, name, startAt, endAt, grade });
	};
	return (
		<div className="grid grid-cols-[1fr_auto] gap-4 items-center bg-gray-100 border-2 border-gray-300 rounded-xl p-2">
			<Link href={`/group/${id}`}>
				<a className="grid grid-cols-[1fr_auto] gap-2 items-center">
					<p className="text-sky-500 font-bold tracking-wider m-auto whitespace-nowrap">{name}</p>
					<div className={`w-6 h-6 ${isActive ? "bg-green-600" : "bg-red-600"} rounded-full`}></div>
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
	);
}

export default GroupsListItem;
