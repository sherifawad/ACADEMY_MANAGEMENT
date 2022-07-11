import { GET_STUDENT_EXAMS } from "core/queries/examsQueries";
import { GET_USERS_IDS } from "core/queries/userQueries";
import { createAxiosService } from "core/utils";
import { useMemo } from "react";
import { useSortBy, useTable } from "react-table";

function studentExams({ exams = [] }) {
	const columns = useMemo(
		() => [
			{
				Header: "Date",

				accessor: "date", // accessor is the "key" in the data
			},

			{
				Header: "Score",

				accessor: "score",
			},
		],

		[]
	);

	const examsColumns = useMemo(
		() =>
			exams[0]
				? Object.keys(exams[0])
						.filter((key) => key !== "id")
						.map((key) => {
							return { Header: key, accessor: key };
						})
				: [],
		[exams]
	);

	const data = useMemo(() => exams, [exams]);

	const tableHooks = (hooks) => {
		hooks.visibleColumns.push((columns) => [
			...columns,
			{
				id: "Edit",
				Header: "Edit",
				Cell: ({ row }) => <button onClick={() => alert("Score: " + row.values.score)}>Edit</button>,
			},
		]);
	};

	const tableInstance = useTable({ columns: examsColumns, data }, tableHooks, useSortBy);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

	return (
		<table {...getTableProps()} style={{ border: "solid 1px blue" }}>
			<thead>
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<th
								{...column.getHeaderProps(column.getSortByToggleProps())}
								style={{
									borderBottom: "solid 3px red",

									background: "aliceblue",

									color: "black",

									fontWeight: "bold",
								}}
							>
								{column.render("Header")}
								<span>{column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}</span>
							</th>
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
								return (
									<td
										{...cell.getCellProps()}
										style={{
											padding: "10px",

											border: "solid 1px gray",

											background: "papayawhip",
										}}
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
	);
}

export async function getStaticPaths() {
	const result = await createAxiosService(GET_USERS_IDS, {
		data: {
			role: "Student",
		},
	});

	if (result?.data?.data) {
		const paths = result.data?.data?.FilteredUsers?.map((user) => ({
			params: { studentId: user.id },
		}));
		return { paths, fallback: false };
	}
	return { fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
	const result = await createAxiosService(GET_STUDENT_EXAMS, { studentId: params.studentId });

	if (result?.data?.data) {
		return { props: { exams: result?.data?.data.UserExams } };
	}

	// Pass post data to the page via props
	return { props: {} };
}

export default studentExams;
