import Paths from "core/paths";
import { roleByIdQuery } from "features/rolesFeature/rolesQueries";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import React from "react";

function RoleItemData({ role }) {
	if (!role) {
		return <div />;
	}

	const result = role.Role_Domain_Permission.reduce((acc, { domain, permission }) => {
		const existingIndex = acc.findIndex((x) => x.id === domain.id);
		if (existingIndex < 0) {
			acc = [
				...acc,
				{
					id: domain.id,
					name: domain.name,
					permissions: [{ id: permission.id, name: permission.name }],
				},
			];
		} else {
			acc[existingIndex].permissions = [
				...acc[existingIndex].permissions,
				{ id: permission.id, name: permission.name },
			];
		}

		return acc;
	}, []);

	return (
		<div className="container">
			<div className="w-full flex flex-wrap justify-around items-start">
				{result &&
					result.map((obj, index) => (
						<div key={index} className="bg-white shadow-md rounded my-6">
							<table className="min-w-max w-full table-auto">
								<thead>
									<tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
										<th className="py-3 px-6 text-left">{obj.name}</th>
									</tr>
								</thead>
								<tbody className="text-gray-600 text-sm font-light">
									{obj.permissions &&
										obj.permissions.map((permission, idx) => (
											<tr
												key={idx}
												className="border-b border-gray-200 hover:bg-gray-100"
											>
												<td className="py-3 px-6 text-left whitespace-nowrap">
													<div className="flex items-center justify-between">
														<span className="font-medium mie-2">
															{permission.name}
														</span>

														<div className="">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																x="0px"
																y="0px"
																width="12"
																height="12"
																viewBox="0 0 348.333 348.334"
																fill="red"
															>
																<path
																	d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85
		c-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563
		c-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85
		l105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554
		L279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z"
																/>
															</svg>
														</div>
													</div>
												</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					))}
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
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
		const { roleId } = params;

		const variables = {
			roleId: Number(roleId),
		};

		// const { role, error } = (await roleByIdQuery(variables, accessToken)) || {};
		const { role, error } = (await roleByIdQuery(variables)) || {};

		if (error) {
			return {
				props: {},
			};
		}

		return {
			props: { role },
		};
	} catch (error) {
		return {
			props: {
				session: null,
			},
		};
	}
};

export default RoleItemData;
