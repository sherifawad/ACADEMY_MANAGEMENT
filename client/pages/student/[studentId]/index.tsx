import CardContainer from "components/layout/CardContainer";
import { GET_STUDENT_DETAILS, GET_USERS, GET_USERS_IDS } from "core/queries/userQueries";
import { createAxiosService, getDayNames } from "core/utils";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

function Student({ user }) {
	return (
		<div className="container w-full">
			<div className="flex flex-col md:flex-row gap-4">
				<CardContainer width="md:w-3/5">
					<div className="container">
						<div className=" block">
							<Image width={150} height={150} layout="responsive" src="/johnAvatar.png" />
						</div>
						<div className="font-semibold">{user?.name}</div>
						<p className="font-extralight">{user?.profile?.bio}</p>
						<div className="flex justify-between flex-wrap">
							<div className="font-normal border-b border-gray-200">{user?.contact?.email}</div>
							<div className="font-normal border-b border-gray-200">{user?.contact?.phone}</div>
						</div>
						<div className="font-normal">{user?.contact?.parentsPhones}</div>
						<div className="font-normal">{user?.contact?.address}</div>
						<div className="font-normal border-b border-gray-200">
							{user?.profile?.group?.grade?.name}
						</div>
						<div className="flex justify-between flex-wrap">
							<div className="font-normal border-b border-gray-200">
								{user?.profile?.group?.name}
							</div>
							<div className="flex border-b border-gray-200  flex-wrap gap-2">
								<div className="font-normal">
									{user?.profile?.group?.startAt
										? format(new Date(user?.profile?.group?.startAt), "hh:mm a")
										: ""}
								</div>
								<span className="font-bold"> : </span>
								<div className="font-normal">
									{user?.profile?.group?.endAt
										? format(new Date(user?.profile?.group?.endAt), "hh:mm a")
										: ""}
								</div>
							</div>
						</div>
					</div>
				</CardContainer>
				<div className="flex flex-col justify-between  flex-wrap md:w-3/5 gap-4">
					<CardContainer>
						<div>
							<Link href={`/student/${user.id}/attendance`}>
								<a>
									<h3 className="font-bold underline-offset-4 underline">Attendance</h3>
								</a>
							</Link>
							<div className="divide-y">
								{user?.profile?.attendances?.map((attendance) => (
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
					<CardContainer>
						<div>
							<Link href={`/student/${user.id}/exam`}>
								<a>
									<h3 className="font-bold underline-offset-4 underline">Exams</h3>
								</a>
							</Link>
							<div className="divide-y">
								{user?.profile?.exams?.map((exam) => (
									<div key={exam.id} className="py-4 flex  flex-wrap justify-between gap-2">
										<div className="flex  flex-wrap items-center gap-2">
											{exam?.score}
										</div>
										<div className="">{getDayNames(exam?.date)}</div>
										<div className="">
											{new Date(exam?.date).toLocaleDateString("en-US")}
										</div>
									</div>
								))}
							</div>
						</div>
					</CardContainer>
				</div>
			</div>
		</div>
	);
}

export async function getStaticPaths() {
	const result = await createAxiosService(GET_USERS_IDS, {
		data: {
			role: "Student",
		},
	});

	if (result?.data?.data) {
		const paths = result.data?.data?.FilteredUsers?.map((user) => ({
			params: { studentId: user.id },
		}));
		return { paths, fallback: false };
	}
	return { fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
	const result = await createAxiosService(GET_STUDENT_DETAILS, { userId: params.studentId, take: 2 });

	if (result?.data?.data) {
		return { props: { user: result?.data?.data.User } };
	}

	// Pass post data to the page via props
	return { props: {} };
}

export default Student;
