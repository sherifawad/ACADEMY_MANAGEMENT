import { ADD_GROUP_MUTATION } from "core/mutations/groupMutations";
import { ACTIVE_GRADES_QUERY } from "core/queries/gradeQueries";
import { createAxiosService } from "core/utils";
import { arEG } from "date-fns/locale";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { TimePicker } from "react-next-dates";
import { useMutation, useQuery } from "react-query";

function AddGroup({ onProceed, onClose }) {
	const mainRef = useRef();
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const { data: session, status } = useSession();
	const [formState, setFormState] = useState({
		name: "",
		startAt: "",
		endAt: "",
		gradeId: "",
	});

	const { data } = useQuery("ActiveGrades", () =>
		createAxiosService(ACTIVE_GRADES_QUERY).then((response) => response.data.data)
	);

	const mutation = useMutation(
		"AddGroup",
		() =>
			createAxiosService(ADD_GROUP_MUTATION, {
				name: formState.name,
				startAt: formState.startAt,
				endAt: formState.endAt,
				gradeId: formState.gradeId,
			}).then((response) => response.data.data),
		{
			onSuccess: () => {
				console.log("Success");
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
			<div>
				<label htmlFor="grade" className="sr-only">
					Grade
				</label>
				<select
					value={formState.gradeId}
					onChange={(e) => {
						console.log("🚀 ~ file: AddGroup.tsx ~ line 65 ~ AddGroup ~ formState", formState);
						setFormState({
							...formState,
							gradeId: e.target.value,
						});
					}}
					id="grade"
					name="grade"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white rounded-r-lg border-l-2 dark:focus:ring-blue-500 dark:focus:border-blue-500"
				>
					<option defaultValue={0}>Choose a grade</option>
					{data &&
						data?.ActiveGrades?.map((grade) => (
							<option key={grade.id} value={grade.id}>
								{grade.name}
							</option>
						))}
				</select>
			</div>

			<div>
				<label
					htmlFor="name"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>
					Group Name
				</label>
				<input
					type="text"
					name="name"
					id="name"
					value={formState.name}
					onChange={(e) => {
						setFormState({
							...formState,
							name: e.target.value,
						});
					}}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					placeholder="1st Group"
					required
				/>
			</div>

			<div className="flex gap-4">
				<TimePicker
					locale={arEG}
					precision={15}
					date={startDate}
					onChange={(d) => {
						setStartDate(d);
						setFormState({
							...formState,
							startAt: d?.toLocaleTimeString(),
						});
					}}
					portalContainer={mainRef.current}
				>
					{({ inputProps }) => (
						<div className="w-full">
							<label
								htmlFor="start"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								Start At
							</label>
							<input
								{...inputProps}
								type="time"
								name="start"
								id="start"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								required
							/>
						</div>
					)}
				</TimePicker>

				<TimePicker
					locale={arEG}
					date={endDate}
					portalContainer={mainRef.current}
					precision={15}
					onChange={(d) => {
						setEndDate(d);
						setFormState({
							...formState,
							endAt: d?.toLocaleTimeString(),
						});
					}}
				>
					{({ inputProps }) => (
						<div className="w-full">
							<label
								htmlFor="end"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								End At
							</label>
							<input
								{...inputProps}
								type="time"
								name="end"
								id="end"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								required
							/>
						</div>
					)}
				</TimePicker>
			</div>

			<button
				onClick={proceedAndClose}
				type="submit"
				className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Add
			</button>
		</form>
	);
}

export default AddGroup;
