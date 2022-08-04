import { IndeterminateCheckbox } from "components/IndeterminateCheckbox";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Column, Hooks } from "react-table";

export interface inputHooks {
	columId: string;
	headerName: string;
}

export const useCheckboxes = (hooks: Hooks) => {
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
				Cell: ({ row: { getToggleRowSelectedProps } }: any) => {
					return (
						<div>
							<IndeterminateCheckbox {...getToggleRowSelectedProps()} />
						</div>
					);
				},
			},
			...columns,
		]);
	}, [hooks]);
};

export const useEditHooks = (hooks: any, edit: Function) => {
	hooks.visibleColumns.push((columns: Column[]) => [
		...columns,
		{
			id: "Edit",
			Header: "Edit",
			Cell: ({
				row: {
					values,
					original: { id },
				},
			}) => {
				return <button onClick={() => edit({ id, ...values })}>Edit</button>;
			},
		},
	]);
};

export const useInputHooks = (hooks: any, columId: string = "inputId", HeaderName: string = "Input") => {
	return hooks.visibleColumns.push((columns: Column[]) => [
		...columns,
		newInputColumn(columId, HeaderName),
	]);
};

export const newInputColumn = (columId: string, HeaderName: string) => {
	return {
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
	};
};
