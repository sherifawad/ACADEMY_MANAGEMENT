import { authOptions } from "@/api/auth/[...nextauth]";
import { usersByRolesListQuery } from "features/userFeature/usersQueries";
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import Head from "next/head";
import { ObjectFlatten } from "utils/objectsUtils";

export default function Index({ flattenedList }) {
	return (
		<div className="container">
			<Head>
				<title>Users</title>
				<meta name="description" content="User List Page" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<pre>
				<code>{JSON.stringify(flattenedList, null, 2)}</code>
			</pre>{" "}
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	try {
		// If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`

		const session = await unstable_getServerSession(
			req,
			res,
			authOptions(req as NextApiRequest, res as NextApiResponse)
		);

		// if (!session) {
		// 	return {
		// 		redirect: {authOptions
		// 			destination: Paths.Auth,
		// 			permanent: false,
		// 		},
		// 	};
		// }
		const { user, accessToken } = session || {};

		const variables = { roleIds: [1, 2, 3, 4, 5, 6] };
		const { list, rest } = await usersByRolesListQuery(variables, accessToken);
		console.log(
			"🚀 ~ file: index.tsx ~ line 45 ~ constgetServerSideProps:GetServerSideProps= ~ list",
			list
		);

		let flattenedList = [];
		if (list?.length > 0) {
			flattenedList = list.reduce((acc: any, curr: any) => [...acc, ObjectFlatten(curr)], []);
		}
		return {
			props: {
				flattenedList,
				...rest,
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
