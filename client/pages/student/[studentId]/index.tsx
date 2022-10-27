import Paths from "core/paths";
import { checkSession } from "core/utils";
import AttendancesCard from "features/attendanceFeature/AttendancesCard";
import ExamsCard from "features/examFeature/ExamsCard";
import UserCard from "features/userFeature/UserCard";
import { studentDetailsQuery, studentsIdsQuery } from "features/userFeature/usersQueries";
import { user } from "features/userFeature/userTypes";
import { GetServerSideProps } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import Head from "next/head";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { useMemo } from "react";

function Student({ user }) {
	const { id, profile, name } = user || {};
	const { attendances, exams, bio, group } = profile || {};

	return (
		<div className="container w-full">
			<Head>
				<title>{name}</title>
				<meta name="description" content="Students Profile Page" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="w-full">
				<UserCard {...user} bio={bio} group={group} />
				<div className="flex flex-wrap md:flex-nowrap w-full gap-4 items-start justify-between pt-8">
					{attendances && <AttendancesCard attendances={attendances} id={id} />}
					{exams && <ExamsCard exams={exams} id={id} />}
				</div>
			</div>
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

		const { User } = await studentDetailsQuery(
			{
				userId: studentId,
				attendancesTake2: 5,
				examsTake2: 5,
			},
			accessToken
		);
		return {
			props: {
				user: User ?? {},
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
