import { IndeterminateCheckbox } from "components/IndeterminateCheckbox";
import Table from "components/Table";
import { createAxiosService, getDayNames } from "core/utils";
import { format } from "date-fns";
import Image from "next/image";
import { ChangeEvent, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { Column, Hooks, useRowSelect, useTable } from "react-table";
import { inputHooks, newInputColumn, useCheckboxes, useEditHooks, useInputHooks } from "./reactTableHooks";
import usePrevious from "./usePrevious";

export interface paginationInputProps {
	list: any[];
	hiddenColumns?: string[] | undefined | null;
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
	prevCursor,
	nextCursor,
	edit,
	hasCheckBox,
	inputColumn,
	setItemsState,
	formatDate = "dd MMM hh:mm a",
	hiddenColumns,
	query,
	queryVariables,
	tableInitialState,
}: paginationInputProps) {
	const ORDER = {
		desc: "desc",
		asc: "asc",
	};
	const initialState = { hiddenColumns, stateArr: {}, ...tableInitialState };

	const [checkedItems, setCheckedItems] = useState([]);
	const [inputsData, setInputData] = useState({});
	const [checkedAllItems, setCheckedAllItems] = useState([]);

	const [tableHooks, setTableHooks] = useState([]);
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
		data: {
			myCursor: nextCursor,
			orderByKey: currentSortProperty,
			orderDirection: currentOrder,
			take: pageSize,
			skip: null,
		},
	});

	const [paginationResult, setPaginationResult] = useState({
		list,
		prevCursor,
		nextCursor,
	});

	useEffect(() => {
		setPaginationOption({ ...paginationOption, data: { ...paginationOption.data, take: pageSize } });
		gotoFirst({ force: true, take: pageSize });
	}, [pageSize]);

	const data = useMemo(() => {
		return paginationResult.list;
	}, [paginationResult.list]);

	const initialColumns = useMemo(
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
						} else if (key === "name") {
							return {
								Header: key,
								accessor: key,
								Cell: ({
									row: {
										original: { avatar },
									},
									value,
								}) =>
									value === null ? (
										""
									) : (
										<div className="flex items-center gap-2">
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
										</div>
									),
							};
						}
						return { Header: key, accessor: key };
				  })
				: [],
		[list]
	) as any;

	const [columns, setColumns] = useState(initialColumns);
	const [hasInputColumn, setHasInputColumn] = useState(false);

	const handleAllCheckChange = useCallback(
		(e, rows) => {
			const { checked } = e.target;
			let result = [];
			console.log("🚀 ~ file: usePagination.tsx ~ line 190 ~ checked", checked);
			if (checked) {
				rows.map(({ original: { id } }) => result.push(id));
				setCheckedAllItems(result);
				setCheckedItems((prevState) => [...prevState, ...result]);
			} else {
				result = checkedItems.filter(function (val) {
					return checkedAllItems.indexOf(val) == -1;
				});
				setCheckedAllItems([]);
			}
			setCheckedItems(result);
		},
		[checkedItems]
	);

	const editRowHandler = (values: any) => {
		if (values) {
			if (setItemsState) {
				setItemsState(values);
			}
			if (edit) edit(values);
		}
	};

	const headerClick = useCallback((e, rows, columnId) => {
		if (columnId === "selection") {
			handleAllCheckChange(e, rows);
		} else {
			headerClickHandler(columnId);
		}
	}, []);

	// Setup table hooks

	const checkBoxHook = (hooks: any) => useCheckboxes(hooks, setCheckedItems);
	const inputHook = (hooks: any) => useInputHooks(hooks, inputColumn.columId, inputColumn.headerName);
	const editHook = (hooks: any) => useEditHooks(hooks, editRowHandler);

	useEffect(() => {
		if (hasCheckBox) {
			setTableHooks((prevState) => {
				if (prevState.indexOf(checkBoxHook) > -1) return prevState;
				return [...prevState, useRowSelect, checkBoxHook];
			});
		} else {
			setTableHooks((prevState) => {
				return prevState.filter((x) => x === checkBoxHook || x === useRowSelect);
			});
		}
	}, [hasCheckBox]);

	useEffect(() => {
		if (inputColumn) {
			const isEmpty = Object.keys(inputColumn).length === 0;
			if (isEmpty) {
				return;
			}

			setTableHooks((prevState) => {
				if (prevState.indexOf(inputHook) > -1) return prevState;
				return [...prevState, inputHook];
			});
		} else {
			setTableHooks((prevState) => {
				return prevState.filter((x) => x === inputHook);
			});
		}
	}, [inputColumn?.columId, inputColumn?.headerName]);

	useEffect(() => {
		if (edit.name) {
			setTableHooks((prevState) => {
				if (prevState.indexOf(editHook) > -1) return prevState;
				return [...prevState, editHook];
			});
		} else {
			setTableHooks((prevState) => {
				return prevState.filter((x) => x === editHook);
			});
		}
	}, [edit.name]);

	// if (hasCheckBox) {
	// 	tableHooks.push(useRowSelect);
	// 	tableHooks.push((hooks: any) => useCheckboxes(hooks, setCheckedItems));
	// }
	// if (inputColumn) {
	// 	const isEmpty = Object.keys(inputColumn).length === 0;
	// 	if (isEmpty) {
	// 		return;
	// 	}
	// 	tableHooks.push((hooks: any) => useInputHooks(hooks, inputColumn.columId, inputColumn.headerName));
	// }
	// if (edit.name) {
	// 	tableHooks.push((hooks: any) => useEditHooks(hooks, editRowHandler));
	// }

	const getRowId = useCallback((row) => {
		return row?.original?.id || row?.id;
	}, []);

	// useEffect(() => {
	// 	console.log("🚀 ~ file: usePagination.tsx ~ line 288 ~ checkedItems", checkedItems);
	// }, [checkedItems]);

	// useEffect(() => {
	// 	console.log("🚀 ~ file: usePagination.tsx ~ line 288 ~ checkedItems", inputsData);
	// }, [inputsData]);

	// useEffect(() => {
	// 	console.log("🚀 ~ file: usePagination.tsx ~ line 288 ~ stateArr", (state as any).stateArr);
	// }, [state]);

	const gotoLast = async () => {
		if (isLastPage) return;
		const options = {
			...paginationOption,
			data: { ...paginationOption.data, myCursor: null, take: -pageSize, skip: null },
		};
		const { list, prevCursor, nextCursor } = await query(options);
		if (list && list.length > 0) {
			setPaginationResult({
				list,
				prevCursor,
				nextCursor,
			});
			setPaginationOption({
				...paginationOption,
				data: { ...paginationOption.data, myCursor: nextCursor },
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
		if (isFirstPage) {
			if (!force) return;
		}
		let options = {
			...paginationOption,
			data: { ...paginationOption.data, take, myCursor: null, skip: null },
		};
		if (currentSortProperty) {
			options = { ...options, data: { ...options.data, orderByKey: currentSortProperty } };
		}
		if (currentOrder) {
			options = { ...options, data: { ...options.data, orderDirection: currentOrder } };
		}

		const { list, prevCursor, nextCursor } = await query(options);
		if (list && list.length > 0) {
			setPaginationResult({
				list,
				prevCursor,
				nextCursor,
			});
			setPaginationOption({
				...paginationOption,
				data: {
					...paginationOption.data,
					myCursor: nextCursor,
					orderDirection: options.data.orderDirection,
					orderByKey: options.data.orderByKey,
				},
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
			data: { ...paginationOption.data, take: pageSize },
		};
		const { list, prevCursor, nextCursor } = await query(options);
		if (list && list.length > 0) {
			setPaginationResult({
				list,
				prevCursor,
				nextCursor,
			});
			setPaginationOption({
				...paginationOption,
				data: { ...paginationOption.data, myCursor: nextCursor },
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
			data: {
				...paginationOption.data,
				myCursor: paginationResult.prevCursor,
				take: -pageSize,
			},
		};
		let resultList;
		let result = await query(options);
		resultList = result.list;
		if (resultList && resultList.length > 0) {
			if (isLastPage && resultList.length < pageSize) {
				const newSize = pageSize - resultList.length - pageSize;
				options = {
					...options,
					data: {
						...options.data,
						myCursor: null,
						take: pageSize,
					},
				};
				result = await query(options);
				resultList = result.list;
			}
			if (resultList && resultList.length > 0) {
				const { list, prevCursor, nextCursor } = result;
				setPaginationResult({
					list,
					prevCursor,
					nextCursor,
				});
				setPaginationOption({
					...paginationOption,
					data: { ...paginationOption.data, myCursor: nextCursor },
				});
				if (currentPageNumber - 1 === 1) {
					setCanPrevious(false);
					setIsFirstPage(true);
				}
				setCanGoNext(true);
				setIsLastPage(false);
				setCurrentPageNumber(currentPageNumber - 1);
			}
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
			if (headerName.toLowerCase() === "selection") return;
			console.log("sort clicked");
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
							<Table
								columns={columns}
								data={data}
								hooks={tableHooks}
								initialState={initialState}
								getRowId={getRowId}
								currentSortProperty={currentSortProperty}
								isAscending={isAscending}
								headerClick={headerClick}
								setInputData={setInputData}
							/>
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
									onClick={() => gotoFirst({})}
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
	}, [paginationResult.list, columns]);

	return {
		PaginatedTable,
		checkedItems,
		inputsData,
		refetch: () => gotoFirst({ force: true }),
	};
}

export default usePagination;
