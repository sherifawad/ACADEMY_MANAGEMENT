import { IndeterminateCheckbox } from "components/IndeterminateCheckbox";
import Table from "components/Table";
import { createAxiosService, getDayNames } from "core/utils";
import { format } from "date-fns";
import Image from "next/image";
import { ChangeEvent, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { Column, Hooks, useRowSelect, useTable } from "react-table";
import { inputHooks, newInputColumn, useCheckboxes, useEditHooks, useInputHooks } from "./reactTableHooks";
import useDataPagination from "./useDataPagination";
import usePrevious from "./usePrevious";

export interface paginationInputProps {
	list: any[];
	hiddenColumns?: string[] | undefined | null;
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
	query,
	queryVariables,
	tableInitialState,
	hiddenColumns,
	additionalHiddenColumns,
}: paginationInputProps) {
	const ORDER = {
		desc: "desc",
		asc: "asc",
	};
	const initialState = { hiddenColumns, stateArr: {}, selectedRowIds: {}, ...tableInitialState };

	const [checkedItems, setCheckedItems] = useState([]);
	const [inputsData, setInputData] = useState({});
	const [checkedAllItems, setCheckedAllItems] = useState([]);

	const [tableHooks, setTableHooks] = useState([]);
	const [hiddenColumnsIds, setHiddenColumnsIds] = useState([]);
	const [isAscending, setIsAscending] = useState(false);
	const [currentSortProperty, setCurrentSortProperty] = useState("id");

	const { RenderedPagination, gotoFirst, paginatedData, pageSize } = useDataPagination({
		list,
		_count,
		prevCursor,
		nextCursor,
		queryVariables,
		query,
		currentSortProperty,
	});

	const initialColumns = useMemo(
		() =>
			paginatedData[0]
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

	const handleAllCheckChange = useCallback(
		(e, rows) => {
			const { checked } = e.target;
			let result = [];
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
			return;
			// handleAllCheckChange(e, rows);
		} else {
			headerClickHandler(columnId);
		}
	}, []);

	// Setup table hooks

	const checkBoxHook = (hooks: any) => useCheckboxes(hooks, setCheckedItems);
	const inputHook = (hooks: any) => useInputHooks(hooks, inputColumn.columId, inputColumn.headerName);
	const editHook = (hooks: any) => useEditHooks(hooks, editRowHandler);

	// if (hasCheckBox) {
	// 	setTableHooks((prevState) => {
	// 		return [...prevState, useRowSelect, checkBoxHook];
	// 	});
	// }

	// if (inputColumn) {
	// 	setTableHooks((prevState) => {
	// 		return [...prevState, inputHook];
	// 	});
	// }

	// if (edit?.name) {
	// 	setTableHooks((prevState) => {
	// 		return [...prevState, editHook];
	// 	});
	// }

	// useEffect(() => {
	// 	setTableHooks((prevState) => {
	// 		const exist = prevState.some((x) => x.name === checkBoxHook.name || x.name === useRowSelect.name);
	// 		if (hasCheckBox) {
	// 			return exist ? prevState : [...prevState, useRowSelect, checkBoxHook];
	// 		} else {
	// 			return prevState.filter((x) => x.name !== checkBoxHook.name || x.name !== useRowSelect.name);
	// 		}
	// 	});
	// }, [hasCheckBox]);

	// useEffect(() => {
	// 	setTableHooks((prevState) => {
	// 		const exist = prevState.some((x) => x.name === inputHook.name);
	// 		if (inputColumn) {
	// 			return exist ? prevState : [...prevState, inputHook];
	// 		} else {
	// 			return prevState.filter((x) => x.name !== inputHook.name);
	// 		}
	// 	});
	// }, [inputColumn?.columId, inputColumn?.headerName]);

	// useEffect(() => {
	// 	setTableHooks((prevState) => {
	// 		const exist = prevState.some((x) => x.name === editHook.name);
	// 		if (edit?.name) {
	// 			return exist ? prevState : [...prevState, editHook];
	// 		} else {
	// 			return prevState.filter((x) => x.name !== editHook.name);
	// 		}
	// 	});
	// }, [edit?.name]);

	// useEffect(() => {
	// 	console.log("🚀 ~ file: usePagination.tsx ~ line 288 ~ checkedItems", checkedItems);
	// }, [checkedItems]);

	// useEffect(() => {
	// 	console.log("🚀 ~ file: usePagination.tsx ~ line 288 ~ checkedItems", inputsData);
	// }, [inputsData]);

	// useEffect(() => {
	// 	console.log("🚀 ~ file: usePagination.tsx ~ line 288 ~ stateArr", (state as any).stateArr);
	// }, [state]);

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
			setCurrentSortProperty(headerName);
			setIsAscending((prevState) => {
				sortColumn(headerName, !prevState);
				return !prevState;
			});
		},
		[isAscending, currentSortProperty, pageSize]
	);

	const getRowId = useCallback((row) => {
		return row?.original?.id || row?.id;
	}, []);

	const tableInstance = useTable(
		{
			columns,
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
		(hooks: any) => useCheckboxes(hooks, setCheckedItems),
		useRowSelect,
		(hooks: any) => useInputHooks(hooks, inputColumn?.columId, inputColumn?.headerName),
		(hooks: any) => useEditHooks(hooks, editRowHandler)
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
					hiddenColumnsIds={additionalHiddenColumns}
				/>
			);
		};
	}, [paginatedData, tableHooks]);

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
	}, [paginatedData, tableHooks]);

	return {
		PaginatedTable,
		checkedItems,
		inputsData,
		refetch: () => gotoFirst({ force: true }),
	};
}

export default usePagination;
