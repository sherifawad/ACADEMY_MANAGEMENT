import { KeyboardEventHandler, useState } from "react";
import CreatableSelect from "react-select/creatable";

const components = {
	DropdownIndicator: null,
};

interface Option {
	readonly label: string;
	readonly value: string;
}

const createOption = (label: string) => ({
	label,
	value: label,
});
type Props = {};

const CreatableSelection = () => {
	const [inputValue, setInputValue] = useState("");
	const [value, setValue] = useState<readonly Option[]>([]);

	const handleKeyDown: KeyboardEventHandler = (event) => {
		console.log("🚀 ~ file: CreatableSelection.tsx ~ line 24 ~ CreatableSelection ~ event", event.key);
		if (!inputValue) return;
		if (inputValue.length !== 11) return;
		switch (event.key) {
			case "Enter":
			case "Tab":
			case ".":
			case ",":
				setValue((prev) => [...prev, createOption(inputValue)]);
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
			menuIsOpen={false}
			onChange={(newValue) => setValue(newValue)}
			onInputChange={inputChange}
			onKeyDown={handleKeyDown}
			placeholder="Add parentsPhone and press enter..."
			value={value}
		/>
	);
};

export default CreatableSelection;
