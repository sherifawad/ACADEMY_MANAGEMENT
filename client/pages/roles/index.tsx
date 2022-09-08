import MiniCard from "components/layout/MiniCard";
import RolesList from "components/RolesList";
import Paths from "core/paths";
import useModel from "customHooks/useModel";
import { rolesListQuery } from "features/rolesFeature/rolesQueries";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { authOptions } from "pages/api/auth/[...nextauth]";

function index({ roles }) {
	const AddRole = dynamic(() => import("features/rolesFeature/AddRole"), {
		ssr: false,
	});
	const { Model, modelProps, itemData, setItemData } = useModel();
	const router = useRouter();

	const onProceed = () => {
		router.replace(router.asPath);
		console.log("Proceed clicked");
	};
	return (
		<div className="container">
			<Head>
				<title>Roles</title>
				<meta name="description" content="app Roles page" />
			</Head>
			<Model title="Add Role">
				<AddRole onProceed={onProceed} onClose={modelProps.onClose} {...itemData} />
			</Model>
			<RolesList rolesItems={roles} setRolesItemData={setItemData} />
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	try {
		// const session = await unstable_getServerSession(req, res, authOptions);

		// if (!session) {
		// 	return {
		// 		redirect: {
		// 			destination: Paths.Auth,
		// 			permanent: false,
		// 		},
		// 	};
		// }
		// const { accessToken } = session;

		const { roles, error } = await rolesListQuery();
		if (error) {
			return { props: {} };
		}
		return {
			props: { roles },
		};
	} catch (error) {
		return {
			props: {
				session: null,
			},
		};
	}
};

export default index;
