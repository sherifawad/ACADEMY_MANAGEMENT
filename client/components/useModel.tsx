import { useRouter } from "next/router";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import AddModel from "./AddModel";

function useModel() {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [isOpened, setIsOpened] = useState(false);
	const [itemData, setItemData] = useState(null);

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const router = useRouter();

	useEffect(() => {
		if (itemData?.id) {
			setIsOpened(true);
		}
	}, [setItemData, itemData]);

	// Call this function whenever you want to
	// refresh props!
	const onProceed = useCallback(() => {
		router.replace(router.asPath);
		console.log("Proceed clicked");
	}, []);

	const onClose = useCallback(() => {
		setIsOpened(false);
		console.log("close clicked");
	}, []);

	const onOpen = useCallback(() => {
		setItemData({ id: null, name: "" });

		setIsOpened(true);
	}, []);

	const Model = useMemo(() => {
		return ({ children, title }) => {
			return (
				<>
					<Suspense>
						<AddModel isOpened={isOpened} onClose={onClose} title={title}>
							{children}
						</AddModel>
					</Suspense>

					<div className="grid grid-row-[auto_1fr] gap-8">
						<button
							onClick={onOpen}
							className="justify-self-end block w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							type="button"
						>
							{title}
						</button>
					</div>
				</>
			);
		};
	}, [isOpened, onClose]);

	const modelProps = useMemo(() => {
		return {
			onProceed,
			onClose,
		};
	}, [onProceed, onClose]);

	return {
		itemData,
		setItemData,
		Model,
		modelProps,
	};
}

export default useModel;
