import { CREATE_EXAM_MUTATION } from "core/mutations/examMutations";
import { createAxiosService } from "core/utils";
import { format } from "date-fns";
import { arEG } from "date-fns/locale";
import { useEffect, useState } from "react";
import { DatePicker } from "react-next-dates";
import { useMutation } from "react-query";

function AddExam({ onProceed, onClose, profileId, score, date, note }) {
	const [examState, setExamState] = useState({
		score: "",
		date: "",
		note: "",
		error: "",
	});

	useEffect(() => {
		setExamState({
			...examState,
			score: score || "",
			date: date ? date.substring(0, 10) : "",
			note: note || "",
		});
	}, [score, date, note]);

	const mutation = useMutation(
		"AddExam",
		() =>
			createAxiosService(CREATE_EXAM_MUTATION, {
				profileId,
				score: examState.score ? parseFloat(examState.score) : undefined,
				date: new Date(examState.date),
				note: examState.note,
			}).then((response) => response.data.data),
		{
			onSuccess: () => {
				console.log("Exam Created Successfully");
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
					value={examState.score}
					onChange={(e) =>
						setExamState({
							...examState,
							error: "",
							score: e.target.value,
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
					value={examState.date}
					onChange={(e) =>
						setExamState({
							...examState,
							error: "",
							date: e.target.value,
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
					value={examState.note}
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
