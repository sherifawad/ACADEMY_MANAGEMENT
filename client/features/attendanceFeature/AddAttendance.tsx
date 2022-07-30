import useToggle from "customHooks.tsx/useToggle";
import { arEG } from "date-fns/locale";
import { useCallback, useEffect, useRef, useState } from "react";
import { DateTimePicker } from "react-next-dates";
import {
	createAttendanceMutation,
	createMultipleAttendanceMutation,
	updateAttendanceMutation,
	updateMultipleAttendanceMutation,
} from "./attendanceMutations";
import { attendanceInitialProperties } from "./attendancesTypes";

function AddAttendance({
	onProceed,
	onClose,
	initialAttendance,
	profileIds,
	multiEnabled = false,
}: attendanceInitialProperties) {
	const mainRef = useRef();
	const [value, toggleValue] = useToggle(false);
	const { profileId, startAt, endAt, note, id } = initialAttendance;

	const [hasConditions, setHasConditions] = useState(false);
	const [startAtCondition, setStartAtCondition] = useState(null);
	const [endAtCondition, setEndAtCondition] = useState(null);
	const [noteCondition, setNoteCondition] = useState("");

	const [attendanceState, setAttendanceState] = useState({
		id,
		startAt,
		endAt,
		note,
		error: "",
	});

	useEffect(() => {
		setAttendanceState({
			...attendanceState,
			startAt: startAt || null,
			endAt: endAt || null,
			note: note || "",
		});
	}, [startAt, endAt, note]);

	const createMutation = createAttendanceMutation({
		profileId,
		startAt: attendanceState.startAt,
		endAt: attendanceState.endAt,
		note: attendanceState.note?.length > 0 ? attendanceState.note : null,
	});

	const createMultipleMutation = createMultipleAttendanceMutation({
		profileIds,
		startAt: attendanceState.startAt,
		endAt: attendanceState.endAt,
		note: attendanceState.note?.length > 0 ? attendanceState.note : null,
	});

	const updateMutation = updateAttendanceMutation({
		updateAttendanceId: attendanceState.id,
		startAt: attendanceState.startAt,
		endAt: attendanceState.endAt,
		note: attendanceState.note,
	});

	const updateMultipleMutation = updateMultipleAttendanceMutation({
		profileIds,
		startAtCondition,
		endAtCondition,
		noteCondition: noteCondition.length > 0 ? noteCondition : null,
		startAt: attendanceState.startAt || startAtCondition,
		endAt: attendanceState.endAt,
		note: attendanceState.note,
	});

	useEffect(() => {
		setHasConditions(multiEnabled && (startAtCondition || endAtCondition || noteCondition));
	}, [multiEnabled, startAtCondition, endAtCondition, noteCondition]);

	const submitContact = async (e) => {
		try {
			e.preventDefault();

			if (createMutation.isLoading) return;
			if (updateMutation.isLoading) return;
			if (createMultipleMutation.isLoading) return;
			if (updateMultipleMutation.isLoading) return;
			if (profileIds && profileIds.length > 0) {
				hasConditions
					? await updateMultipleMutation.mutateAsync()
					: await createMultipleMutation.mutateAsync();
				return;
			}
			id ? await updateMutation.mutateAsync() : await createMutation.mutateAsync();
		} catch (error) {}
	};

	const proceedAndClose = async (e) => {
		await submitContact(e);
		onProceed();
		onClose();
	};

	const handleExpandCollapseClick = () => {
		toggleValue(!value);
	};

	return (
		<form method="dialog" className="space-y-6" action="#" ref={mainRef}>
			{multiEnabled && (
				<div className="accordion-item">
					<h2 id="accordion-flush-heading-3">
						<button
							type="button"
							className="flex items-center justify-between w-full py-5 font-medium text-left text-white  dark:text-gray-400"
							data-accordion-target="#accordion-flush-body-3"
							aria-expanded="false"
							aria-controls="accordion-flush-body-3"
							onClick={handleExpandCollapseClick}
						>
							<span>Edit Multiple Student</span>
							<svg
								style={{ transform: value ? "rotate(180deg)" : "" }}
								data-accordion-icon
								className="w-6 h-6 shrink-0 transform rotate-180"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clipRule="evenodd"
								></path>
							</svg>
						</button>
					</h2>
					<div
						id="accordion-flush-body-3"
						className={`${value ? "" : "hidden"}`}
						aria-labelledby="accordion-flush-heading-3"
					>
						<div className="py-5 font-light">
							<div className="flex flex-col gap-4">
								<DateTimePicker
									locale={arEG}
									datePlaceholder="Old Start Date"
									timePlaceholder="Old Start Time"
									timePrecision={15}
									timeFormat="hh:mm a"
									date={startAtCondition}
									onChange={setStartAtCondition}
								>
									{({ dateInputProps, timeInputProps }) => (
										<div className="w-full">
											<label
												htmlFor="start"
												className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
											>
												change attendance where start is:
											</label>
											<div className="flex gap-4">
												<input
													{...dateInputProps}
													name="startDate"
													id="startDate"
													className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
													required
												/>
												<input
													{...timeInputProps}
													name="startTime"
													id="startTime"
													className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
													required
												/>
											</div>
										</div>
									)}
								</DateTimePicker>

								<DateTimePicker
									locale={arEG}
									datePlaceholder="Old End Date"
									timePlaceholder="Old End Time"
									timePrecision={15}
									timeFormat="hh:mm a"
									date={endAtCondition}
									onChange={setEndAtCondition}
								>
									{({ dateInputProps, timeInputProps }) => (
										<div className="w-full">
											<label
												htmlFor="start"
												className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
											>
												change attendance where end is:
											</label>
											<div className="flex gap-4">
												<input
													{...dateInputProps}
													name="startDate"
													id="startDate"
													className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
													required
												/>
												<input
													{...timeInputProps}
													name="startTime"
													id="startTime"
													className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
													required
												/>
											</div>
										</div>
									)}
								</DateTimePicker>

								<div className="row-span-full">
									<label
										htmlFor="note"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
									>
										change attendance where Note contains:
									</label>
									<input
										type="text"
										name="note"
										id="note"
										value={noteCondition}
										onChange={(e) => setNoteCondition(e.target.value)}
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
										placeholder="Old Note"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			<div className="row-span-full">
				<DateTimePicker
					locale={arEG}
					datePlaceholder="Date"
					timePlaceholder="Time"
					timePrecision={15}
					timeFormat="hh:mm a"
					date={attendanceState.startAt ? new Date(attendanceState.startAt) : null}
					onChange={(d) => {
						setAttendanceState({
							...attendanceState,
							startAt: d,
						});
					}}
				>
					{({ dateInputProps, timeInputProps }) => (
						<div className="w-full">
							<label
								htmlFor="start"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								{value ? "new Start At" : "Start At"}
							</label>
							<div className="flex gap-4">
								<input
									{...dateInputProps}
									name="startDate"
									id="startDate"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
									required
								/>
								<input
									{...timeInputProps}
									name="startTime"
									id="startTime"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
									required
								/>
							</div>
						</div>
					)}
				</DateTimePicker>
			</div>

			<div className="row-span-full">
				<DateTimePicker
					locale={arEG}
					datePlaceholder="Date"
					timePlaceholder="Time"
					timeFormat="hh:mm a"
					date={attendanceState.endAt ? new Date(attendanceState.endAt) : null}
					timePrecision={15}
					onChange={(d) => {
						setAttendanceState({
							...attendanceState,
							endAt: d,
						});
					}}
				>
					{({ dateInputProps, timeInputProps }) => (
						<div className="w-full">
							<label
								htmlFor="end"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								{value ? "new End At" : "End At"}
							</label>
							<div className="flex gap-4">
								<input
									{...dateInputProps}
									name="endDate"
									id="endDate"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								/>
								<input
									{...timeInputProps}
									name="endTime"
									id="endTime"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								/>
							</div>
						</div>
					)}
				</DateTimePicker>
			</div>
			<div className="row-span-full">
				<label
					htmlFor="note"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>
					{value ? "new Note" : "Note"}
				</label>
				<textarea
					rows={4}
					cols={5}
					name="note"
					id="note"
					value={String(attendanceState.note)}
					onChange={(e) =>
						setAttendanceState({
							...attendanceState,
							error: "",
							note: e.target.value,
						})
					}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					placeholder="Note"
				/>
			</div>

			<button
				onClick={proceedAndClose}
				type="submit"
				className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				{multiEnabled ? (hasConditions ? "Edit" : "Add") : id ? "Edit" : "Add"}
			</button>
		</form>
	);
}

export default AddAttendance;
