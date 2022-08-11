import { GetServerSideProps } from "next";
import Head from "next/head";

import { getGroups } from "features/groupFeature/groupQueries";
import GroupContents from "features/groupFeature/GroupContents";

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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	try {
		// const session = await getSession({ req });

		// if (!session) {
		// 	return {
		// 		redirect: {
		// 			destination: "/auth",
		// 			permanent: false,
		// 		},
		// 	};
		// }

		const { Groups } = await getGroups();
		return {
			props: {
				groups: Groups,
			},
		};
	} catch (error) {
		return {
			props: {
				session: null,
			},
		};
	}
	return {
		props: {},
	};
};

export default group;
