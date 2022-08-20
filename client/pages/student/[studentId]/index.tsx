import Paths from "core/paths";
import AttendancesCard from "features/attendanceFeature/AttendancesCard";
import ExamsCard from "features/examFeature/ExamsCard";
import UserCard from "features/userFeature/UserCard";
import { studentDetailsQuery, studentsIdsQuery } from "features/userFeature/usersQueries";
import { user } from "features/userFeature/userTypes";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { useMemo } from "react";

function Student({ user }) {
	const { id, profile } = user || {};
	const { attendances, exams, bio, group } = profile || {};

	return (
		<div className="container w-full">
			<div className="w-full">
				<UserCard {...user} bio={bio} group={group} />
				<div className="flex flex-wrap md:flex-nowrap w-full gap-4 items-start justify-between pt-8">
					<AttendancesCard attendances={attendances} id={id} />
					<ExamsCard exams={exams} id={id} />
				</div>
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
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

		const { user, accessToken } = session;

		const { id } = (user as user) || {};

		const { User } = await studentDetailsQuery(
			{
				userId: id,
				attendancesTake2: 5,
				examsTake2: 5,
			},
			accessToken
		);
		return {
			props: {
				session,
				user: User,
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

export default Student;
