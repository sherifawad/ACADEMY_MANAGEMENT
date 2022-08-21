import { ObjectFlatten } from "core/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useAuth from "./useAuth";
import usePrevious from "./usePrevious";

export interface goFirstInputProps {
	force?: boolean | null;
	currentSortProperty?: string | null;
	currentOrder?: string;
	take?: number | null;
	sort?: any[];
	token: string;
}

export interface dataPaginationProps {
	list: any[];
	sort?: any[];
	currentSortProperty?: string | null;
	currentOrder?: string;
	_count?: number | null;
	prevCursor?: string | null;
	nextCursor?: string | null;
	queryVariables?: {} | null;
	query?: Function | null;
	setPageSize: Function;
	pageSize: number;
	accessToken: string;
}

function useDataPagination({
	list,
	_count,
	prevCursor,
	nextCursor,
	queryVariables,
	query,
	setPageSize,
	pageSize,
	sort,
	accessToken,
}: dataPaginationProps) {
	const currentPageSize = useMemo(() => pageSize, [pageSize]);
	const [isLastPage, setIsLastPage] = useState(false);
	const [isFirstPage, setIsFirstPage] = useState(true);
	const [canGoNext, setCanGoNext] = useState(true);
	const [canGoPrevious, setCanPrevious] = useState(false);
	const [currentPageNumber, setCurrentPageNumber] = useState(1);
	const [paginationOption, setPaginationOption] = useState({
		...queryVariables,
		data: {
			myCursor: nextCursor,
			orderByKey: null,
			orderDirection: null,
			take: currentPageSize,
			skip: null,
			sort,
		},
	});

	const [paginationResult, setPaginationResult] = useState({
		list,
		prevCursor,
		nextCursor,
	});

	useEffect(() => {
		setPaginationOption({
			...paginationOption,
			data: { ...paginationOption.data, take: currentPageSize },
		});
		gotoFirst({ force: true, take: currentPageSize, token: accessToken });
	}, [currentPageSize]);

	const gotoLast = useCallback(
		async (token: string) => {
			if (isLastPage) return;
			const options = {
				...paginationOption,
				data: { ...paginationOption.data, myCursor: null, take: -currentPageSize, skip: null },
			};
			const { list, prevCursor, nextCursor } = await query(options, token);
			if (list && list.length > 0) {
				let flattenedList = [];
				if (list?.length > 0) {
					flattenedList = list.reduce((acc, curr) => [...acc, ObjectFlatten(curr)], []);
				}
				setPaginationResult({
					list: flattenedList ?? [],
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
				setCurrentPageNumber(Math.abs(Math.ceil(_count / currentPageSize)));
			}
		},
		[isLastPage]
	);

	const gotoFirst = useCallback(
		async ({ force = false, sort = null, take = currentPageSize, token }: goFirstInputProps) => {
			if (isFirstPage) {
				if (!force) return;
			}
			let options = {
				...paginationOption,
				data: { ...paginationOption.data, take, myCursor: null, skip: null },
			};
			if (sort) {
				options = { ...options, data: { ...options.data, sort } };
			}

			console.log("🚀 ~ file: useDataPagination.tsx ~ line 120 ~ FirstToken", token);
			const { list, prevCursor, nextCursor } = await query(options, token);

			if (list && list.length > 0) {
				let flattenedList = [];
				if (list?.length > 0) {
					flattenedList = list.reduce((acc, curr) => [...acc, ObjectFlatten(curr)], []);
				}
				setPaginationResult({
					list: flattenedList ?? [],
					prevCursor,
					nextCursor,
				});
				setPaginationOption({
					...paginationOption,
					data: {
						...paginationOption.data,
						myCursor: nextCursor,
						sort: options.data.sort,
					},
				});
				setIsFirstPage(true);
				setCanGoNext(true);
				setIsLastPage(false);
				setCanPrevious(false);
				setCurrentPageNumber(1);
				if (currentPageSize >= _count) {
					setIsFirstPage(true);
					setIsLastPage(true);
					setCanGoNext(false);
					setCanPrevious(false);
				}
			}
		},
		[isFirstPage]
	);

	const gotoNext = useCallback(
		async (token: string) => {
			if (!canGoNext) return;
			const options = {
				...paginationOption,
				data: { ...paginationOption.data, take: currentPageSize },
			};

			const { list, prevCursor, nextCursor } = await query(options, token);
			if (list && list.length > 0) {
				let flattenedList = [];
				if (list?.length > 0) {
					flattenedList = list.reduce((acc, curr) => [...acc, ObjectFlatten(curr)], []);
				}
				setPaginationResult({
					list: flattenedList ?? [],
					prevCursor,
					nextCursor,
				});
				setPaginationOption({
					...paginationOption,
					data: { ...paginationOption.data, myCursor: nextCursor },
				});
				if (currentPageNumber + 1 === Math.abs(Math.ceil(_count / currentPageSize))) {
					setCanGoNext(false);
					setIsLastPage(true);
				}
				setIsFirstPage(false);
				setCanPrevious(true);
				setCurrentPageNumber(currentPageNumber + 1);
			}
		},
		[canGoNext]
	);

	const gotoPrevious = useCallback(
		async (token: string) => {
			if (!canGoPrevious) return;
			let options = {
				...paginationOption,
				data: {
					...paginationOption.data,
					myCursor: paginationResult.prevCursor,
					take: -currentPageSize,
				},
			};
			let resultList;
			let result = await query(options, token);
			resultList = result.list;
			if (resultList && resultList.length > 0) {
				if (isLastPage && resultList.length < currentPageSize) {
					const newSize = currentPageSize - resultList.length - currentPageSize;
					options = {
						...options,
						data: {
							...options.data,
							myCursor: null,
							take: currentPageSize,
						},
					};
					result = await query(options, token);
					resultList = result.list;
				}
				if (resultList && resultList.length > 0) {
					const { list, prevCursor, nextCursor } = result;
					let flattenedList = [];
					if (list?.length > 0) {
						flattenedList = list.reduce((acc, curr) => [...acc, ObjectFlatten(curr)], []);
					}
					setPaginationResult({
						list: flattenedList ?? [],
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
		},
		[canGoPrevious]
	);

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
								onClick={() => gotoFirst({ token: accessToken })}
							>
								First
							</a>
							<a
								href="#"
								className={`px-4 py-2 text-gray-700 bg-gray-200 rounded-md ${
									canGoPrevious ? "hover:bg-teal-400 hover:text-white" : ""
								}`}
								style={{ transition: "all 0.2s ease" }}
								onClick={() => gotoPrevious(accessToken)}
							>
								Prev
							</a>
							<a
								href="#"
								className={`px-4 py-2 text-gray-700 bg-gray-200 rounded-md ${
									canGoNext ? "hover:bg-teal-400 hover:text-white" : ""
								}`}
								style={{ transition: "all 0.2s ease" }}
								onClick={() => gotoNext(accessToken)}
							>
								Next
							</a>
							<a
								href="#"
								className={`px-4 py-2 text-gray-700 bg-gray-200 rounded-md ${
									!isLastPage ? "hover:bg-teal-400 hover:text-white" : ""
								}`}
								style={{ transition: "all 0.2s ease" }}
								onClick={() => gotoLast(accessToken)}
							>
								Last
							</a>
							<span>
								Page{" "}
								<strong>
									{Math.abs(currentPageNumber)} of{" "}
									{Math.abs(Math.ceil(_count / currentPageSize))}
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
								value={currentPageSize}
								onChange={(e) => {
									setPageSize(Number(e.target.value));
								}}
							>
								{[1, 2, 5, 10, 15].map((currentPageSize) => (
									<option key={currentPageSize} value={currentPageSize}>
										Show {currentPageSize}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
			);
		};
	}, [paginationResult.list, accessToken]);

	return {
		RenderedPagination,
		paginatedData: paginationResult.list,
		gotoFirst,
		currentPageSize,
	};
}

export default useDataPagination;
