import { GetServerSideProps } from "next";
import Head from "next/head";

import { getGroups } from "features/groupFeature/groupQueries";
import GroupContents from "features/groupFeature/GroupContents";
import Paths from "core/paths";
import { getSession } from "next-auth/react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { Session, unstable_getServerSession } from "next-auth";
import { checkSession } from "core/utils";

function group({ groups = [] }) {
	return (
		<div className="container">
			<Head>
				<title>Group</title>
				<meta name="description" content="group page" />
			</Head>

			<GroupContents groups={groups} />
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	try {
		const { accessToken } = (await checkSession(req, res, authOptions)) as Session;

		const { Groups } = await getGroups(accessToken);
		return {
			props: {
				groups: Groups ?? [],
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

export default group;
