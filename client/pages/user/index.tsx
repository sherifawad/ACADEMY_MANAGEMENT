import Head from "next/head";
import { GetServerSideProps } from "next";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import useReactTable from "customHooks/useReactTable";
import { checkSession, ObjectFlatten } from "core/utils";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import { usersByRolesListQuery } from "features/userFeature/usersQueries";
import dynamic from "next/dynamic";
import useModel from "customHooks/useModel";
import { getSession } from "next-auth/react";
import Paths from "core/paths";
import { user } from "features/userFeature/userTypes";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import UsersListPageContent from "components/pagesContents/UsersListPageContent";

export default function Index({ flattenedList }) {
	return (
		<div className="container">
			<Head>
				<title>Users</title>
				<meta name="description" content="User List Page" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{flattenedList?.length > 0 ? <UsersListPageContent flattenedList={flattenedList} /> : <div />}
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	try {
		// If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`

		const session = await unstable_getServerSession(req, res, authOptions);

		if (!session) {
			return {
				redirect: {
					destination: Paths.Auth,
					permanent: false,
				},
			};
		}
		const { user, accessToken } = session;

		const { role } = (user as user) || {};
		const variables = role === "ADMIN" ? { userRole: ["USER", "ADMIN"] } : { userRole: ["USER"] };
		const { list, rest } = await usersByRolesListQuery(variables, accessToken);
		let flattenedList = [];
		if (list?.length > 0) {
			flattenedList = list.reduce((acc, curr) => [...acc, ObjectFlatten(curr)], []);
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
