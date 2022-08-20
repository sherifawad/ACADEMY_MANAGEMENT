import { IndeterminateCheckbox } from "components/IndeterminateCheckbox";
import Table from "components/Table";
import { createAxiosService, getDayNames, renameKeyValue } from "core/utils";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { Column, Hooks, useRowSelect, useTable } from "react-table";
import { inputHooks, newInputColumn, useCheckboxes, useEditHooks, useInputHooks } from "./reactTableHooks";
import useAuth from "./useAuth";
import useDataPagination from "./useDataPagination";

export interface paginationInputProps {
	list: any[];
	sortList?: any[];
	tableHooks?: any[] | null;
	hiddenColumns?: string[] | undefined | null;
	tableColumns?: any[] | undefined | null;
	additionalHiddenColumns?: string[] | undefined | null;
	formatDate?: string | null;
	_count?: number | null;
	prevCursor?: string | null;
	nextCursor?: string | null;
	edit?: Function | null;
	hasCheckBox?: boolean | null;
	setItemsState?: Function | null;
	queryVariables?: {} | null;
	query?: Function | null;
	inputColumn?: inputHooks | null;
	tableInitialState?: any;
	accessToken: string;
}

function usePagination({
	list,
	sortList = [],
	_count,
	prevCursor,
	nextCursor,
	edit,
	hasCheckBox,
	inputColumn,
	setItemsState,
	formatDate = "dd MMM hh:mm a",
	tableColumns,
	query,
	queryVariables,
	tableInitialState,
	hiddenColumns = [],
	additionalHiddenColumns,
	tableHooks = [],
	accessToken,
}: paginationInputProps) {
	const initialState = { hiddenColumns, stateArr: {}, selectedRowIds: {}, ...tableInitialState };
	const [checkedItems, setCheckedItems] = useState([]);
	const [inputsData, setInputData] = useState({});
	const [pageSize, setPageSize] = useState(5);
	const [isAscending, setIsAscending] = useState(false);
	const [currentSortProperty, setCurrentSortProperty] = useState("id");
	const [sort, setSort] = useState(sortList);


	const { RenderedPagination, gotoFirst, paginatedData } = useDataPagination({
		list,
		_count,
		prevCursor,
		nextCursor,
		queryVariables,
		query,
		currentSortProperty,
		setPageSize,
		pageSize,
		sort,
		accessToken,
	});

	const initialColumns = useMemo(
		() =>
			tableColumns?.length > 0
				? tableColumns
				: paginatedData[0]
				? Object.keys(paginatedData[0]).map((key) => {
						if (key === "startAt" || key === "endAt") {
							return {
								Header: key,
								accessor: key,
								Cell: ({ value }) =>
									value === null
										? "_"
										: `${getDayNames(value)} ${format(new Date(value), formatDate)}`,
							};
						} else if (key === "name") {
							return {
								Header: key,
								accessor: key,
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
							};
						}
						return { Header: key, accessor: key };
				  })
				: [],
		[list]
	) as any;

	const headerClick = useCallback((e, rows, columnId) => {
		if (columnId === "selection") {
			return;
			// handleAllCheckChange(e, rows);
		} else {
			headerClickHandler(columnId);
		}
	}, []);

	const sortColumn = useCallback(
		(sortProperty: string, isAsc: boolean = false) => {
			const sortDirection = isAsc ? "asc" : "desc";
			let sortObject: [{ [x: string]: string }];
			if (sort && sort.length > 0) {
				const result = renameKeyValue(sort[0], "currentSortProperty", sortProperty, sortDirection);
				sortObject = [result];
			} else {
				sortObject = [{ [sortProperty]: sortDirection }];
			}
			gotoFirst({
				force: true,
				sort: sortObject,
				token: accessToken,
			});
		},
		[sort]
	);

	const headerClickHandler = useCallback(
		(headerName: string) => {
			if (headerName.toLowerCase() === "edit") return;
			if (headerName.toLowerCase() === "selection") return;
			setCurrentSortProperty(headerName);
			setIsAscending((prevState) => {
				sortColumn(headerName, !prevState);
				return !prevState;
			});
		},
		[isAscending, currentSortProperty]
	);

	const getRowId = useCallback((row) => {
		return row?.original?.id || row?.id;
	}, []);

	const tableInstance = useTable(
		{
			columns: initialColumns,
			data: paginatedData,
			initialState,
			autoResetSelectedRows: false,
			autoResetPage: false,
			autoResetFilters: false,
			autoResetSelectedCell: false,
			autoResetSelectedColumn: false,
			getRowId,
			stateReducer: (
				newState: { stateArr: any },
				action: { type: any; payload: any },
				prevState: any
			) => {
				switch (action.type) {
					case "add": {
						return {
							...prevState,
							stateArr: { ...prevState.stateArr, ...action.payload },
						};
					}
					case "remove": {
						const { [action.payload]: _, ...newData } = prevState.stateArr;
						return {
							...prevState,
							stateArr: { ...newData },
						};
					}
					default:
						return newState;
				}
			},
		} as any,
		...tableHooks
	);

	const RenderedTable = useMemo(() => {
		return () => {
			return (
				<Table
					tableInstance={tableInstance}
					currentSortProperty={currentSortProperty}
					isAscending={isAscending}
					headerClick={headerClick}
					setInputData={setInputData}
					setCheckedItems={setCheckedItems}
					hiddenColumnsIds={additionalHiddenColumns}
					hiddenColumns={hiddenColumns}
				/>
			);
		};
	}, [
		paginatedData,
		pageSize,
		tableHooks?.length > 1 ? tableHooks : undefined,
		additionalHiddenColumns?.length > 1 ? additionalHiddenColumns : undefined,
	]);

	const PaginatedTable = useMemo(() => {
		return () => {
			return (
				<div>
					<div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg pt-4">
						<div className="w-full overflow-x-auto"></div>
					</div>
					<RenderedTable />
					<RenderedPagination />
				</div>
			);
		};
	}, [
		paginatedData,
		pageSize,
		tableHooks?.length > 1 ? tableHooks : undefined,
		additionalHiddenColumns?.length > 1 ? additionalHiddenColumns : undefined,
	]);

	return {
		PaginatedTable,
		checkedItems,
		inputsData,
		refetch: () => gotoFirst({ force: true, token: accessToken }),
	};
}

export default usePagination;
