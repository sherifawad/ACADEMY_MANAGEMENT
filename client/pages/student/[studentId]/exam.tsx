import { GET_STUDENT_EXAMS } from "core/queries/examsQueries";
import { GET_USERS_IDS } from "core/queries/userQueries";
import { createAxiosService } from "core/utils";
import React from "react";

function studentExams({ exams = [] }) {
	return (
		<div>
			{exams?.map((exam) => (
				<div key={exam.id}>{exam.score}</div>
			))}
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
	const result = await createAxiosService(GET_STUDENT_EXAMS, { studentId: params.studentId });

	if (result?.data?.data) {
		return { props: { exams: result?.data?.data.UserExams } };
	}

	// Pass post data to the page via props
	return { props: {} };
}

export default studentExams;
