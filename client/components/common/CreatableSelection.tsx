import { Dispatch, KeyboardEventHandler, SetStateAction, useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";

const components = {
	DropdownIndicator: null,
};

export interface CreatableSelectionOption {
	readonly label: string;
	readonly value: string;
}

export const createOption = (label: string) => ({
	label,
	value: label,
});
type Props = {
	placeholder?: string;
	value: CreatableSelectionOption[];
	onChange: (newValue: CreatableSelectionOption[]) => void;
	setValue: Dispatch<SetStateAction<CreatableSelectionOption[]>>;
};

// .react-select__control{
// 	@apply children:bg-transparent !bg-gray-50 border !border-gray-300 text-gray-900 !rounded-lg focus:!ring-blue-500 focus:!border-blue-500 block w-full p-2.5 dark:!bg-gray-600 dark:!border-gray-500 dark:!placeholder-gray-400 dark:!text-white children:p-0;

// }
// .react-select__placeholder {
// 	@apply  !text-gray-400 bg-transparent !text-sm dark:!text-gray-400;

// }

const CreatableSelection = ({ value, onChange, setValue, placeholder }: Props) => {
	const [inputValue, setInputValue] = useState("");

	const handleKeyDown: KeyboardEventHandler = (event) => {
		if (!inputValue) return;
		if (inputValue.length !== 11) return;
		switch (event.key) {
			case "Enter":
			case "Tab":
			case ".":
			case ",":
				setValue((prev) =>
					prev.some((x) => x.value === inputValue) ? prev : [...prev, createOption(inputValue)]
				);
				setInputValue("");
				event.preventDefault();
		}
	};

	const inputChange = (newValue: string) => {
		if (isNaN(Number(newValue))) return;
		setInputValue(newValue);
	};

	return (
		<CreatableSelect
			components={components}
			inputValue={inputValue}
			isClearable
			isMulti
			classNamePrefix="react-select"
			menuIsOpen={false}
			onChange={onChange}
			onInputChange={inputChange}
			onKeyDown={handleKeyDown}
			placeholder={placeholder}
			value={value}
		/>
	);
};

export default CreatableSelection;
