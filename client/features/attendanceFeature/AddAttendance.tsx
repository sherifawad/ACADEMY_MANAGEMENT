import { arEG } from "date-fns/locale";
import { useCallback, useEffect, useRef, useState } from "react";
import { DateTimePicker } from "react-next-dates";
import {
	createAttendanceMutation,
	createMultipleAttendanceMutation,
	updateAttendanceMutation,
	updateMultipleAttendanceMutation,
} from "./attendanceMutations";
import { initialProperties } from "./attendancesTypes";

function AddAttendance({ onProceed, onClose, initialAttendance, profileIds, edit }: initialProperties) {
	console.log("🚀 ~ file: AddAttendance.tsx ~ line 13 ~ AddAttendance ~ edit", edit);
	const mainRef = useRef();

	const { profileId, startAt, endAt, note, id } = initialAttendance;

	const [startAtCondition, setStartAtCondition] = useState(null);
	const [endAtCondition, setEndAtCondition] = useState(null);
	const [noteCondition, setNoteCondition] = useState(null);

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

	const createMutation = useCallback(
		() =>
			createAttendanceMutation({
				profileId,
				startAt: attendanceState.startAt,
				endAt: endAt || attendanceState.endAt,
				note: note || attendanceState.note,
			}),
		[profileId]
	);

	const createMultipleMutation = useCallback(
		() =>
			createMultipleAttendanceMutation({
				profileIds,
				startAt: attendanceState.startAt,
				endAt: endAt || attendanceState.endAt,
				note: note || attendanceState.note,
			}),
		[edit, profileIds]
	);

	const updateMutation = useCallback(
		() =>
			updateAttendanceMutation({
				startAtCondition,
				endAtCondition,
				noteCondition,
				updateAttendanceId: attendanceState.id,
				startAt: attendanceState.startAt,
				endAt: attendanceState.endAt,
				note: attendanceState.note,
			}),
		[id]
	);

	const updateMultipleMutation = useCallback(
		() =>
			updateMultipleAttendanceMutation({
				updateAttendanceId: attendanceState.id,
				startAt: attendanceState.startAt,
				endAt: attendanceState.endAt,
				note: attendanceState.note,
			}),
		[edit, profileIds]
	);

	const submitContact = async (e) => {
		e.preventDefault();
		if (createMutation().isLoading) return;
		if (updateMutation().isLoading) return;
		if (createMultipleMutation().isLoading) return;
		if (updateMultipleMutation().isLoading) return;
		if (profileIds && profileIds.length > 0) {
			edit
				? await updateMultipleMutation().mutateAsync()
				: await createMultipleMutation().mutateAsync();
			return;
		}
		id ? await updateMutation().mutateAsync() : await createMutation().mutateAsync();
	};

	const proceedAndClose = async (e) => {
		await submitContact(e);
		onProceed();
		onClose();
	};

	return (
		<form method="dialog" className="space-y-6" action="#" ref={mainRef}>
			<div className="flex flex-col gap-4">
				{edit && (
					<div className="flex flex-col gap-4">
						<DateTimePicker
							locale={arEG}
							datePlaceholder="Date"
							timePlaceholder="Time"
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
							datePlaceholder="Date"
							timePlaceholder="Time"
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
								placeholder="Note"
							/>
						</div>
					</div>
				)}

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
								{edit ? "new Start At" : "Start At"}
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
								{edit ? "new End At" : "End At"}
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
					{edit ? "new Note" : "Note"}
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
				{edit ? "Edit" : id ? "Edit" : "Add"}
			</button>
		</form>
	);
}

export default AddAttendance;