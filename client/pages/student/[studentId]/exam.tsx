import { GET_STUDENT_EXAMS, studentExamsQuery } from "features/examFeature/examsQueries";
import { GET_USERS_IDS } from "core/queries/userQueries";
import { createAxiosService } from "core/utils";
import { useEffect, useMemo, useState } from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import { format } from "date-fns";
import AddModel from "components/AddModel";
import AddExam from "features/examFeature/AddExam";
import { useRouter } from "next/router";
import useReactTable from "customHooks.tsx/useReactTable";
import useModel from "customHooks.tsx/useModel";

function studentExams({ exams = [], profileId }) {
	const { Model, modelProps, itemData, setItemData, setIsOpened } = useModel();

	const { RenderedTable } = useReactTable({
		tableData: exams,
		canSort: true,
		hasPagination: true,
		hasEditColumn: true,
		setItemData,
		hiddenColumns: ["note"],
	});

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const router = useRouter();
	// Call this function whenever you want to
	// refresh props!

	const onProceed = () => {
		router.replace(router.asPath);
		console.log("Proceed clicked");
	};

	return (
		<div className="container grid">
			<Model title="Exam">
				<AddExam
					onProceed={onProceed}
					onClose={modelProps.onClose}
					initialExam={{ profileId, ...itemData }}
				/>
			</Model>
			<RenderedTable />
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
		const { list } = await studentExamsQuery({ studentId: params.studentId });

		return { props: { exams: list, profileId: params.studentId } };
	} catch (error) {
		return {
			props: null,
		};
	}
}

export default studentExams;
