import { createAxiosService } from "core/utils";
import useAuth from "customHooks/useAuth";
import { arEG } from "date-fns/locale";
import { ACTIVE_GRADES_QUERY, getActiveGradesList } from "features/gradeFeature/gradeQueries";
import {
	ADD_GROUP_MUTATION,
	createGroupMutation,
	updateGroupMutation,
	UPDATE_GROUP_MUTATION,
} from "features/groupFeature/groupMutations";
import { useCallback, useEffect, useRef, useState } from "react";
import { TimePicker } from "react-next-dates";
import { useMutation, useQuery } from "react-query";
import { Group } from "../../components/GroupsListItem";

export interface GroupInitials extends Group {
	onProceed: Function;
	onClose: Function;
}
function AddGroup({ onProceed, onClose, id, startAt, endAt, name, isActive, grade }: GroupInitials) {
	const { accessToken } = useAuth();

	const mainRef = useRef();

	const [activeGrades, setActiveGrades] = useState([]);

	const [formState, setFormState] = useState({
		id,
		startAt,
		endAt,
		name,
		isActive,
		gradeId: grade?.id || "",
	});

	const fetchGrades = useCallback(async () => {
		const { grades } = await getActiveGradesList(accessToken);
		setActiveGrades(grades);
	}, []);

	useEffect(() => {
		fetchGrades();
	}, []);

	useEffect(() => {
		setFormState({ id, startAt, endAt, name, isActive, gradeId: grade?.id || "" });
	}, [id, startAt, endAt, name, isActive, grade]);

	const { data } = useQuery("ActiveGrades", () =>
		createAxiosService({ query: ACTIVE_GRADES_QUERY, token: accessToken }).then(
			(response) => response.data.data
		)
	);

	const createMutation = createGroupMutation(
		{
			name: formState.name,
			startAt: formState.startAt,
			endAt: formState.endAt,
			gradeId: formState.gradeId,
			isActive: formState.isActive,
		},
		accessToken
	);
	const updateMutation = updateGroupMutation(
		{
			updateGroupId: formState.id,
			name: formState.name,
			startAt: formState.startAt,
			endAt: formState.endAt,
			gradeId: formState.gradeId,
			isActive: formState.isActive,
		},
		accessToken
	);

	const submitContact = async (e) => {
		e.preventDefault();

		if (createMutation.isLoading) return;
		if (updateMutation.isLoading) return;
		id ? await updateMutation.mutateAsync() : await createMutation.mutateAsync();
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
					value={formState.gradeId as string}
					onChange={(e) => {
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
					{activeGrades?.map((grade) => (
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

			<div className="flex">
				<TimePicker
					locale={arEG}
					precision={15}
					date={formState.startAt ? new Date(formState.startAt) : null}
					onChange={(d) => {
						setFormState({
							...formState,
							startAt: d,
						});
					}}
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
					date={formState.endAt ? new Date(formState.endAt as Date) : null}
					precision={15}
					onChange={(d) => {
						setFormState({
							...formState,
							endAt: d,
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

			<div className="flex justify-start gap-2 items-center">
				<input
					type="checkbox"
					id="topping"
					name="topping"
					value="isActive"
					checked={formState.isActive}
					onChange={() =>
						setFormState({
							...formState,
							isActive: !formState.isActive,
						})
					}
				/>
				<p className="block text-sm font-medium text-gray-900 dark:text-gray-300">Active</p>
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

export default AddGroup;
