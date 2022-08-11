import GroupContents from "components/pageContents/GroupContents";
import { createAxiosService } from "core/utils";
import { getGradeGroups, getGradeIds, GRADE_GROUPS_QUERY } from "features/gradeFeature/gradeQueries";
import Head from "next/head";

function gradeItemData({ groups, gradeName }) {
	return (
		<div className="container">
			<Head>
				<title>{gradeName}</title>
				<meta name="description" content="grade groups page" />
			</Head>

			<GroupContents groups={groups} />
		</div>
	);
}

export async function getStaticPaths() {
	const { Grades } = await getGradeIds();

	if (Grades) {
		const paths = Grades?.map((grade) => ({
			params: { gradeId: grade?.id },
		}));
		return { paths, fallback: false };
	}
	return { fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
	const { groups, name } = await getGradeGroups({ gradeId: params?.gradeId });

	if (groups) {
		return { props: { groups, gradeName: name } };
	}

	// Pass post data to the page via props
	return { props: {} };
}

export default gradeItemData;
