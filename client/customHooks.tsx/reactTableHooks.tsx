import { IndeterminateCheckbox } from "components/IndeterminateCheckbox";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Column, Hooks } from "react-table";

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

export const useInputHooks = (hooks: any, columId: string, HeaderName: string) => {
	return hooks.visibleColumns.push((columns: Column[]) => [
		...columns,
		{
			id: columId,
			Header: HeaderName,
			Cell: ({
				value,
				state,
				dispatch,
				row: {
					toggleRowSelected,
					original: { id },
				},
			}: any) => {
				let inputValue = state.stateArr[id] || value;

				return (
					<input
						type="text"
						onChange={(e) => {
							const { value } = e.target;
							if (!id || id.length <= 0 || value === undefined) return;
							//check if value is a number
							if (!Number.isNaN(Number(value))) {
								// check the value is not empty string
								if (value.length > 0) {
									if (toggleRowSelected) toggleRowSelected(true);
									dispatch({
										type: "add",
										payload: { [id]: Number(value) },
										prevState: state,
									});
									return;
								}
							}
							if (toggleRowSelected) toggleRowSelected(false);
							dispatch({ type: "remove", payload: id, prevState: state });
						}}
						value={inputValue}
						placeholder={HeaderName}
						className="w-fit"
					/>
				);
			},
		},
	]);
};
