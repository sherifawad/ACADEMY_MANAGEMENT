import AttendancesCard from "features/attendanceFeature/AttendancesCard";
import ExamsCard from "features/examFeature/ExamsCard";
import StudentCard from "features/studentFeature/StudentCard";
import { studentDetailsQuery, studentsIdsQuery } from "features/studentFeature/studentsQueries";

function Student({ user }) {
	const { id, name, isActive, avatar, profile, contact } = user || {};
	const { attendances, exams, bio, group } = profile || {};

	return (
		<div className="container w-full">
			<div className="w-full">
				<StudentCard
					name={name}
					bio={bio}
					contact={contact}
					group={group}
					id={id}
					isActive={isActive}
					avatar={avatar}
				/>
				<div className="flex flex-wrap md:flex-nowrap w-full gap-4 items-start justify-between pt-8">
					<AttendancesCard attendances={attendances} id={id} />
					<ExamsCard exams={exams} id={id} />
				</div>
			</div>
		</div>
	);
}

export async function getStaticPaths() {
	try {
		const { list } = await studentsIdsQuery({
			role: ["Student"],
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
		const { User } = await studentDetailsQuery({
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
