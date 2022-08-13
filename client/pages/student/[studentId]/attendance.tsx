import { studentAttendancesQuery } from "features/attendanceFeature/attendancesQueries";
import { createAxiosService } from "core/utils";
import useModel from "customHooks/useModel";
import usePagination from "customHooks/usePagination";
import { GET_USERS_IDS } from "features/studentFeature/studentsQueries";
import dynamic from "next/dynamic";

function Attendance({ list, prevCursor, nextCursor, _count, profileId }) {
	const AddAttendance = dynamic(() => import("features/attendanceFeature/AddAttendance"), {
		ssr: false,
	});
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
		query: studentAttendancesQuery,
	});

	const onProceed = async () => {
		refetch();
		console.log("Proceed clicked");
	};

	return (
		<div className="container grid">
			<Model title="Attendance">
				<AddAttendance
					onProceed={onProceed}
					onClose={modelProps.onClose}
					initialAttendance={{
						profileId,
						...itemData,
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
			role: ["Student"],
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
		const { list, nextCursor, prevCursor, _count } = await studentAttendancesQuery(variables);

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
			props: {},
		};
	}
}

export default Attendance;
