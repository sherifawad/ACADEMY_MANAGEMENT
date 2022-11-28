import AddModel from "@/components/common/AddModel";
import { ReactNode, Suspense, useCallback, useEffect, useMemo, useState } from "react";

function useModel(hasEditButton = false) {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [isOpened, setIsOpened] = useState(false);
	const [isClosed, setIsClosed] = useState(true);
	const [editButtonClicked, setEditButtonClicked] = useState(false);
	const [itemData, setItemData] = useState({});

	useEffect(() => {
		if ((itemData as any)?.id) {
			setIsOpened(true);
			setIsClosed(false);
		}
	}, [setItemData, itemData]);

	const onClose = useCallback(() => {
		setIsOpened(false);
		setIsClosed(true);
		console.log("close clicked");
	}, []);

	const onAdd = useCallback(() => {
		setItemData({ id: null, name: "" });
		setIsOpened(true);
		setIsClosed(false);
		setEditButtonClicked(false);
	}, []);

	const onEdit = useCallback(() => {
		setItemData({ id: null, name: "" });
		setIsClosed(false);
		setIsOpened(true);
		setEditButtonClicked(true);
	}, [hasEditButton]);

	const Model = useMemo(() => {
		return ({
			children,
			title = "",
			onEditTitle = "",
			hasAddButton = true,
		}: {
			children: ReactNode;
			title?: string;
			onEditTitle?: string;
			hasAddButton?: boolean;
		}) => {
			return (
				<>
					<Suspense fallback={null}>
						<AddModel isOpened={isOpened} onClose={onClose} title={title}>
							{children}
						</AddModel>
					</Suspense>

					<div className="grid grid-cols-[auto_1fr] py-4">
						{hasAddButton && (
							<button
								onClick={onAdd}
								className="justify-self-end block w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								type="button"
							>
								{title}
							</button>
						)}
						{hasEditButton && (
							<button
								onClick={onEdit}
								className="justify-self-end block w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								type="button"
							>
								{onEditTitle}
							</button>
						)}
					</div>
				</>
			);
		};
	}, [isOpened, onClose]);

	const modelProps = useMemo(() => {
		return {
			onClose,
			onAdd,
			editButtonClicked,
		};
	}, [onClose, editButtonClicked]);

	return {
		itemData,
		setItemData,
		setIsOpened,
		isClosed,
		Model,
		modelProps,
	};
}

export default useModel;
