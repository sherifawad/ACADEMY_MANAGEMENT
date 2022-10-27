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
	const AddStudent = dynamic(() => import("features/userFeature/AddUser"), {
		ssr: false,
	});
	const { Model, modelProps } = useModel();
	const router = useRouter();

	const onProceed = () => {
		router.replace(router.asPath);
		console.log("Proceed clicked");
	};

	return (
		<div className="container">
			<Head>
				<title>Students</title>
				<meta name="description" content="Students List Page" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Model title="Student">
				<AddStudent onProceed={onProceed} onClose={modelProps.onClose} />
			</Model>
			{flattenedList?.length > 0 ? <StudentsListPageContent flattenedList={flattenedList} /> : <div />}
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
		const { user, accessToken } = session || {};
		const { family } = (user as user) || {};

		const variables = {
			data: {
				orderByKey: null,
				orderDirection: "asc",
				take: 20,
				myCursor: null,
				skip: null,
				sort: [{ id: "asc" }],
			},
			roleId: 5,
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
