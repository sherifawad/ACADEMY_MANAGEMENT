import { ChangeEvent, ReactNode } from "react";

type props = {
	id?: string;
	optionsList: ReactNode[];
	value: any;
	title: string;
	onChange: (e: ChangeEvent<HTMLSelectElement>, index?: number) => void;
};

const SingleSelection = ({ id, value, title, onChange, optionsList }: props) => {
	return (
		<div className="w-full flex-grow">
			<label htmlFor={id} className="flex text-sm font-semibold text-gray-800 pb-2">
				{title}
			</label>
			<div className="relative w-full lg:max-w-sm">
				<select
					value={value}
					id={id}
					onChange={onChange}
					className="w-full p-2.5 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
				>
					{optionsList}
				</select>
			</div>
		</div>
	);
};

export default SingleSelection;
