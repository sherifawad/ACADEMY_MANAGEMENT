import { CREATE_ATTENDANCE_MUTATION } from "core/mutations/attendanceMutations";
import { CREATE_EXAM_MUTATION } from "core/mutations/examMutations";
import { createAxiosService } from "core/utils";
import { format } from "date-fns";
import { arEG } from "date-fns/locale";
import { useEffect, useRef, useState } from "react";
import { DatePicker, DateTimePicker, TimePicker } from "react-next-dates";
import { useMutation } from "react-query";

export interface attendance {
	id: string | null;
	startAt: Date | null;
	endAt?: Date | null;
	note?: String | null;
	profileId: String;
}

export interface initialProperties {
	onProceed: Function;
	onClose: Function;
	initialAttendance: attendance;
}

export interface AttendanceState extends attendance {
	error: String;
}

function AddAttendance({ onProceed, onClose, initialAttendance }: initialProperties) {
	const mainRef = useRef();

	const { profileId, startAt, endAt, note, id } = initialAttendance;

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

	const mutation = useMutation(
		"AddAttendance",
		() =>
			createAxiosService(CREATE_ATTENDANCE_MUTATION, {
				profileId,
				startAt: attendanceState.startAt,
				endAt: endAt || attendanceState.endAt,
				note: note || attendanceState.note,
			}).then((response) => response.data.data),
		{
			onSuccess: () => {
				console.log("Attenda Created Successfully");
			},
		}
	);

	const submitContact = async (e) => {
		e.preventDefault();
		if (mutation.isLoading) return;
		await mutation.mutateAsync();
	};

	const proceedAndClose = async (e) => {
		await submitContact(e);
		onProceed();
		onClose();
	};

	return (
		<form method="dialog" className="space-y-6" action="#" ref={mainRef}>
			<div className="flex flex-col gap-4">
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
					portalContainer={mainRef.current}
				>
					{({ dateInputProps, timeInputProps }) => (
						<div className="w-full">
							<label
								htmlFor="start"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								Start At
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
					portalContainer={mainRef.current}
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
								End At
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
					Note
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
				{id ? "Edit" : "Add"}
			</button>
		</form>
	);
}

export default AddAttendance;
