import CardContainer from "components/layout/CardContainer";
import { getDayNames } from "core/utils";
import useModel from "customHooks/useModel";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import AddStudent from "./AddStudent";

function StudentCard({ name = "", bio = "", contact = {}, group = {} }) {
	const { Model, modelProps, itemData, setItemData, setIsOpened } = useModel();
	const router = useRouter();
	const onProceed = () => {
		router.replace(router.asPath);
		console.log("Proceed clicked");
	};
	return (
		<>
			<CardContainer width="md:w-3/5">
				<div className="container">
					<div className=" block">
						<Image width={150} height={150} layout="responsive" src="/johnAvatar.png" />
					</div>
					{/* <Model title="Student">
						<AddStudent
							onProceed={onProceed}
							onClose={modelProps.onClose}
							initialStudent={...itemData}
						/>
					</Model> */}
					<div className="font-semibold">{name}</div>
					<p className="font-extralight">{bio}</p>
					<div className="flex justify-between flex-wrap">
						<div className="font-normal border-b border-gray-200">{(contact as any)?.email}</div>
						<div className="font-normal border-b border-gray-200">{(contact as any)?.phone}</div>
					</div>
					<div className="font-normal">{(contact as any)?.parentsPhones}</div>
					<div className="font-normal">{(contact as any)?.address}</div>
					<div className="font-normal border-b border-gray-200">{(group as any)?.grade?.name}</div>
					<div className="flex justify-between flex-wrap">
						<div className="font-normal border-b border-gray-200">{(group as any)?.name}</div>
						<div className="flex border-b border-gray-200  flex-wrap gap-2">
							<div className="font-normal">
								{(group as any)?.startAt
									? format(new Date((group as any)?.startAt), "hh:mm a")
									: ""}
							</div>
							<span className="font-bold"> : </span>
							<div className="font-normal">
								{(group as any)?.endAt
									? format(new Date((group as any)?.endAt), "hh:mm a")
									: ""}
							</div>
						</div>
					</div>
				</div>
			</CardContainer>
		</>
	);
}

export default StudentCard;
