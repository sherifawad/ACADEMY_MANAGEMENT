import AddGrade from "features/gradeFeature/AddGrade";
import AddModel from "components/AddModel";
import GradesList from "components/GradesList";
import constants from "core/constants";
import { createAxiosService } from "core/utils";
import { GRADES_QUERY } from "features/gradeFeature/gradeQueries";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function grade({ grades }) {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [isOpened, setIsOpened] = useState(false);
	const [gradeItemData, setGradeItemData] = useState(null);

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const router = useRouter();

	useEffect(() => {
		if (gradeItemData?.id) {
			setIsOpened(true);
		}
	}, [setGradeItemData, gradeItemData]);

	// Call this function whenever you want to
	// refresh props!
	const onProceed = () => {
		router.replace(router.asPath);
		console.log("Proceed clicked");
	};

	const onClose = () => {
		setIsOpened(false);
		console.log("close clicked");
	};

	const onOpen = () => {
		setGradeItemData({ id: null, name: "", isActive: false });
		setIsOpened(true);
	};

	return (
		<div className="container">
			<Head>
				<title>Grade</title>
				<meta name="description" content="grade page" />
			</Head>

			<AddModel isOpened={isOpened} onClose={onClose} title="Add Grade">
				<AddGrade onProceed={onProceed} onClose={onClose} {...gradeItemData} />
			</AddModel>
			<div className="grid grid-row-[auto_1fr] gap-8">
				<button
					onClick={onOpen}
					className="justify-self-end block w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					type="button"
				>
					Add Grade
				</button>
				<GradesList gradesItems={grades} setGradeItemData={setGradeItemData} />
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	try {
		// const session = await getSession({ req });

		// if (!session) {
		// 	return {
		// 		redirect: {
		// 			destination: "/auth",
		// 			permanent: false,
		// 		},
		// 	};
		// }

		const result = await createAxiosService({ query: GRADES_QUERY });
		if (result?.data?.data) {
			return {
				props: {
					// session,
					grades: result.data.data.Grades,
				},
			};
		}
	} catch (error) {
		console.error(
			"🚀 ~ file: grade.tsx ~ line 73 ~ constgetServerSideProps:GetServerSideProps= ~ error",
			error.message
		);

		return {
			props: {
				session: null,
			},
		};
	}
	return {
		props: {},
	};
};

export default grade;
