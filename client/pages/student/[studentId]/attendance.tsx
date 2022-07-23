import AddAttendance from "components/AddAttendance";
import AddModel from "components/AddModel";
import { GET_PAGINATED_STUDENT_ATTENDANCES } from "core/queries/attendancesQueries";
import { GET_USERS_IDS } from "core/queries/userQueries";
import { createAxiosService } from "core/utils";
import usePagination from "customHooks.tsx/usePagination";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";

function Attendance({ PaginatedAttendances, profileId }) {
	const {
		list,
		prevCursor,
		nextCursor,
		totalCount: { _count },
	} = PaginatedAttendances;

	const { PaginatedTable } = usePagination({
		list,
		_count,
		nextCursor,
		queryVariables: { studentId: profileId },
		hiddenColumns: ["note"],
		queryString: GET_PAGINATED_STUDENT_ATTENDANCES,
	});

	const ORDER = {
		desc: "desc",
		asc: "asc",
	};

	const [isOpened, setIsOpened] = useState(false);

	const [attendanceState, setAttendanceState] = useState({
		startAt: null,
		endAt: null,
		note: null,
	});

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const router = useRouter();
	// Call this function whenever you want to
	// refresh props!

	const onProceed = () => {
		router.replace(router.asPath);
		console.log("Proceed clicked");
	};

	const onClose = () => {
		setIsOpened(false);
		setAttendanceState({
			startAt: null,
			endAt: null,
			note: null,
		});
		console.log("close clicked");
	};

	const [pageSize, setPageSize] = useState(2);
	const [currentOrder, setCurrentOrder] = useState(ORDER.desc);
	const [isAscending, setIsAscending] = useState(false);
	const [currentSortProperty, setCurrentSortProperty] = useState("id");
	const [isLastPage, setIsLastPage] = useState(false);
	const [isFirstPage, setIsFirstPage] = useState(true);
	const [canGoNext, setCanGoNext] = useState(true);
	const [canGoPrevious, setCanPrevious] = useState(false);
	const [currentPageNumber, setCurrentPageNumber] = useState(1);
	const [paginationOption, setPaginationOption] = useState({
		studentId: profileId,
		myCursor: nextCursor,
		orderByKey: currentSortProperty,
		orderDirection: currentOrder,
		size: pageSize,
		skip: null,
	});

	const [paginationResult, setPaginationResult] = useState({
		list,
		prevCursor,
		nextCursor,
	});

	useEffect(() => {
		setPaginationOption({ ...paginationOption, size: pageSize });
		gotoFirst(true);
	}, [pageSize]);

	useEffect(() => {
		if (isAscending) {
			setCurrentOrder(ORDER.asc);
		} else {
			setCurrentOrder(ORDER.desc);
		}
		sortColumn(currentSortProperty, isAscending);
	}, [isAscending, currentSortProperty]);

	const data = useMemo(() => {
		return paginationResult.list;
	}, [paginationResult.list]);

	const attendancesColumns = useMemo(
		() =>
			data[0]
				? Object.keys(data[0])
						.filter((key) => key !== "id")
						.map((key) => {
							if (key === "startAt" || key === "endAt") {
								return {
									Header: key,
									accessor: key,
									Cell: ({ value }) =>
										value === null ? "_" : format(new Date(value), "hh:mm a"),
								};
							}
							return { Header: key, accessor: key };
						})
				: [],
		[list]
	);

	const rowEditHandler = (row) => {
		setAttendanceState({
			startAt: row.values.startAt,
			endAt: row.values.endAt,
			note: row.values.note,
		});
		setIsOpened(true);
		// alert("Note: " + row.values.note);
	};

	const tableHooks = (hooks) => {
		hooks.visibleColumns.push((columns) => [
			...columns,
			{
				id: "Edit",
				Header: "Edit",
				Cell: ({ row }) => {
					return (
						<button
							onClick={() => {
								setAttendanceState({
									startAt: row.values.startAt,
									endAt: row.values.endAt,
									note: row.values.note,
								});
								setIsOpened(true);
								// alert("Note: " + row.values.note);
							}}
						>
							Edit
						</button>
					);
				},
			},
		]);
	};

	const tableInstance = useTable(
		{
			columns: attendancesColumns,
			data,
			initialState: { hiddenColumns: ["note"] },
		},
		tableHooks
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
		const result = await createAxiosService(GET_PAGINATED_STUDENT_ATTENDANCES, options);
		const { list, prevCursor, nextCursor } = result?.data?.data?.PaginatedAttendances;
		if (list && list.length > 0) {
			setPaginationResult({
				list,
				prevCursor,
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

	const gotoFirst = async (
		force: boolean = false,
		currentSortProperty: string = null,
		currentOrder: string = null
	) => {
		if (!force && isFirstPage) return;
		let options = {
			...paginationOption,
			myCursor: null,
			size: pageSize,
			skip: null,
		};
		if (currentSortProperty) {
			options = { ...options, orderByKey: currentSortProperty };
		}
		if (currentOrder) {
			options = { ...options, orderDirection: currentOrder };
		}

		const result = await createAxiosService(GET_PAGINATED_STUDENT_ATTENDANCES, options);
		const { list, prevCursor, nextCursor } = result?.data?.data?.PaginatedAttendances;
		if (list && list.length > 0) {
			setPaginationResult({
				list,
				prevCursor,
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
		const result = await createAxiosService(GET_PAGINATED_STUDENT_ATTENDANCES, options);
		const { list, prevCursor, nextCursor } = result?.data?.data?.PaginatedAttendances;
		if (list && list.length > 0) {
			setPaginationResult({
				list,
				prevCursor,
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
			myCursor: paginationResult.prevCursor,
			size: -pageSize,
		};
		const result = await createAxiosService(GET_PAGINATED_STUDENT_ATTENDANCES, options);
		const { list, prevCursor, nextCursor } = result?.data?.data?.PaginatedAttendances;
		if (list && list.length > 0) {
			setPaginationResult({
				list,
				prevCursor,
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

	const gotoPage = async (cursor: string | null, previous: boolean = false) => {
		let options = {
			...paginationOption,
			myCursor: cursor,
			size: previous ? -paginationOption.size : paginationOption.size,
		};
		if (!cursor && previous && isLastPage) {
			options = {
				...options,
				size: -paginationOption.size * 2,
				skip: paginationOption.size,
			};
		}
		setPaginationOption(options);
		const result = await createAxiosService(GET_PAGINATED_STUDENT_ATTENDANCES, options);
		const { list, prevCursor, nextCursor } = result?.data?.data?.PaginatedAttendances;
		if (!list || list.length <= 0) {
			setPaginationResult({
				...paginationResult,
				nextCursor: null,
				prevCursor,
			});
			setPaginationOption({
				...paginationOption,
				myCursor: null,
			});
		} else {
			setPaginationResult({
				list,
				prevCursor,
				nextCursor,
			});
			setPaginationOption({
				...paginationOption,
				myCursor: nextCursor,
			});
		}

		let PageNumber: number = currentPageNumber;

		if (!cursor && previous && !isLastPage) {
			PageNumber = Math.abs(Math.ceil(_count / paginationOption.size));
			setIsLastPage(true);
		} else if (!cursor) {
			PageNumber = 1;
		} else if (previous) {
			PageNumber = Math.abs(PageNumber === 1 ? PageNumber : PageNumber - 1);
		} else if (!list || list.length <= 0) {
		} else {
			PageNumber = Math.abs(PageNumber + 1);
		}
		setCurrentPageNumber(Math.abs(PageNumber));

		if (PageNumber === Math.abs(Math.ceil(_count / paginationOption.size))) {
			setIsLastPage(true);
		} else {
			setIsLastPage(false);
		}
	};

	const sortColumn = (sortProperty: string, isAsc: boolean = false) => {
		const sortDirection = isAsc ? "asc" : "desc";
		gotoFirst(true, sortProperty, sortDirection);
	};

	const headerClickHandler = (headerName: string) => {
		if (headerName.toLowerCase() === "edit") return;
		setCurrentSortProperty(headerName);
		setIsAscending(!isAscending);
	};

	return (
		<div className="container grid">
			<AddModel isOpened={isOpened} onClose={onClose} title="Add Attendance">
				<AddAttendance
					onProceed={onProceed}
					onClose={onClose}
					initialAttendance={{
						profileId,
						startAt: attendanceState.startAt,
						endAt: attendanceState.endAt,
						note: attendanceState.note,
					}}
				/>
			</AddModel>

			<div
				className="text-md px-6 py-2 w-32 text-center rounded-md bg-green-500 text-indigo-50 font-semibold cursor-pointer justify-self-end"
				onClick={() => setIsOpened(true)}
			>
				Add
			</div>
			<PaginatedTable />
		</div>
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
	const result = await createAxiosService(GET_PAGINATED_STUDENT_ATTENDANCES, {
		studentId: params.studentId,
		myCursor: null,
		orderByKey: "note",
		orderDirection: "desc",
		size: 2,
	});

	if (result?.data?.data) {
		return {
			props: {
				PaginatedAttendances: result?.data?.data.PaginatedAttendances,
				profileId: params.studentId,
			},
		};
	}

	// Pass post data to the page via props
	return { props: {} };
}

export default Attendance;
