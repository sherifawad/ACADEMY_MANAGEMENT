import AddAttendance from "features/attendanceFeature/AddAttendance";
import { GET_PAGINATED_STUDENT_ATTENDANCES } from "features/attendanceFeature/attendancesQueries";
import { GET_USERS_IDS } from "core/queries/userQueries";
import { createAxiosService } from "core/utils";
import useModel from "customHooks.tsx/useModel";
import usePagination from "customHooks.tsx/usePagination";

const initialData = async (variable: {}) => {
	const {
		data: {
			data: {
				studentAttendances: { list, nextCursor, prevCursor, totalCount },
			},
		},
	} = await createAxiosService(GET_PAGINATED_STUDENT_ATTENDANCES, variable);
	if (totalCount) {
		const { _count } = totalCount;
		return { list, nextCursor, prevCursor, _count };
	} else {
		return { list, prevCursor, nextCursor };
	}
};

function Attendance({ list, prevCursor, nextCursor, _count, profileId }) {
	const { Model, modelProps, itemData, setItemData, setIsOpened } = useModel();

	const rowEditHandler = (row) => {
		// setIsOpened(true);
		// alert("Note: " + row?.values?.note);
	};

	const { PaginatedTable, refetch } = usePagination({
		list,
		prevCursor,
		nextCursor,
		_count,
		edit: rowEditHandler,
		setItemsState: setItemData,
		queryVariables: { studentId: profileId },
		hiddenColumns: ["id", "note"],
		query: initialData,
	});

	const onProceed = async () => {
		refetch();
		console.log("Proceed clicked");
	};

	return (
		<div className="container grid">
			<Model title="Add Attendance">
				<AddAttendance
					onProceed={onProceed}
					onClose={modelProps.onClose}
					initialAttendance={{
						profileId,
						id: itemData?.id,
						startAt: itemData?.startAt,
						endAt: itemData?.endAt,
						note: itemData?.note,
					}}
				/>
			</Model>
			<PaginatedTable />
		</div>
	);
}

export async function getStaticPaths() {
	try {
		const {
			data: {
				data: {
					FilteredUsers: { list },
				},
			},
		} = await createAxiosService(GET_USERS_IDS, {
			role: "Student",
		});

		const paths = list?.map((user) => ({
			params: { studentId: user.id },
		}));
		return { paths, fallback: false };
	} catch (error) {
		return { fallback: false };
	}
}

// This also gets called at build time
export async function getStaticProps({ params }) {
	try {
		const variables = {
			studentId: params?.studentId,
			data: {
				myCursor: null,
				orderByKey: "id",
				orderDirection: "asc",
				take: 5,
			},
		};
		const { list, nextCursor, prevCursor, _count } = await initialData(variables);

		return {
			props: {
				list,
				prevCursor,
				nextCursor,
				_count,
				profileId: params.studentId,
			},
		};
	} catch (error) {
		return {
			props: null,
		};
	}
}

export default Attendance;
