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
import useToggle from "customHooks/useToggle";

function AddExam({
	onProceed,
	onClose,
	initialExam,
	profileIds,
	studentsAndScores = {},
	multiEnabled = false,
}: examInitialProperties) {
	const [value, toggleValue] = useToggle(false);

	const { profileId, score, date, note, id } = initialExam || {};

	const [hasConditions, setHasConditions] = useState(false);

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
		studentsAndScores,
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

	useEffect(() => {
		setHasConditions(multiEnabled && (dateCondition || scoreCondition || noteCondition));
	}, [multiEnabled, dateCondition, scoreCondition, noteCondition]);

	const submitContact = async (e) => {
		e.preventDefault();
		try {
			e.preventDefault();

			if (createMutation.isLoading) return;
			if (updateMutation.isLoading) return;
			if (createMultipleMutation.isLoading) return;
			if (updateMultipleMutation.isLoading) return;
			if ((profileIds && profileIds.length > 0) || Object.keys(studentsAndScores).length > 0) {
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
		<form method="dialog" className="space-y-6" action="#">
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
								<div className="row-span-full">
									<label
										htmlFor="score"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
									>
										Change Exam where Score was:
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
										placeholder="Old Score"
										required
									/>
								</div>

								<div className="row-span-full">
									<label
										htmlFor="date"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
									>
										Change Exam where Date was:
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
												date:
													value && value.length > 1
														? parse(value, "yyyy-mm-dd", new Date())
														: null,
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
										change Exam where Note contains:
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
				<label
					htmlFor="score"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>
					{value ? "New Score" : "Score"}
				</label>
				<input
					type="number"
					name="score"
					id="score"
					value={Number.isNaN(Number(examState.score)) ? "" : Number(examState.score)}
					onChange={(e) =>
						setExamState({
							...examState,
							error: "",
							score: Number(e.target.value),
						})
					}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					placeholder={value ? "New Score" : "Score"}
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
					{value ? "New Note" : "Note"}
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
					placeholder={value ? "New Note" : "Note"}
				/>
			</div>

			<button
				onClick={proceedAndClose}
				type="submit"
				className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				{multiEnabled ? (hasConditions ? "Edit" : "Add") : id ? "Edit" : "Add"}{" "}
			</button>
		</form>
	);
}

export default AddExam;
