import { GetServerSideProps } from "next";
import Head from "next/head";

import { getGroups } from "features/groupFeature/groupQueries";
import GroupContents from "features/groupFeature/GroupContents";
import Paths from "core/paths";
import { getSession } from "next-auth/react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { Session, unstable_getServerSession } from "next-auth";
import { checkSession } from "core/utils";
import { useRouter } from "next/router";
import { useMemo } from "react";
import useModel from "customHooks/useModel";
import AddGroup from "features/groupFeature/AddGroup";
import GroupsList from "components/GroupsList";

function group({ groups = [] }) {
	const router = useRouter();

	const { Model, modelProps, itemData, setItemData } = useModel();

	const onProceed = () => {
		router.replace(router.asPath);
		console.log("Proceed clicked");
	};
	return (
		<div className="container">
			<Head>
				<title>Group</title>
				<meta name="description" content="group page" />
			</Head>
			<Model title="Add Group">
				<AddGroup onClose={modelProps.onClose} onProceed={onProceed} {...itemData} />
			</Model>
			<GroupsList groupsItems={groups} setGroupItemData={setItemData} />{" "}
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
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
