import AddAttendance from "components/AddAttendance";
import { GET_PAGINATED_STUDENT_ATTENDANCES } from "core/queries/attendancesQueries";
import { GET_USERS_IDS } from "core/queries/userQueries";
import { createAxiosService } from "core/utils";
import useModel from "customHooks.tsx/useModel";
import usePagination from "customHooks.tsx/usePagination";
import { useRouter } from "next/router";

function Attendance({ PaginatedAttendances, profileId }) {
	const {
		list,
		nextCursor,
		totalCount: { _count },
	} = PaginatedAttendances;

	const { Model, modelProps, itemData, setItemData, setIsOpened } = useModel();

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const router = useRouter();
	// Call this function whenever you want to
	// refresh props!

	const rowEditHandler = () => {
		setIsOpened(true);
		// alert("Note: " + row.values.note);
	};

	const { PaginatedTable } = usePagination({
		list,
		_count,
		nextCursor,
		edit: rowEditHandler,
		setItemsState: setItemData,
		queryVariables: { studentId: profileId },
		hiddenColumns: ["id", "note"],
		queryString: GET_PAGINATED_STUDENT_ATTENDANCES,
	});

	return (
		<div className="container grid">
			<Model title="Add Attendance">
				<AddAttendance
					onProceed={modelProps.onProceed}
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
	const result = await createAxiosService(GET_USERS_IDS, {
		data: {
			role: "Student",
		},
	});

	if (result?.data?.data) {
		const paths = result.data?.data?.FilteredUsers?.map((user) => ({
			params: { studentId: user.id },
		}));
		return { paths, fallback: false };
	}
	return { fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
	const result = await createAxiosService(GET_PAGINATED_STUDENT_ATTENDANCES, {
		studentId: params.studentId,
		myCursor: null,
		orderByKey: "note",
		orderDirection: "desc",
		size: 2,
	});

	if (result?.data?.data) {
		return {
			props: {
				PaginatedAttendances: result?.data?.data.PaginatedAttendances,
				profileId: params.studentId,
			},
		};
	}

	// Pass post data to the page via props
	return { props: {} };
}

export default Attendance;
