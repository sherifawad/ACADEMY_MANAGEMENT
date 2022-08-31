import { format } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Hooks, usePagination, useSortBy, useTable } from "react-table";
import { useEditHooks } from "./reactTableHooks";

export interface tableInputs {
	tableData: any[];
	tableColumns?: any[];
	hiddenColumns?: string[];
	tableInitialStates?: any;
	hasPagination?: boolean;
	hasEditColumn?: boolean;
	canSort?: boolean;
	editRow?: Function | null;
	setItemData?: Function | null;
}

function useReactTable({
	tableData = [],
	hasPagination = false,
	hasEditColumn = false,
	editRow,
	setItemData,
	canSort = false,
	hiddenColumns = [],
	tableColumns,
	tableInitialStates = {},
}: tableInputs) {
	const initialState = useMemo(() => {
		return {
			pageIndex: 0,
			pageSize: 5,
			...tableInitialStates,
			hiddenColumns,
		};
	}, [tableInitialStates, hiddenColumns]);

	const editRowHandler = useCallback(
		() => (values: any) => {
			if (values) {
				if (setItemData) {
					setItemData(values);
				}
				if (editRow) {
					editRow(values);
				}
			}
		},
		[setItemData, editRow]
	);

	const tableHooks = useMemo(() => {
		let hooksArray = [];
		if (canSort) {
			hooksArray.push(useSortBy);
		}
		if (hasPagination) {
			hooksArray.push(usePagination);
		}
		if (hasEditColumn) {
			hooksArray.push((hooks: Hooks) => useEditHooks(hooks, editRowHandler));
		}
		return hooksArray;
	}, [hasPagination, hasEditColumn, canSort]);

	const examsColumns = useMemo(
		() =>
			tableColumns?.length > 0
				? tableColumns
				: tableData[0]
				? Object.keys(tableData[0]).map((key) => {
						return { Header: key, accessor: key };
				  })
				: [],
		[tableData, tableColumns?.length > 0 ? tableColumns : undefined]
	);

	const data = useMemo(() => tableData, [tableData]);

	const tableInstance = useTable({ columns: examsColumns ?? [], data, initialState } as any, ...tableHooks);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page, // Instead of using 'rows', we'll use page,
		row,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	}: any = tableInstance;

	const RenderedTable = useMemo(() => {
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
											{headerGroup.headers.map((column) => {
												return (
													<th
														{...column.getHeaderProps(
															column.getSortByToggleProps()
														)}
														className="px-4 py-3"
													>
														<div className="flex items-center justify-center flex-wrap">
															{column.render("Header")}
															<span>
																{column.isSorted
																	? column.isSortedDesc
																		? " ▼"
																		: " ▲"
																	: ""}
															</span>
														</div>
													</th>
												);
											})}
										</tr>
									))}
								</thead>

								<tbody {...getTableBodyProps()} className="bg-white">
									{(hasPagination ? page : row)?.map((row) => {
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
										canPreviousPage ? "hover:bg-teal-400 hover:text-white" : ""
									}`}
									style={{ transition: "all 0.2s ease" }}
									onClick={() => gotoPage(0)}
								>
									First
								</a>
								<a
									href="#"
									className={`px-4 py-2 text-gray-700 bg-gray-200 rounded-md ${
										canPreviousPage ? "hover:bg-teal-400 hover:text-white" : ""
									}`}
									style={{ transition: "all 0.2s ease" }}
									onClick={() => previousPage()}
								>
									Prev
								</a>
								<a
									href="#"
									className={`px-4 py-2 text-gray-700 bg-gray-200 rounded-md ${
										canNextPage ? "hover:bg-teal-400 hover:text-white" : ""
									}`}
									style={{ transition: "all 0.2s ease" }}
									onClick={() => nextPage()}
								>
									Next
								</a>
								<a
									href="#"
									className={`px-4 py-2 text-gray-700 bg-gray-200 rounded-md ${
										canNextPage ? "hover:bg-teal-400 hover:text-white" : ""
									}`}
									style={{ transition: "all 0.2s ease" }}
									onClick={() => gotoPage(pageCount - 1)}
								>
									Last
								</a>
								<span>
									Page{" "}
									<strong>
										{pageIndex + 1} of {pageOptions.length}
									</strong>{" "}
								</span>
								<span>
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
								</span>{" "}
								<select
									value={pageSize}
									onChange={(e) => {
										setPageSize(Number(e.target.value));
									}}
								>
									{[1, 2, 3, 5, 10, 15, 30].map((pageSize) => (
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
	}, [tableData, page, row]);

	return {
		RenderedTable,
	};
}

export default useReactTable;
