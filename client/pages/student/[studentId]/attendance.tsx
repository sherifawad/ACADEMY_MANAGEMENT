import AddAttendance from "components/AddAttendance";
import { GET_PAGINATED_STUDENT_ATTENDANCES } from "core/queries/attendancesQueries";
import { GET_USERS_IDS } from "core/queries/userQueries";
import { createAxiosService } from "core/utils";
import useModel from "customHooks.tsx/useModel";
import usePagination from "customHooks.tsx/usePagination";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";

const initialData = async (studentId: string) => {
	return await createAxiosService(GET_PAGINATED_STUDENT_ATTENDANCES, {
		studentId,
		myCursor: null,
		orderByKey: "id",
		orderDirection: "asc",
		size: 5,
	});
};

function Attendance({ list, nextCursor, _count, profileId }) {
	const { Model, modelProps, itemData, setItemData, setIsOpened } = useModel();

	const rowEditHandler = () => {
		setIsOpened(true);
		// alert("Note: " + row.values.note);
	};

	const { PaginatedTable, refetch } = usePagination({
		list,
		nextCursor,
		_count,
		edit: rowEditHandler,
		setItemsState: setItemData,
		queryVariables: { studentId: profileId },
		hiddenColumns: ["id", "note"],
		queryString: GET_PAGINATED_STUDENT_ATTENDANCES,
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
	try {
		const {
			data: {
				data: {
					PaginatedAttendances: {
						list,
						nextCursor,
						totalCount: { _count },
					},
				},
			},
		} = await initialData(params.studentId);

		if (list && list.length > 0) {
			return {
				props: {
					list,
					nextCursor,
					_count,
					profileId: params.studentId,
				},
			};
		}
	} catch (error) {
		return {
			props: null,
		};
	}
}

export default Attendance;
