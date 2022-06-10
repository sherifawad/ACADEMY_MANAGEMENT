import { useEffect, useRef } from "react";
import GradeGroupSelect from "./GradeGroupSelect";

function AddModel({ children, isOpened, onClose, title }) {
	const ref: any = useRef(null);

	useEffect(() => {
		if (ref.current?.open) {
			ref.current?.close();
		}
		if (isOpened) {
			ref.current?.showModal();
		} else {
			ref.current?.close();
		}
		console.log("🚀 ~ file: AddModel.tsx ~ line 12 ~ useEffect ~ isOpened", isOpened);
	}, [isOpened]);

	const preventAutoClose = (e: React.MouseEvent) => e.stopPropagation();

	return (
		<dialog
			ref={ref}
			aria-hidden="true"
			className="modal fade grid w-max h-max outline-none overflow-x-hidden overflow-y-auto bg-transparent"
		>
			<div
				className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none"
				onClick={preventAutoClose}
			>
				<div className="relative rounded-lg shadow-md shadow-slate-500 dark:bg-gray-700 modal-content border-none flex flex-col w-full pointer-events-auto  bg-clip-padding outline-none text-current md:min-w-[400px]">
					<button
						onClick={onClose}
						type="button"
						className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
						data-modal-toggle="authentication-modal"
					>
						<svg
							className="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clipRule="evenodd"
							></path>
						</svg>
					</button>
					<div className="py-6 px-6 lg:px-8">
						<h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">{title}</h3>
						{children}
					</div>
				</div>
			</div>
		</dialog>
	);
}

export default AddModel;
