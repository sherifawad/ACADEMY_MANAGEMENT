import AddGroup from "components/AddGroup";
import AddModel from "components/AddModel";
import GroupsList from "components/GroupsList";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import { GROUPS_QUERY } from "core/queries/groupQueries";
import axios from "axios";
import constants from "core/constants";
import { createAxiosService } from "core/utils";

function group({ groups = [] }) {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [isOpened, setIsOpened] = useState(false);
	const [groupItemData, setGroupItemData] = useState(null);

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const router = useRouter();

	useEffect(() => {
		if (groupItemData?.id) {
			setIsOpened(true);
		}
	}, [setGroupItemData, groupItemData]);

	// Call this function whenever you want to
	// refresh props!
	const onProceed = () => {
		router.replace(router.asPath);
		console.log("Proceed clicked");
	};

	const onClose = () => {
		setIsOpened(false);
		console.log("close clicked");
	};

	const onOpen = () => {
		setGroupItemData({ id: null, startAt: null, endAt: null, name: "", isActive: true, gradeId: null });
		setIsOpened(true);
	};

	return (
		<div className="container">
			<Head>
				<title>Group</title>
				<meta name="description" content="group page" />
			</Head>

			<Suspense>
				<AddModel isOpened={isOpened} onClose={onClose} title="Add Group">
					<AddGroup onProceed={onProceed} onClose={onClose} {...groupItemData} />
				</AddModel>
			</Suspense>

			<div className="grid grid-row-[auto_1fr] gap-8">
				<button
					onClick={onOpen}
					className="justify-self-end block w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					type="button"
				>
					Add Group
				</button>
				<GroupsList groupsItems={groups} setGroupItemData={setGroupItemData} />
			</div>
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
