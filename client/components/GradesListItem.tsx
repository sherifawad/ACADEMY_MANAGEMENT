import MiniCard from "./layout/MiniCard";

export interface Grade {
	id: string;
	name: string;
	isActive: boolean;
}

export interface GradeItemProps extends Grade {
	key?: any;
	setGradeItemData: Function;
}
function GradesListItem({ id, name, isActive, setGradeItemData }: GradeItemProps) {
	const EditItem = () => {
		setGradeItemData({ id, isActive, name });
	};
	return <MiniCard name={name} isActive={isActive} cardDetailLink={`/grade/${id}`} EditItem={EditItem} />;
}

export default GradesListItem;
