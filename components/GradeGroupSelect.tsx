import { useState } from "react";

function GradeGroupSelect() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<div className="flex">
			<div className="flex justify-center">
				<div>
					<div className="dropdown relative">
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600 dark:text-white dark:border-gray-500"
							type="button"
							id="dropdownMenuButton1"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							Dropdown
							<svg
								aria-hidden="true"
								focusable="false"
								data-prefix="fas"
								data-icon="caret-down"
								className="w-2 ml-2"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 320 512"
							>
								<path
									fill="currentColor"
									d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
								></path>
							</svg>
						</button>
						<ul
							className={`dropdown-menu min-w-max absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 ${
								isMenuOpen ? "" : "hidden"
							} m-0 bg-clip-padding border-none shadow dark:bg-gray-700`}
							aria-labelledby="dropdownMenuButton1"
						>
							<li>
								<a
									className="dropdown-item py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
									href="#"
								>
									Action
								</a>
							</li>
							<li>
								<a
									className="dropdown-item py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
									href="#"
								>
									Another action
								</a>
							</li>
							<li>
								<a
									className="dropdown-item py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
									href="#"
								>
									Something else here
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<label htmlFor="states" className="sr-only">
				Choose a state
			</label>
			<select
				id="states"
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 dark:border-l-gray-700 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			>
				<option selected>Choose a state</option>
				<option value="CA">California</option>
				<option value="TX">Texas</option>
				<option value="WH">Washinghton</option>
				<option value="FL">Florida</option>
				<option value="VG">Virginia</option>
				<option value="GE">Georgia</option>
				<option value="MI">Michigan</option>
			</select>
		</div>
	);
}

export default GradeGroupSelect;
