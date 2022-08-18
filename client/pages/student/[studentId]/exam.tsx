import { GET_STUDENT_EXAMS, studentExamsQuery } from "features/examFeature/examsQueries";
import { createAxiosService } from "core/utils";
import { useRouter } from "next/router";
import useReactTable from "customHooks/useReactTable";
import useModel from "customHooks/useModel";
import { GET_USERS_IDS, studentsIdsQuery } from "features/userFeature/usersQueries";
import dynamic from "next/dynamic";

function studentExams({ exams = [], profileId }) {
	const AddExam = dynamic(() => import("features/examFeature/AddExam"), {
		ssr: false,
	});

	const { Model, modelProps, itemData, setItemData, setIsOpened } = useModel();

	const { RenderedTable } = useReactTable({
		tableData: exams,
		canSort: true,
		hasPagination: true,
		hasEditColumn: true,
		setItemData,
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

export async function getStaticPaths() {
	try {
		const { list } = await studentsIdsQuery({
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
		const { list } = await studentExamsQuery({ studentId: params.studentId });

		return { props: { exams: list, profileId: params.studentId } };
	} catch (error) {
		return {
			props: {},
		};
	}
}

export default studentExams;
