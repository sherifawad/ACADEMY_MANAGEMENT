import CardContainer from "components/layout/CardContainer";
import { getDayNames } from "core/utils";
import useModel from "customHooks.tsx/useModel";
import Link from "next/link";
import { useRouter } from "next/router";
import AddExam from "./AddExam";

function ExamsCard({ id = "", exams = [] }) {
	const { Model, modelProps, itemData, setItemData, setIsOpened } = useModel();
	const router = useRouter();
	const onProceed = () => {
		router.replace(router.asPath);
		console.log("Proceed clicked");
	};
	return (
		<>
			<CardContainer>
				<div>
					<div className="flex justify-between items-center">
						<Link href={`/student/${id}/exam`}>
							<a>
								<h3 className="font-bold underline-offset-4 underline">Exams</h3>
							</a>
						</Link>
						<Model title="Exam">
							<AddExam
								onProceed={onProceed}
								onClose={modelProps.onClose}
								edit={modelProps.editButtonClicked}
								initialExam={{
									profileId: id,
									...itemData,
								}}
							/>
						</Model>
					</div>

					<div className="divide-y">
						{exams?.map((exam, idx) => (
							<div key={idx} className="py-4 grid grid-cols-3 ">
								<div className="">{exam?.score}</div>
								<div className="">{getDayNames(exam?.date)}</div>
								<div style={{ justifySelf: "center" }}>
									{new Date(exam?.date).toLocaleDateString("en-US")}
								</div>
							</div>
						))}
					</div>
				</div>
			</CardContainer>
		</>
	);
}

export default ExamsCard;
