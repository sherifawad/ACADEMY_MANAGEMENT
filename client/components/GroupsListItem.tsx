import Image from "next/image";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { Grade } from "./GradesListItem";
import MiniCard from "./layout/MiniCard";

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
        <MiniCard name={name} isActive={isActive} cardDetailLink={`/group/${id}`} EditItem={EditItem} />

	);
}

export default GroupsListItem;
