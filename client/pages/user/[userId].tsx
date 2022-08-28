import Paths from "core/paths";
import { checkSession } from "core/utils";
import UserCard from "features/userFeature/UserCard";
import { userDetailsQuery } from "features/userFeature/usersQueries";
import { user } from "features/userFeature/userTypes";
import { GetServerSideProps } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";

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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	try {
		// If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`

		const { user, accessToken } = (await checkSession(req, res, authOptions)) as Session;

		const { id } = (user as user) || {};
		const { User } = await userDetailsQuery(
			{
				userId: id,
			},
			accessToken
		);

		return {
			props: {
				user: User,
			},
		};
	} catch (error) {
		return {
			props: {
				session: null,
			},
		};
	}
};

export default User;
