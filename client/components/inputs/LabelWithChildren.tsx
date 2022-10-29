import { ReactNode } from "react";

type props = {
	children: ReactNode;
	label: string;
	id?: string;
};
function LabelWithChildren({ label, id, children }: props) {
	return (
		<div className="flex flex-col gap-2">
			<label className="block text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor={id}>
				{label}
			</label>
			{children}
		</div>
	);
}

export default LabelWithChildren;
