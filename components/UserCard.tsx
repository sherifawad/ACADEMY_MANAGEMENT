import { Contact, family, Grade, Group, Role, User } from "@prisma/client";
import useModel from "core/hooks/useModel";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
	AiOutlineHome,
	AiOutlinePhone,
	AiOutlineMobile,
	AiOutlineMail,
	AiOutlineFieldTime,
} from "react-icons/ai";
import { RiChatPrivateLine } from "react-icons/ri";
import { GiUpgrade, GiTeamDowngrade } from "react-icons/gi";
import Link from "next/link";
import CardContainer from "./ui/CardContainer";
import { format } from "date-fns";

interface studentGroup extends Group {
	grade: Grade;
}

interface props extends User {
	group: studentGroup;
	contact: Contact;
	bio: string;
	role: Role;
	family: family;
}
function UserCard({
	name = "",
	email,
	bio = "",
	contact,
	group,
	id,
	isActive,
	image,
	roleId,
	role,
	family,
}: props) {
	const { Model, modelProps, itemData, setItemData, setIsOpened } = useModel();
	// const AddUser = dynamic(() => import("./AddUser"), {
	// 	ssr: false,
	// });

	const [show, setShow] = useState(false);
	useEffect(() => {
		setShow(true);
	}, []);

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
						<div className="flex flex-col md:flex-row-reverse flex-nowrap md:justify-between justify-center items-center">
							{show ? (
								<Model title={`${role?.name}`}>
									<AddUser
										onProceed={onProceed}
										onClose={modelProps.onClose}
										gradeId={group ? group?.gradeId : undefined}
										roleId={roleId}
										initialUser={{
											name,
											contact,
											groupId: group ? group?.id : undefined,
											id,
											isActive,
											image,
											family,
										}}
									/>
								</Model>
							) : null}
							<div className="text-sky-500 dark:text-sky-400 font-bold">{name}</div>
						</div>
						{bio ? (
							<blockquote>
								<p className="text-lg font-medium">“{bio}”</p>
							</blockquote>
						) : null}
						<div
							className={`flex flex-col md:flex-row gap-2 p-2 md:items-start ${
								bio ? "justify-around" : ""
							} `}
						>
							<div>
								<h3 className="font-bold underline-offset-4 underline">Contact Details</h3>
								<div className="divide-y">
									<div className="flex gap-2 py-2 items-center">
										<AiOutlineMail />
										<a href={`mailto: ${email}`}>
											<p className="text-sm font-medium">{email}</p>
										</a>
									</div>
									<div className="flex gap-2 py-2 items-center">
										<RiChatPrivateLine />
										<p className="text-sm font-medium">{role?.name}</p>
									</div>
									<div className="flex gap-2 py-2  items-center">
										<AiOutlineMobile />
										<p className="text-sm font-medium ">{contact?.phone}</p>
									</div>
									{contact?.parentsPhones ? (
										<div className="flex gap-2 py-2  items-center">
											<AiOutlinePhone />
											<p className="text-sm font-medium ">{contact?.parentsPhones}</p>
										</div>
									) : null}
								</div>
							</div>
							{group?.name ? (
								<div>
									<h3 className="font-bold underline-offset-4 underline">Group Details</h3>
									<div className="divide-y">
										<div className="flex gap-2 py-2 items-center">
											<GiUpgrade />
											<Link href={`/grade/${group?.gradeId}`}>
												<a>
													<p className="text-sm font-medium">
														{group?.grade?.name}
													</p>
												</a>
											</Link>
										</div>
										<div className="flex gap-2 py-2 items-center">
											<GiTeamDowngrade />
											<Link href={`/group/${group?.id}`}>
												<a>
													<p className="text-sm font-medium">{group?.name}</p>
												</a>
											</Link>
										</div>
										<div className="flex gap-2 py-2  items-center">
											<AiOutlineFieldTime />
											<div className="flex flex-wrap gap-2">
												<div className="text-sm font-medium">
													{group?.startAt
														? format(new Date(group?.startAt), "hh:mm a")
														: ""}
												</div>
												<span className="text-sm font-medium"> : </span>
												<div className="text-sm font-medium">
													{group?.endAt
														? format(new Date(group?.endAt), "hh:mm a")
														: ""}
												</div>
											</div>
										</div>
									</div>
								</div>
							) : null}
						</div>
						<figcaption className="font-medium">
							<div className="flex gap-2 p-2">
								<AiOutlineHome />
								<p className="text-slate-700 dark:text-slate-500">“{contact?.address}”</p>
							</div>
						</figcaption>
					</div>
				</figure>
			</CardContainer>
		</>
	);
}

export default UserCard;
