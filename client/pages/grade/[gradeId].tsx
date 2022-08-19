import Paths from "core/paths";
import { createAxiosService } from "core/utils";
import { getGradeGroups, getGradeIds, GRADE_GROUPS_QUERY } from "features/gradeFeature/gradeQueries";
import GroupContents from "features/groupFeature/GroupContents";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import Head from "next/head";
import { authOptions } from "pages/api/auth/[...nextauth]";

function gradeItemData({ groups, gradeName }) {
	return (
		<div className="container">
			<Head>
				<title>{gradeName}</title>
				<meta name="description" content="grade groups page" />
			</Head>

			<GroupContents groups={groups} />
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
	try {
		const { gradeId } = params;

		const session = await unstable_getServerSession(req, res, authOptions);
		if (!session) {
			return {
				redirect: {
					destination: Paths.SignIn,
					permanent: false,
				},
			};
		}
		const { accessToken } = session;

		const { groups, name } = await getGradeGroups({ gradeId }, accessToken);

		if (groups) {
			return { props: { groups, gradeName: name } };
		}
	} catch (error) {
		return {
			props: {
				session: null,
			},
		};
	}
};

export default gradeItemData;
