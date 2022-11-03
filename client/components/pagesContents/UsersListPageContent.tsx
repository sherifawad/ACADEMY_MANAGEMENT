import { getDayNames } from "core/utils";
import useModel from "customHooks/useModel";
import useReactTable from "customHooks/useReactTable";
import { format } from "date-fns";
import AddUser from "features/userFeature/AddUser";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { MdOutlineRadioButtonChecked } from "react-icons/md";

function UsersListPageContent({ flattenedList }) {
	// const AddUser = dynamic(() => import("features/userFeature/AddUser"), {
	// 	ssr: false,
	// });

	const [show, setShow] = useState(false);
	useEffect(() => {
		setShow(true);
	}, []);

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
			{show ? (
				<Model title="User">
					<AddUser onProceed={onProceed} onClose={modelProps.onClose} isStudent={false} />
				</Model>
			) : null}
			<RenderedTable />
		</div>
	);
}

export default UsersListPageContent;
