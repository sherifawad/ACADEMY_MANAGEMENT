import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FaBlackTie } from "react-icons/fa";
import Select, { ActionMeta, MultiValue, StylesConfig } from "react-select";
import AsyncSelect from "react-select/async";
import StateManagedSelect from "react-select/dist/declarations/src/stateManager";

type props = {
	label: string;
	list: { id: string; name: string; family: { familyName: string; id: string } }[];
	selectedValues: any[];
	setSelectedValues: Dispatch<SetStateAction<any>>;
};

const MultiSelect = ({ selectedValues, setSelectedValues, list, label }: props) => {
	console.log("🚀 ~ file: MultiSelection.tsx ~ line 18 ~ MultiSelect ~ list", list);
	const [optionList, setOptionList] = useState([]);
	const onChange = (newValue: MultiValue<any>, actionMeta: ActionMeta<any>) => {
		setSelectedValues(newValue);
	};

	const selectRef = useRef();

	useEffect(() => {
		if (list?.length < 1) return;
		const result = list?.map((item) => {
			return { label: item.name, value: item.id };
		});
		console.log("🚀 ~ file: MultiSelection.tsx ~ line 26 ~ result ~ result", result);
		setOptionList(result);
	}, [list]);

	return (
		<div>
			<label htmlFor="type" className="flex text-sm font-semibold text-gray-800 pb-2">
				{label}
			</label>
			<Select
				ref={selectRef}
				isMulti
				// onChange={onChange}
				// value={selectedValues}
				options={optionList}
			/>
		</div>
	);
};

export default MultiSelect;
