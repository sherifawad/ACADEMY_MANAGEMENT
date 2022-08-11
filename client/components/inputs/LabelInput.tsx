function LabelInput({
	name,
	label,
	type = "text",
	placeholder = "",
	labelClasses = null,
	inputClasses = null,
	value,
	onChange,
}) {
	return (
		<div className="flex flex-col gap-2">
			<label
				className={`${
					labelClasses ? labelClasses : "block text-sm font-medium text-gray-900 dark:text-gray-300"
				}`}
				htmlFor={name}
			>
				{label}
			</label>
			<input
				className={`${
					inputClasses
						? inputClasses
						: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
				}`}
				type={type}
				name={name}
				placeholder={placeholder}
				value={value || ""}
				onChange={onChange}
			/>
		</div>
	);
}

export default LabelInput;
