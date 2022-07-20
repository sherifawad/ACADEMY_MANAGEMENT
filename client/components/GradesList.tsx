import GradesListItem, { Grade } from "./GradesListItem";

export interface GradeList {
	setGradeItemData: Function;
	gradesItems: Grade[];
}

function GradesList({ gradesItems = [], setGradeItemData }: GradeList) {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
			{gradesItems.map((x, i) => (
				<GradesListItem key={i} {...x} setGradeItemData={setGradeItemData} />
			))}
		</div>
	);
}

export default GradesList;
