import { ChangeEvent, ChangeEventHandler, forwardRef, useEffect, useRef } from "react";

interface Props {
	indeterminate?: boolean;
	change?: boolean;
	name: string;
	onChange?: ((e: ChangeEvent) => void) | undefined;
	checked?: boolean;
}
export const IndeterminateCheckbox = forwardRef<HTMLInputElement, Props>(
	({ onChange, checked, indeterminate, ...rest }, ref) => {
		const defaultRef = useRef();
		const resolvedRef = ref || defaultRef;

		useEffect(() => {
			if (typeof resolvedRef === "object" && resolvedRef.current) {
				resolvedRef.current.indeterminate = Boolean(indeterminate);
			}
		}, [resolvedRef, indeterminate]);

		return (
			<>
				<input
					type="checkbox"
					ref={resolvedRef}
					onChange={onChange}
					checked={checked}
					aria-label={`click to ${checked ? "un-" : ""}select row`}
					{...rest}
				/>
			</>
		);
	}
);
