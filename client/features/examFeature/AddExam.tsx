import {
	createExamMutation,
	createMultipleExamMutation,
	CREATE_EXAM_MUTATION,
	updateExamMutation,
    updateMultipleExamMutation,
} from "features/examFeature/examMutations";
import { createAxiosService } from "core/utils";
import { format, parse } from "date-fns";
import { arEG } from "date-fns/locale";
import { useEffect, useState } from "react";
import { DatePicker } from "react-next-dates";
import { useMutation } from "react-query";
import { examInitialProperties } from "./examTypes";

function AddExam({ onProceed, onClose, initialExam, profileIds, edit }: examInitialProperties) {
	const { profileId, score, date, note, id } = initialExam || {};

	const [dateCondition, setDateCondition] = useState(null);
	const [scoreCondition, setScoreCondition] = useState(null);
	const [noteCondition, setNoteCondition] = useState("");

	const [examState, setExamState] = useState({
		id,
		score,
		date: date ? new Date(date) : null,
		note,
		error: "",
	});

	useEffect(() => {
		setExamState({
			...examState,
			score: score || null,
			date: date ? new Date(date) : null,
			note: note || "",
		});
	}, [score, date, note]);

	const createMutation = createExamMutation({
		profileId,
		score: examState.score,
		date: examState.date,
		note: examState.note?.length > 0 ? examState.note : null,
	});

	const createMultipleMutation = createMultipleExamMutation({
		profileIds,
		score: examState.score,
		date: examState.date,
		note: examState.note?.length > 0 ? examState.note : null,
	});

	const updateMutation = updateExamMutation({
		updateExamId: examState.id,
		score: examState.score,
		date: examState.date,
		note: examState.note?.length > 0 ? examState.note : null,
	});

	const updateMultipleMutation = updateMultipleExamMutation({
		profileIds,
		dateCondition,
		scoreCondition,
		noteCondition: noteCondition.length > 0 ? noteCondition : null,
		date: examState.date || dateCondition,
		score: examState.score,
		note: examState.note,
	});

	const submitContact = async (e) => {
		e.preventDefault();
		try {
			e.preventDefault();

			if (createMutation.isLoading) return;
			if (updateMutation.isLoading) return;
			if (createMultipleMutation.isLoading) return;
			if (updateMultipleMutation.isLoading) return;
			if (profileIds && profileIds.length > 0) {
				edit
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

	return (
		<form method="dialog" className="space-y-6" action="#">
			<div className="row-span-full">
				<label
					htmlFor="score"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>
					Score
				</label>
				<input
					type="number"
					name="score"
					id="score"
					value={String(examState.score)}
					onChange={(e) =>
						setExamState({
							...examState,
							error: "",
							score: Number(e.target.value),
						})
					}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					placeholder="Score"
					required
				/>
			</div>

			<div className="row-span-full">
				<label
					htmlFor="date"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>
					Date
				</label>
				<input
					type="date"
					name="date"
					id="date"
					value={examState?.date ? format(examState?.date, "yyyy-mm-dd") : ""}
					onChange={({ target: { value } }) =>
						setExamState({
							...examState,
							error: "",
							date: value && value.length > 1 ? parse(value, "yyyy-mm-dd", new Date()) : null,
						})
					}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					placeholder="date"
					required
				/>
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
					value={String(examState.note)}
					onChange={(e) =>
						setExamState({
							...examState,
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
				Add
			</button>
		</form>
	);
}

export default AddExam;
