import { GET_STUDENT_DETAILS, GET_USERS, GET_USERS_IDS } from "core/queries/userQueries";
import { createAxiosService } from "core/utils";

function Student({ user }) {
	return <div>{user?.name}</div>;
}

export async function getStaticPaths() {
	const result = await createAxiosService(GET_USERS_IDS);

	if (result?.data?.data) {
		const paths = result.data?.data.Users.map((user) => ({
			params: { studentId: user.id },
		}));
		return { paths, fallback: false };
	}
	return { fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
	const result = await createAxiosService(GET_STUDENT_DETAILS, { userId: params.studentId });

	if (result?.data?.data) {
		return { props: { user: result?.data?.data.User } };
	}

	// Pass post data to the page via props
	return { props: {} };
}

export default Student;
