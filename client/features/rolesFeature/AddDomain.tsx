import LabelInput from "components/inputs/LabelInput";
import useAuth from "customHooks/useAuth";
import { useEffect, useState } from "react";
import { createRoleMutation, updateRoleMutation } from "./roleMutations";
import { DomainInitials, Role, RoleInitials } from "./roleTypes";

function AddDomain({ onProceed = () => {}, onClose, domains, setCheckedList }: DomainInitials) {
	const [checkedState, setCheckedState] = useState(new Array(domains.length).fill(false));

	const [checkedDomains, setCheckedDomains] = useState([]);
	const handleCheckboxChange = (domainIndex, domain) => {
		const updatedCheckedState = checkedState.map((item, index) => (index === domainIndex ? !item : item));

		setCheckedState(updatedCheckedState);

		if (updatedCheckedState[domainIndex]) {
			setCheckedDomains((prev) => [...prev, domain]);
		} else {
			setCheckedDomains((prev) => prev.filter((x) => x.id !== domain.id));
		}
		// const checked = e.target.checked;
		// if (checked) {
		// 	setCheckedDomains((prev) => [...prev, domain]);
		// } else {
		// 	setCheckedDomains((prev) => prev.filter((x) => x.id !== domain.id));
		// }
		// const isChecked = checkedDomains.some((x) => x.id === domain.id);
		// if (isChecked) {
		// 	setCheckedDomains((prev) => prev.filter((x) => x.id !== domain.id));
		// } else {
		// 	setCheckedDomains((prev) => [...prev, domain]);
		// }
	};

	const submitContact = async (e) => {
		e.preventDefault();
		// setCheckedList(checkedDomains);
	};

	const proceedAndClose = async (e) => {
		await submitContact(e);
		onProceed(checkedDomains);
		onClose();
	};

	return (
		<form onSubmit={proceedAndClose} method="dialog" className="space-y-6" action="#">
			{domains?.map((domain, index) => (
				<table key={index} className="min-w-max w-full table-auto">
					<tbody className="text-white text-sm font-light">
						<tr className="border-b border-gray-200 ">
							<td className="py-3 px-8 text-left whitespace-nowrap">
								<div className="flex items-center justify-between">
									<input
										checked={checkedState[index]}
										type="checkbox"
										onChange={(e) => handleCheckboxChange(index, domain)}
									/>
									<span className="font-medium mie-2">{domain.name}</span>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			))}
			<button
				type="submit"
				className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Submit
			</button>
		</form>
	);
}

export default AddDomain;
