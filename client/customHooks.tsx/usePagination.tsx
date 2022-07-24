import { createAxiosService, getDayNames } from "core/utils";
import { format } from "date-fns";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";

export interface paginationInputProps {
	list: any[];
	hiddenColumns?: string[] | undefined | null;
	formatDate?: string | null;
	_count?: number | null;
	nextCursor?: string | null;
	queryString: string;
	edit?: Function | null;
	setItemsState?: Function | null;
	queryVariables?: {} | null;
}

export interface goFirstInputProps {
	force?: boolean | null;
	currentSortProperty?: string | null;
	currentOrder?: string;
	take?: number | null;
}

function usePagination({
	list,
	_count,
	nextCursor,
	edit,
	setItemsState,
	formatDate = "dd MMM hh:mm a",
	hiddenColumns,
	queryString,
	queryVariables,
}: paginationInputProps) {
	const ORDER = {
		desc: "desc",
		asc: "asc",
	};

	const [pageSize, setPageSize] = useState(5);
	const [currentOrder, setCurrentOrder] = useState(ORDER.asc);
	const [isAscending, setIsAscending] = useState(false);
	const [currentSortProperty, setCurrentSortProperty] = useState("id");
	const [isLastPage, setIsLastPage] = useState(false);
	const [isFirstPage, setIsFirstPage] = useState(true);
	const [canGoNext, setCanGoNext] = useState(true);
	const [canGoPrevious, setCanPrevious] = useState(false);
	const [currentPageNumber, setCurrentPageNumber] = useState(1);
	const [paginationOption, setPaginationOption] = useState({
		...queryVariables,
		myCursor: nextCursor,
		orderByKey: currentSortProperty,
		orderDirection: currentOrder,
		size: pageSize,
		skip: null,
	});

	const [paginationResult, setPaginationResult] = useState({
		list,
		nextCursor,
	});

	useEffect(() => {
		setPaginationOption({ ...paginationOption, size: pageSize });
		gotoFirst({ force: true, take: pageSize });
	}, [pageSize]);

	const data = useMemo(() => {
		return paginationResult.list;
	}, [paginationResult.list]);

	const columns = useMemo(
		() =>
			data[0]
				? Object.keys(data[0]).map((key) => {
						if (key === "startAt" || key === "endAt") {
							return {
								Header: key,
								accessor: key,
								Cell: ({ value }) =>
									value === null
										? "_"
										: `${getDayNames(value)} ${format(new Date(value), formatDate)}`,
							};
						}
						return { Header: key, accessor: key };
				  })
				: [],
		[list]
	);

	const editRowHandler = (row) => {
		setItemsState({
			...row.values,
		});
	};

	const tableHooks = (hooks) => {
		hooks.visibleColumns.push((columns) => [
			...columns,
			{
				id: "Edit",
				Header: "Edit",
				Cell: ({ row }) => {
					return <button onClick={() => editRowHandler(row)}>Edit</button>;
				},
			},
		]);
	};

	const tableInstance = useTable(
		{
			columns,
			data,
			initialState: { hiddenColumns },
		},
		edit ? tableHooks : ""
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		rows, // Instead of using 'rows', we'll use page,
	} = tableInstance;

	const gotoLast = async () => {
		if (isLastPage) return;
		const options = {
			...paginationOption,
			myCursor: null,
			size: -pageSize,
			skip: null,
		};
		const result = await createAxiosService(queryString, options);
		const { list, nextCursor } = result?.data?.data?.PaginatedAttendances;
		if (list && list.length > 0) {
			setPaginationResult({
				list,
				nextCursor,
			});
			setPaginationOption({
				...paginationOption,
				myCursor: nextCursor,
			});
			setIsLastPage(true);
			setIsFirstPage(false);
			setCanGoNext(false);
			setCanPrevious(true);
			setCurrentPageNumber(Math.abs(Math.ceil(_count / pageSize)));
		}
	};

	const gotoFirst = async ({
		force = false,
		currentSortProperty = null,
		currentOrder = null,
		take = pageSize,
	}: goFirstInputProps) => {
		if (!force && isFirstPage) return;
		let options = {
			...paginationOption,
			size: take,
			myCursor: null,
			skip: null,
		};
		if (currentSortProperty) {
			options = { ...options, orderByKey: currentSortProperty };
		}
		if (currentOrder) {
			options = { ...options, orderDirection: currentOrder };
		}

		const result = await createAxiosService(queryString, options);
		const { list, nextCursor } = result?.data?.data?.PaginatedAttendances;
		if (list && list.length > 0) {
			setPaginationResult({
				list,
				nextCursor,
			});
			setPaginationOption({
				...paginationOption,
				myCursor: nextCursor,
				orderDirection: options.orderDirection,
				orderByKey: options.orderByKey,
			});
			setIsFirstPage(true);
			setCanGoNext(true);
			setIsLastPage(false);
			setCanPrevious(false);
			setCurrentPageNumber(1);
			if (pageSize >= _count) {
				setIsFirstPage(true);
				setIsLastPage(true);
				setCanGoNext(false);
				setCanPrevious(false);
			}
		}
	};

	const gotoNext = async () => {
		if (!canGoNext) return;
		const options = {
			...paginationOption,
			size: pageSize,
		};
		const result = await createAxiosService(queryString, options);
		const { list, nextCursor } = result?.data?.data?.PaginatedAttendances;
		if (list && list.length > 0) {
			setPaginationResult({
				list,
				nextCursor,
			});
			setPaginationOption({
				...paginationOption,
				myCursor: nextCursor,
			});
			if (currentPageNumber + 1 === Math.abs(Math.ceil(_count / pageSize))) {
				setCanGoNext(false);
				setIsLastPage(true);
			}
			setIsFirstPage(false);
			setCanPrevious(true);
			setCurrentPageNumber(currentPageNumber + 1);
		}
	};

	const gotoPrevious = async () => {
		if (!canGoPrevious) return;
		let options = {
			...paginationOption,
			myCursor: paginationResult.nextCursor,
			size: -pageSize,
		};
		const result = await createAxiosService(queryString, options);
		const { list, nextCursor } = result?.data?.data?.PaginatedAttendances;
		if (list && list.length > 0) {
			setPaginationResult({
				list,
				nextCursor,
			});
			setPaginationOption({
				...paginationOption,
				myCursor: nextCursor,
			});
			if (currentPageNumber - 1 === 1) {
				setCanPrevious(false);
				setIsFirstPage(true);
			}
			setCanGoNext(true);
			setIsLastPage(false);
			setCurrentPageNumber(currentPageNumber - 1);
		}
	};

	const sortColumn = useCallback(
		(sortProperty: string, isAsc: boolean = false) => {
			const sortDirection = isAsc ? "asc" : "desc";
			gotoFirst({
				force: true,
				currentSortProperty: sortProperty,
				currentOrder: sortDirection,
				take: pageSize,
			});
		},
		[pageSize]
	);

	const headerClickHandler = useCallback(
		(headerName: string) => {
			if (headerName.toLowerCase() === "edit") return;
			setCurrentSortProperty(headerName);
			setIsAscending(!isAscending);
			sortColumn(headerName, !isAscending);
		},
		[isAscending, currentSortProperty, pageSize]
	);

	const PaginatedTable = useMemo(() => {
		return () => {
			return (
				<>
					<div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg pt-4">
						<div className="w-full overflow-x-auto">
							<table {...getTableProps()} className="w-full">
								<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
									{headerGroups.map((headerGroup) => (
										<tr
											{...headerGroup.getHeaderGroupProps()}
											className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600"
										>
											{headerGroup.headers.map((column: any) => (
												<th {...column.getHeaderProps()} className="px-4 py-3">
													<a href="#" onClick={() => headerClickHandler(column.id)}>
														{column.render("Header")}
														{column.id !== "Edit" && (
															<span>
																{column.id === currentSortProperty
																	? isAscending
																		? " ▲"
																		: " ▼"
																	: ""}
															</span>
														)}
													</a>
												</th>
											))}
										</tr>
									))}
								</thead>

								<tbody {...getTableBodyProps()} className="bg-white">
									{rows.map((row) => {
										prepareRow(row);

										return (
											<tr {...row.getRowProps()} className="text-gray-700">
												{row.cells.map((cell) => {
													return (
														<td
															{...cell.getCellProps()}
															className="px-4 py-3 border"
														>
															{cell.render("Cell")}
														</td>
													);
												})}
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>

					<div className="flex items-center justify-center">
						<div className="flex flex-col items-center mb-8 px-4 mx-auto mt-8">
							<div className="font-sans flex justify-end items-center space-x-1 select-none whitespace-nowrap">
								<a
									href="#"
									className={`px-4 py-2 text-gray-700 bg-gray-200 rounded-md ${
										isFirstPage ? "" : "hover:bg-teal-400 hover:text-white"
									}`}
									style={{ transition: "all 0.2s ease" }}
									onClick={gotoFirst}
								>
									First
								</a>
								<a
									href="#"
									className={`px-4 py-2 text-gray-700 bg-gray-200 rounded-md ${
										canGoPrevious ? "hover:bg-teal-400 hover:text-white" : ""
									}`}
									style={{ transition: "all 0.2s ease" }}
									onClick={gotoPrevious}
								>
									Prev
								</a>
								<a
									href="#"
									className={`px-4 py-2 text-gray-700 bg-gray-200 rounded-md ${
										canGoNext ? "hover:bg-teal-400 hover:text-white" : ""
									}`}
									style={{ transition: "all 0.2s ease" }}
									onClick={gotoNext}
								>
									Next
								</a>
								<a
									href="#"
									className={`px-4 py-2 text-gray-700 bg-gray-200 rounded-md ${
										!isLastPage ? "hover:bg-teal-400 hover:text-white" : ""
									}`}
									style={{ transition: "all 0.2s ease" }}
									onClick={gotoLast}
								>
									Last
								</a>
								<span>
									Page{" "}
									<strong>
										{Math.abs(currentPageNumber)} of{" "}
										{Math.abs(Math.ceil(_count / pageSize))}
									</strong>{" "}
								</span>
								{/*<span>
							| Go to page:{" "}
							<input
								type="number"
								defaultValue={pageIndex + 1}
								onChange={(e) => {
									const page = e.target.value ? Number(e.target.value) - 1 : 0;
									gotoPage(page);
								}}
								style={{ width: "100px" }}
							/>
						</span>*/}
								<select
									value={pageSize}
									onChange={(e) => {
										setPageSize(Number(e.target.value));
									}}
								>
									{[1, 2, 5, 10, 15].map((pageSize) => (
										<option key={pageSize} value={pageSize}>
											Show {pageSize}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>
				</>
			);
		};
	}, [paginationResult.list]);

	return {
		PaginatedTable,
		refetch: () => gotoFirst({ force: true }),
	};
}

export default usePagination;
