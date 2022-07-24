import React, { useMemo } from "react";
import { Column, Hooks, Row, useRowSelect, useTable } from "react-table";
import { IndeterminateCheckbox } from "./IndeterminateCheckbox";

export const useCheckboxes = (hooks: Hooks) => {
	hooks.visibleColumns.push((columns: Column[]) => [
		{
			id: "selection",
			width: "50px",
			className: "checkbox",
			Header: ({ getToggleAllRowsSelectedProps }) => (
				<div>
					<IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
				</div>
			),
			Cell: ({ row }) => (
				<div>
					<IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
				</div>
			),
		},
		...columns,
	]);
};

function StudentsGroupList({ students = [] }) {
	const columns = useMemo(
		() =>
			students[0]
				? Object.keys(students[0]).map((key) => {
						return { Header: key, accessor: key };
				  })
				: [],
		[students]
	);
	const data = useMemo(() => students, []);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, selectedFlatRows } = useTable(
		{
			columns,
			data,
			initialState: { hiddenColumns: ["id"] },
		},
		useRowSelect,
		useCheckboxes
	);

	// const firstPageRows = rows.slice(0, 10);

	return (
		<>
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column: any) => (
								<th {...column.getHeaderProps()}>{column.render("Header")}</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			<pre>
				<code>
					{JSON.stringify(
						{
							selectedFlatRows: selectedFlatRows.map((row) => row.original),
						},
						null,
						2
					)}
				</code>
			</pre>
		</>
	);
}

export default StudentsGroupList;
