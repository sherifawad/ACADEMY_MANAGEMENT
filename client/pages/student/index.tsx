import { studentExamsQuery } from "features/examFeature/examsQueries";

function index() {
	return <div>index</div>;
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

export default index;
