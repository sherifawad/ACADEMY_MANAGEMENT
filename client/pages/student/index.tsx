import StudentsListPageContent from "components/pagesContents/StudentsListPageContent";
import Paths from "core/paths";
import { checkSession, getDayNames, ObjectFlatten } from "core/utils";
import useModel from "customHooks/useModel";
import useReactTable from "customHooks/useReactTable";
import { format } from "date-fns";
import { studentsListQuery } from "features/userFeature/usersQueries";
import { user } from "features/userFeature/userTypes";
import { GetServerSideProps } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { useMemo } from "react";
import { MdOutlineRadioButtonChecked } from "react-icons/md";

function index({ flattenedList }) {
	return (
		<div className="container">
			<Head>
				<title>Students</title>
				<meta name="description" content="Students List Page" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{flattenedList?.length > 0 ? <StudentsListPageContent flattenedList={flattenedList} /> : <div />}
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	try {
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
		const { family } = (user as user) || {};

		const variables = {
			userRole: ["Student"],
			familyId: family?.id ?? null,
			attendancesTake2: 1,
			take: 1,
			orderByList: {
				date: "desc",
				createdAt: "desc",
				updatedAt: "desc",
			},
			attendancesOrderByList2: {
				startAt: "desc",
				endAt: "desc",
			},
		};

		const { list, rest, error } = await studentsListQuery(variables, accessToken);
		if (error) {
			return {
				props: {
					error,
				},
			};
		}

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
				error: true,
			},
		};
	}
};

export default index;
