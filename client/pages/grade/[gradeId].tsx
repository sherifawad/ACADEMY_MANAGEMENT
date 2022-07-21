import GroupContents from "components/pageContents/GroupContents";
import { GRADES_IDS, GRADE_GROUPS_QUERY } from "core/queries/gradeQueries";
import { createAxiosService } from "core/utils";
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
	const {
		data: {
			data: { Grades },
		},
	} = await createAxiosService(GRADES_IDS);

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
	const {
		data: {
			data: {
				Grade: { groups, name },
			},
		},
	} = await createAxiosService(GRADE_GROUPS_QUERY, { gradeId: params?.gradeId });

	if (groups) {
		return { props: { groups: groups, gradeName: name } };
	}

	// Pass post data to the page via props
	return { props: {} };
}

export default gradeItemData;
