import { GET_STUDENT_EXAMS, studentExamsQuery } from "features/examFeature/examsQueries";
import { checkSession, createAxiosService } from "core/utils";
import { useRouter } from "next/router";
import useReactTable from "customHooks/useReactTable";
import useModel from "customHooks/useModel";
import { GET_USERS_IDS, studentsIdsQuery } from "features/userFeature/usersQueries";
import dynamic from "next/dynamic";
import { Session, unstable_getServerSession } from "next-auth";
import { GetServerSideProps } from "next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import Paths from "core/paths";

function studentExams({ exams = [], profileId }) {
	const AddExam = dynamic(() => import("features/examFeature/AddExam"), {
		ssr: false,
	});

	const { Model, modelProps, itemData, setItemData, setIsOpened } = useModel();

    const openModel = () => {
        setIsOpened(true);
    }

	const { RenderedTable } = useReactTable({
		tableData: exams,
		canSort: true,
		hasPagination: true,
		hasEditColumn: true,
		setItemData,
        editRow: openModel,
		hiddenColumns: ["note", "id"],
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

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
	try {
		const session = await unstable_getServerSession(req, res, authOptions);

		// if (!session) {
		// 	return {
		// 		redirect: {
		// 			destination: Paths.Auth,
		// 			permanent: false,
		// 		},
		// 	};
		// }
		const { accessToken } = session || {};
		const { studentId } = params;

		const { list } = await studentExamsQuery({ studentId }, accessToken);

		return { props: { exams: list ?? [], profileId: studentId } };
	} catch (error) {
		return {
			props: {
				session: null,
				error: true,
			},
		};
	}
};

export default studentExams;
