import { IndeterminateCheckbox } from "components/IndeterminateCheckbox";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Column, HeaderGroup, Hooks, Row } from "react-table";

export interface inputHooks {
	columId: string;
	headerName: string;
}

export const useCheckboxes = (hooks: Hooks, setCheckedItems: Dispatch<SetStateAction<string[]>>) => {
	return useMemo(() => {
		return hooks.visibleColumns.push((columns: Column[]) => [
			{
				id: "selection",
				width: "50px",
				className: "checkbox",
				Header: ({ getToggleAllRowsSelectedProps }: any) => {
					return (
						<div>
							<IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
						</div>
					);
				},
				Cell: ({
					row: {
						getToggleRowSelectedProps,
						original: { id },
						toggleRowSelected,
						isSelected,
					},
				}: any) => {
					const { onChange, ...restProps } = getToggleRowSelectedProps();

					return (
						<div>
							<IndeterminateCheckbox
								value={id}
								onChange={(e) => {
									const { value, checked } = (e as ChangeEvent<HTMLInputElement>).target;

									if (checked) {
										setCheckedItems((prevState) => {
											if (prevState.indexOf(value) == -1) return [...prevState, value];
											else {
												return prevState;
											}
										});
									} else {
										setCheckedItems((prevState) => prevState.filter((x) => x !== value));
									}
									toggleRowSelected(!isSelected);
								}}
								{...restProps}
							/>
						</div>
					);
				},
			},
			...columns,
		]);
	}, [hooks, setCheckedItems]);
};

export const useEditHooks = (hooks: any, edit: Function) => {
	hooks.visibleColumns.push((columns: Column[]) => [
		...columns,
		{
			id: "Edit",
			Header: "Edit",
			Cell: ({ row }) => {
				return <button onClick={() => edit(row)}>Edit</button>;
			},
		},
	]);
};

export const useInputHooks = (
	hooks: any,
	columId: string,
	HeaderName: string,
	setInputData: Dispatch<SetStateAction<{ [x: string]: number }>>
) => {
	const inputChange = (e: ChangeEvent<HTMLInputElement>, id: string) => {
		const { value } = e.target;
		if (!id || id.length <= 0 || value === undefined) return;
		setInputData((prevState) => {
			// value is empty string remove from list
			if (value.length <= 0) {
				const { [id]: _, ...newData } = prevState;
				return { ...newData };
			}
			// if value is number add
			if (!Number.isNaN(Number(value))) {
				return { ...prevState, [id]: Number(value) };
			}
			// if value is not number skip
			return prevState;
		});
	};
	return hooks.visibleColumns.push((columns: Column[]) => [
		...columns,
		{
			id: columId,
			Header: HeaderName,
			Cell: ({
				cell: { value },
				row: {
					original: { id },
				},
			}: any) => {
				return (
					<input
						type="text"
						onChange={(e) => inputChange(e, id)}
						placeholder={HeaderName}
						className="w-fit"
					/>
				);
			},
		},
	]);
};

type EditableCellProps = {
	value: string;
	row: Row;
	column: HeaderGroup;
	updateMyData: (index: number, id: number, value: string) => void;
};

const EditableCell = ({
	value: initialValue,
	row: { index },
	column: { id },
	updateMyData,
}: EditableCellProps) => {
	const [value, setValue] = useState(initialValue);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const onBlur = () => {
		updateMyData(index, +id, value);
	};

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	return <input value={value} onChange={onChange} onBlur={onBlur} />;
};

export const defaultColumn = {
	Cell: EditableCell,
};
