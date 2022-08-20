import { studentAttendancesQuery } from "features/attendanceFeature/attendancesQueries";
import { createAxiosService } from "core/utils";
import useModel from "customHooks/useModel";
import usePagination from "customHooks/usePagination";
import { studentsIdsQuery } from "features/userFeature/usersQueries";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import Paths from "core/paths";

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

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
	try {
		const session = await unstable_getServerSession(req, res, authOptions);

		if (!session) {
			return {
				redirect: {
					destination: Paths.SignIn,
					permanent: false,
				},
			};
		}

		const { studentId } = params;

		const { accessToken } = session;

		const variables = {
			studentId,
			data: {
				myCursor: null,
				orderByKey: "id",
				orderDirection: "asc",
				take: 5,
			},
		};
		const { list, nextCursor, prevCursor, _count } = await studentAttendancesQuery(
			variables,
			accessToken
		);

		return {
			props: {
				session,
				list,
				prevCursor,
				nextCursor,
				_count,
				profileId: params.studentId,
			},
		};
	} catch (error) {
		return {
			props: {
				session: null,
				error: true,
			},
		};
	}
};

export default Attendance;
