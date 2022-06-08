import { useEffect, useRef } from "react";
import GradeGroupSelect from "./GradeGroupSelect";

function AddStudentModel({ isOpened, onProceed, onClose }) {
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
	}, [isOpened]);

	const preventAutoClose = (e: React.MouseEvent) => e.stopPropagation();

	const proceedAndClose = () => {
		onProceed();
		onClose();
	};

	return (
		<dialog
			ref={ref}
			onCancel={onClose}
			onClick={onClose}
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
						<h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
							Sign in to our platform
						</h3>
						<form method="dialog" className="space-y-6" action="#">
							<div>
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
								>
									Your email
								</label>
								<input
									type="email"
									name="email"
									id="email"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
									placeholder="name@company.com"
									required
								/>
							</div>
							<div>
								<label
									htmlFor="password"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
								>
									Your password
								</label>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
									required
								/>
							</div>
							<div className="flex justify-between">
								<div className="flex items-start">
									<div className="flex items-center h-5">
										<input
											id="remember"
											type="checkbox"
											value=""
											className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
											required
										/>
									</div>
									<label
										htmlFor="remember"
										className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
									>
										Remember me
									</label>
								</div>
								<a
									href="#"
									className="text-sm text-blue-700 hover:underline dark:text-blue-500"
								>
									Lost Password?
								</a>
							</div>
							<GradeGroupSelect />
							<button
								onClick={proceedAndClose}
								type="submit"
								className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								Login to your account
							</button>
							<div className="text-sm font-medium text-gray-500 dark:text-gray-300">
								Not registered?{" "}
								<a href="#" className="text-blue-700 hover:underline dark:text-blue-500">
									Create account
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</dialog>
	);
}

export default AddStudentModel;
