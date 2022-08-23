import Head from "next/head";
import { GetServerSideProps } from "next";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import useReactTable from "customHooks/useReactTable";
import { ObjectFlatten } from "core/utils";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import { usersByRolesListQuery } from "features/userFeature/usersQueries";
import dynamic from "next/dynamic";
import useModel from "customHooks/useModel";
import { getSession } from "next-auth/react";
import Paths from "core/paths";
import { getToken } from "next-auth/jwt";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { user } from "features/userFeature/userTypes";

export default function Index({ flattenedList }) {
	const AddUser = dynamic(() => import("features/userFeature/AddUser"), {
		ssr: false,
	});

	const { Model, modelProps } = useModel();

	const tableColumns = useMemo(
		() => [
			{
				Header: "Name",
				accessor: "name",
				Cell: ({
					row: {
						original: { avatar, id },
					},
					value,
				}) =>
					value === null ? (
						""
					) : (
						<Link href={`/user/${id}`}>
							<a className="flex items-center gap-2">
								{avatar && (
									<Image
										className="rounded-full self-center place-self-center"
										src={`/${avatar}`}
										alt="student image"
										width="60"
										height="60"
									/>
								)}
								{!avatar && (
									<div className="p-2 rounded-full bg-blue-50 relative flex justify-center self-center place-self-center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="w-8 h-8 text-gray-200"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
											/>
										</svg>
									</div>
								)}
								<p>{value}</p>
							</a>
						</Link>
					),
			},
			{
				Header: "Active",
				accessor: "isActive",
				Cell: ({ value }) => (
					<div className="flex items-center justify-center">
						{value === true ? (
							<MdOutlineRadioButtonChecked className="text-green-500" />
						) : (
							<MdOutlineRadioButtonChecked className="text-red-500" />
						)}
					</div>
				),
			},
			{
				Header: "role",
				accessor: "role",
			},
			{
				Header: "email",
				accessor: "email",
			},
			{
				Header: "phone",
				accessor: "phone",
			},
		],
		[]
	);

	const [isOpened, setIsOpened] = useState(false);
	const router = useRouter();

	const onProceed = () => {
		router.replace(router.asPath);
		console.log("Proceed clicked");
	};

	const onClose = () => {
		setIsOpened(false);
		console.log("close clicked");
	};

	const { RenderedTable } = useReactTable({
		tableData: flattenedList ?? [],
		canSort: true,
		hasPagination: true,
		tableColumns,
		tableInitialStates: { pageIndex: 0 },
	});
	return (
		<div className="container">
			<Model title="User">
				<AddUser onProceed={onProceed} onClose={modelProps.onClose} isStudent={false} />
			</Model>
			<RenderedTable />
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
					destination: Paths.SignIn,
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
				session,
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
