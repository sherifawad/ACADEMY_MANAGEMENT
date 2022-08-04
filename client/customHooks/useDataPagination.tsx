import { useEffect, useMemo, useState } from "react";

export interface goFirstInputProps {
	force?: boolean | null;
	currentSortProperty?: string | null;
	currentOrder?: string;
	take?: number | null;
}

export interface dataPaginationProps {
	list: any[];
	currentSortProperty?: string | null;
	currentOrder?: string;
	_count?: number | null;
	prevCursor?: string | null;
	nextCursor?: string | null;
	queryVariables?: {} | null;
	query?: Function | null;
}

function useDataPagination({
	list,
	_count,
	prevCursor,
	nextCursor,
	queryVariables,
	query,
	currentOrder = "asc",
	currentSortProperty,
}: dataPaginationProps) {
	const [isLastPage, setIsLastPage] = useState(false);
	const [isFirstPage, setIsFirstPage] = useState(true);
	const [canGoNext, setCanGoNext] = useState(true);
	const [canGoPrevious, setCanPrevious] = useState(false);
	const [currentPageNumber, setCurrentPageNumber] = useState(1);
	const [pageSize, setPageSize] = useState(5);
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

	const RenderedPagination = useMemo(() => {
		return () => {
			return (
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
									{Math.abs(currentPageNumber)} of {Math.abs(Math.ceil(_count / pageSize))}
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
			);
		};
	}, [paginationResult.list]);

	return {
		RenderedPagination,
		paginatedData: paginationResult.list,
		gotoFirst,
		pageSize,
	};
}

export default useDataPagination;
