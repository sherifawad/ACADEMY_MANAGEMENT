import CardContainer from "components/layout/CardContainer";
import { GET_STUDENT_DETAILS, GET_USERS, GET_USERS_IDS } from "core/queries/userQueries";
import { createAxiosService, getDayNames } from "core/utils";
import { format } from "date-fns";
import AttendancesCard from "features/attendanceFeature/AttendancesCard";
import ExamsCard from "features/examFeature/ExamsCard";
import Image from "next/image";
import Link from "next/link";

function Student({ user }) {
	const {
		id,
		profile: { attendances, exams },
	} = user || {};
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
					<AttendancesCard attendances={attendances} id={id} />

					<ExamsCard exams={exams} id={id} />
				</div>
			</div>
		</div>
	);
}

export async function getStaticPaths() {
	try {
		const {
			data: {
				data: {
					FilteredUsers: { list },
				},
			},
		} = await createAxiosService(GET_USERS_IDS, {
			role: "Student",
		});

		const paths = list?.map((user) => ({
			params: { studentId: user.id },
		}));
		return { paths, fallback: false };
	} catch (error) {
		return { fallback: false };
	}
}

// This also gets called at build time
export async function getStaticProps({ params }) {
	try {
		const {
			data: {
				data: { User },
			},
		} = await createAxiosService(GET_STUDENT_DETAILS, {
			userId: params.studentId,
			attendancesTake2: 5,
			examsTake2: 5,
		});

		return { props: { user: User } };
	} catch (error) {
		return { props: {} };
	}
}

export default Student;
