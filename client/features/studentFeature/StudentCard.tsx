import CardContainer from "components/layout/CardContainer";
import { getDayNames } from "core/utils";
import useModel from "customHooks/useModel";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import AddStudent from "./AddStudent";
import {
	AiOutlineHome,
	AiOutlinePhone,
	AiOutlineMobile,
	AiOutlineMail,
	AiOutlineFieldTime,
} from "react-icons/ai";
import { GiUpgrade, GiTeamDowngrade } from "react-icons/gi";

function StudentCard({ name = "", bio = "", contact = {}, group = {} }) {
	const { Model, modelProps, itemData, setItemData, setIsOpened } = useModel();
	const router = useRouter();
	const onProceed = () => {
		router.replace(router.asPath);
		console.log("Proceed clicked");
	};
	return (
		<>
			<CardContainer width="full">
				<figure className="md:flex rounded-xl p-8 md:p-0 ">
					<Image
						className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto"
						src="/johnAvatar.png"
						alt=""
						width="384"
						height="512"
					/>
					<div className="pt-6 md:pis-8 text-center md:text-left space-y-4 w-full">
						<blockquote>
							<p className="text-lg font-medium">“{bio}”</p>
						</blockquote>
						<div className="flex flex-col md:flex-row gap-2 p-2 md:items-start justify-around">
							<div>
								<h3 className="font-bold underline-offset-4 underline">Contact Details</h3>
								<div className="divide-y">
									<div className="flex gap-2 py-2 items-center">
										<AiOutlineMail />
										<a href={`mailto: ${(contact as any)?.email}`}>
											<p className="text-sm font-medium">{(contact as any)?.email}</p>
										</a>
									</div>
									<div className="flex gap-2 py-2  items-center">
										<AiOutlineMobile />
										<p className="text-sm font-medium ">{(contact as any)?.phone}</p>
									</div>
									<div className="flex gap-2 py-2  items-center">
										<AiOutlinePhone />
										<p className="text-sm font-medium ">
											{(contact as any)?.parentsPhones}
										</p>
									</div>
								</div>
							</div>
							<div>
								<h3 className="font-bold underline-offset-4 underline">Group Details</h3>
								<div className="divide-y">
									<div className="flex gap-2 py-2 items-center">
										<GiUpgrade />
										<Link href={`/grade/${(group as any)?.grade?.id}`}>
											<a>
												<p className="text-sm font-medium">
													{(group as any)?.grade?.name}
												</p>
											</a>
										</Link>
									</div>
									<div className="flex gap-2 py-2 items-center">
										<GiTeamDowngrade />
										<Link href={`/group/${(group as any)?.id}`}>
											<a>
												<p className="text-sm font-medium">{(group as any)?.name}</p>
											</a>
										</Link>
									</div>
									<div className="flex gap-2 py-2  items-center">
										<AiOutlineFieldTime />
										<div className="flex flex-wrap gap-2">
											<div className="text-sm font-medium">
												{(group as any)?.startAt
													? format(new Date((group as any)?.startAt), "hh:mm a")
													: ""}
											</div>
											<span className="text-sm font-medium"> : </span>
											<div className="text-sm font-medium">
												{(group as any)?.endAt
													? format(new Date((group as any)?.endAt), "hh:mm a")
													: ""}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<figcaption className="font-medium">
							<div className="text-sky-500 dark:text-sky-400">{name}</div>

							<div className="flex gap-2 p-2">
								<AiOutlineHome />
								<p className="text-slate-700 dark:text-slate-500">
									“{(contact as any)?.address}”
								</p>
							</div>
						</figcaption>
					</div>
				</figure>
			</CardContainer>
		</>
	);
}

export default StudentCard;
