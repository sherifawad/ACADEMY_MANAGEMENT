import { getDayNames } from "core/utils";
import useModel from "customHooks/useModel";
import useReactTable from "customHooks/useReactTable";
import { format } from "date-fns";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { MdOutlineRadioButtonChecked } from "react-icons/md";

function StudentsListPageContent({ flattenedList }) {
	const formatDate = "dd MMM hh:mm a";

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
						<Link href={`/student/${id}`}>
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
				Header: "phone",
				accessor: "phone",
			},
			{
				Header: "parentsPhones:",
				accessor: "parentsPhones:",
			},
			{
				Header: "address",
				accessor: "address",
			},
			{
				Header: "email",
				accessor: "email",
			},
		],
		[]
	);
	const { RenderedTable } = useReactTable({
		tableData: flattenedList,
		canSort: true,
		hasPagination: true,
		tableColumns,
		tableInitialStates: { pageIndex: 0 },
	});
	return <RenderedTable />;
}

export default StudentsListPageContent;
