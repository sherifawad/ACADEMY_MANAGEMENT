import UserCard from "features/userFeature/UserCard";
import { studentDetailsQuery, studentsIdsQuery, userDetailsQuery } from "features/userFeature/usersQueries";

function User({ user }) {
	const { id, name, isActive, avatar, contact } = user || {};

	return (
		<div className="container w-full">
			<div className="w-full">
				<UserCard {...user} isStudent={false} />
			</div>
		</div>
	);
}

export async function getStaticPaths() {
	try {
		const { list } = await studentsIdsQuery({
			role: ["USER", "ADMIN"],
		});

		const paths = list?.map((user) => ({
			params: { userId: user.id },
		}));
		return { paths, fallback: false };
	} catch (error) {
		return { fallback: false };
	}
}

// This also gets called at build time
export async function getStaticProps({ params }) {
	try {
		const { User } = await userDetailsQuery({
			userId: params.userId,
		});

		return { props: { user: User } };
	} catch (error) {
		return { props: {} };
	}
}

export default User;
