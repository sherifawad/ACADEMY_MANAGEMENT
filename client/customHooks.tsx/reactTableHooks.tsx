import { IndeterminateCheckbox } from "components/IndeterminateCheckbox";
import { ChangeEvent, Dispatch, SetStateAction, useMemo } from "react";
import { Column, Hooks } from "react-table";

export interface inputHooks {
	columId: string;
	headerName: string;
}

export const useCheckboxes = (hooks: Hooks, checkedItems: any[]) => {
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
					},
				}: any) => {
					const { onChange, checked, ...restProps } = getToggleRowSelectedProps();
					// const isChecked = checkedItems?.indexOf(id) >= 0 || checked;

					return (
						<div>
							<IndeterminateCheckbox value={id} {...getToggleRowSelectedProps()} />
						</div>
					);
				},
			},
			...columns,
		]);
	}, [hooks, checkedItems]);
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
