import { forwardRef, useEffect, useRef } from "react";

interface Props {
	indeterminate?: boolean;
	name: string;
}
export const IndeterminateCheckbox = forwardRef<HTMLInputElement, Props>(
	({ indeterminate, ...rest }, ref) => {
		const defaultRef = useRef();
		const resolvedRef = ref || defaultRef;

		useEffect(() => {
			if (typeof resolvedRef === "object" && resolvedRef.current) {
				resolvedRef.current.indeterminate = Boolean(indeterminate);
			}
		}, [resolvedRef, indeterminate]);

		return (
			<>
				<input type="checkbox" ref={resolvedRef} {...rest} />
			</>
		);
	}
);
