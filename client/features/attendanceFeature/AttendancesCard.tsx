import CardContainer from "components/layout/CardContainer";
import { getDayNames } from "core/utils";
import useModel from "customHooks.tsx/useModel";
import Link from "next/link";
import { useRouter } from "next/router";
import AddAttendance from "./AddAttendance";

function AttendancesCard({ id = "", attendances = [] }) {
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
						<Link href={`/student/${id}/attendance`}>
							<a>
								<h3 className="font-bold underline-offset-4 underline">Attendance</h3>
							</a>
						</Link>
						<Model title="Attendance">
							<AddAttendance
								onProceed={onProceed}
								onClose={modelProps.onClose}
								initialAttendance={{
									profileId: id,
									id: itemData?.id,
									startAt: itemData?.startAt,
									endAt: itemData?.endAt,
									note: itemData?.note,
								}}
							/>
						</Model>
					</div>
					<div className="divide-y">
						{attendances?.map((attendance) => (
							<div key={attendance.id} className="py-4 flex  flex-wrap gap-2">
								<div className="grid grid-cols-[auto_1fr] gap-2 place-items-center">
									<div
										className={`w-3 h-3 ${
											attendance?.endAt ? "bg-green-600" : "bg-red-600"
										} rounded-full`}
									></div>

									<div className="">{getDayNames(attendance.startAt)}</div>
								</div>
								<div className="">
									{new Date(attendance.startAt).toLocaleDateString("en-US")}
								</div>
								{attendance.endAt && (
									<div className="">
										{new Date(attendance.startAt).toLocaleTimeString("en-US", {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</div>
								)}
								{attendance.endAt && (
									<div className="">
										{new Date(attendance.endAt).toLocaleTimeString("en-US", {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</CardContainer>
		</>
	);
}

export default AttendancesCard;
