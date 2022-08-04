import AddGroup from "components/AddGroup";
import AddModel from "components/AddModel";
import GroupsList from "components/GroupsList";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { GROUPS_QUERY } from "core/queries/groupQueries";

import { createAxiosService } from "core/utils";
import useModel from "customHooks/useModel";
import GroupContents from "components/pageContents/GroupContents";

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

		const result = await createAxiosService(GROUPS_QUERY);
		if (result?.data?.data) {
			return {
				props: {
					groups: result.data?.data.Groups,
				},
			};
		}
	} catch (error) {
		// console.error(
		// 	"🚀 ~ file: group.tsx ~ line 73 ~ constgetServerSideProps:GetServerSideProps= ~ error",
		// 	error
		// );

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
