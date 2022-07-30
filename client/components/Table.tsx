import { useCallback, useEffect, useState } from "react";
import { useTable } from "react-table";

function Table({
	columns,
	data,
	hooks,
	initialState,
	getRowId,
	currentSortProperty,
	isAscending,
	headerClick,
	setInputData,
}) {
	const tableInstance = useTable(
		{
			columns,
			data,
			autoResetPage: false,
			autoResetExpanded: false,
			autoResetGroupBy: false,
			autoResetSelectedRows: false,
			autoResetSortBy: false,
			autoResetFilters: false,
			autoResetRowState: false,
			getRowId,
			initialState,
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

		...hooks
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		state,
		rows, // Instead of using 'rows', we'll use page,
	} = tableInstance;

	useEffect(() => {
		setInputData((state as any)?.stateArr);
	}, [state]);

	return (
		<table {...getTableProps()} className="w-full">
			<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
				{headerGroups.map((headerGroup) => (
					<tr
						{...headerGroup.getHeaderGroupProps()}
						className="text-md font-semibold tracking-wide text-center text-gray-900 bg-gray-100 uppercase border-b border-gray-600"
					>
						{headerGroup.headers.map((column: any, idex) => (
							<th key={idex} {...column.getHeaderProps()} className="px-4 py-3">
								<a
									href="#"
									onClick={(e) => {
										headerClick(e, rows, column.id);
									}}
								>
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
						<tr {...row.getRowProps()} className="text-gray-700 text-center">
							{row.cells.map((cell, idx) => {
								return (
									<td key={idx} className="px-4 py-3 border" {...cell.getCellProps()}>
										{cell.render("Cell")}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default Table;
