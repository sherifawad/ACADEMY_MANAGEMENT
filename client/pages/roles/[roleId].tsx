import Paths from "core/paths";
import useModel from "customHooks/useModel";
import { updateRoleDetailsMutation } from "features/rolesFeature/roleMutations";
import { domainsListQuery, permissionsListQuery, roleByIdQuery } from "features/rolesFeature/rolesQueries";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { authOptions } from "pages/api/auth/[...nextauth]";
import React, { useCallback, useEffect, useState } from "react";

function RoleItemData({ role, domainsList, permissionsList }) {
	const AddDomain = dynamic(() => import("features/rolesFeature/AddDomain"), {
		ssr: false,
	});
	const AddPermissions = dynamic(() => import("features/rolesFeature/AddPermissions"), {
		ssr: false,
	});
	if (!role) {
		return <div />;
	}

	const [domains, setDomains] = useState([]);
	const [newDomains, setNewDomains] = useState([]);
	const [canSave, setCanSave] = useState(false);
	const [domainIndex, setDomainIndex] = useState(-1);
	const [permissionModelVisibility, setPermissionModelVisibility] = useState(false);

	const { Model, modelProps, isClosed } = useModel();

	const removePermission = useCallback(
		(eventClick, domainIndex, permissionId) => {
			eventClick.preventDefault();

			const permissionList = domains[domainIndex].permissions.filter((x) => x.id !== permissionId);
			if (permissionList.length <= 0) {
				setDomains((prev) => prev.filter((x) => x.id !== domains[domainIndex].id));
			} else {
				const newDomains = domains.map((obj, i) => {
					if (i === domainIndex) {
						return {
							id: obj.id,
							name: obj.name,
							permissions: permissionList,
						};
					}
					return obj;
				});
				setDomains(newDomains);
			}
			setCanSave(true);
		},
		[domains]
	);
	const removeDomain = useCallback(
		(eventClick, domainId) => {
			eventClick.preventDefault();

			setDomains((prev) => prev.filter((x) => x.id !== domainId));
			setCanSave(true);
		},
		[domains]
	);

	const addPermission = useCallback((e, domainIndex) => {
		e.preventDefault();
		setDomainIndex(domainIndex);
		setPermissionModelVisibility(true);
		modelProps.onAdd();
	}, []);

	const onProceed = useCallback(
		(checkedDomains) => {
			const newDomains = [];
			checkedDomains.forEach((domain) => {
				const exist = domains.some((x) => x.id === domain.id);
				if (!exist) {
					newDomains.push(domain);
				}
			});
			setDomains((prev) => [...newDomains, ...prev]);
			setCanSave(true);
		},
		[domains]
	);

	const onPermissionsProceed = useCallback(
		(checkedPermissions) => {
			setPermissionModelVisibility(false);
			if (domains.length <= 0 || domainIndex < 0) return;
			let domainsCopy = [...domains];
			const currentDomainPermissions = domainsCopy[domainIndex].permissions ?? [];
			let newPermissions = [];
			checkedPermissions.forEach((permission) => {
				const exist = currentDomainPermissions.some((x) => x.id === permission.id);
				if (!exist) {
					newPermissions.push(permission);
				}
			});
			domainsCopy[domainIndex] = {
				id: domainsCopy[domainIndex].id,
				name: domainsCopy[domainIndex].name,
				description: domainsCopy[domainIndex].description,
				permissions: [...newPermissions, ...currentDomainPermissions],
			};

			// currentDomain = {
			// 	id: currentDomain.id,
			// 	name: currentDomain.name,
			// 	description: currentDomain.description,
			// 	permissions: [...newPermissions, ...currentDomainPermissions],
			// };
			setDomainIndex(-1);
			setDomains(domainsCopy);
			setCanSave(true);
		},
		[domains, domainIndex]
	);

	const updateMutation = updateRoleDetailsMutation({
		roleId: role.id,
		domainPermissions: newDomains,
	});

	const onSave = async (e) => {
		e.preventDefault();
		console.log(
			"🚀 ~ file: [roleId].tsx ~ line 24 ~ RoleItemData ~ newDomains",
			JSON.stringify(newDomains)
		);

		if (updateMutation.isLoading) return;
		await updateMutation.mutateAsync();
		setCanSave(false);
	};

	useEffect(() => {
		if (!role) {
			return;
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

		setDomains(result);
	}, [role]);

	useEffect(() => {
		if (isClosed) {
			setPermissionModelVisibility(false);
		}
	}, [isClosed]);

	useEffect(() => {
		const domainPermissions = domains?.map((domain) => {
			if (domain.permissions?.length > 0) {
				const permissionsIds = domain?.permissions.map((permission) => {
					return permission.id;
				});
				return { [domain.id]: permissionsIds };
			}
		});
		setNewDomains(domainPermissions.filter((x) => x != null));
	}, [domains]);

	return (
		<div className="container">
			{permissionModelVisibility ? (
				<Model title="Add Permissions" hasAddButton={false}>
					<AddPermissions
						onProceed={onPermissionsProceed}
						onClose={modelProps.onClose}
						Permissions={permissionsList}
					/>
				</Model>
			) : (
				<Model title="Add Domain">
					<AddDomain onProceed={onProceed} onClose={modelProps.onClose} domains={domainsList} />
				</Model>
			)}
			<div className="w-full flex flex-wrap justify-center items-start">
				{domains?.length > 0 &&
					domains.map((obj, index) => (
						<div key={index} className="bg-white shadow-md rounded m-6">
							<table className="min-w-max w-full table-auto">
								<thead>
									<tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
										<th className="py-3">
											<div className="flex items-center justify-around px-6">
												<div className="" onClick={(e) => addPermission(e, index)}>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														x="0px"
														y="0px"
														width="12"
														height="12"
														viewBox="0 0 42 42"
														fill="#23A24D"
													>
														<path
															d="M37.059,16H26V4.941C26,2.224,23.718,0,21,0s-5,2.224-5,4.941V16H4.941C2.224,16,0,18.282,0,21
	s2.224,5,4.941,5H16v11.059C16,39.776,18.282,42,21,42s5-2.224,5-4.941V26h11.059C39.776,26,42,23.718,42,21S39.776,16,37.059,16z"
														/>
													</svg>
												</div>
												<span className="font-medium mx-4">{obj.name}</span>

												<div
													className=""
													onClick={(eventClick) => {
														removeDomain(eventClick, obj.id);
													}}
												>
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
										</th>
									</tr>
								</thead>
								<tbody className="text-gray-600 text-sm font-light">
									{obj.permissions &&
										obj.permissions.map((permission, idx) => (
											<tr
												key={idx}
												className="border-b border-gray-200 hover:bg-gray-100"
											>
												<td className="py-3 px-8 text-left whitespace-nowrap">
													<div className="flex items-center justify-between">
														<span className="font-medium mie-2">
															{permission.name}
														</span>

														<div
															onClick={(eventClick) => {
																removePermission(
																	eventClick,
																	index,
																	permission.id
																);
															}}
														>
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
			{canSave && (
				<div className="w-full flex justify-center">
					<button
						type="button"
						onClick={onSave}
						className="bg-green-400 rounded-full text-white text-center px-8 py-2"
					>
						Save
					</button>
				</div>
			)}
			{/* <div>
				<h1>State:</h1>
				<pre>{JSON.stringify(checkedList, null, 2)}</pre>
			</div> */}
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

		const domainsList = await domainsListQuery();
		if (domainsList?.error) {
			return {
				props: {},
			};
		}

		const permissions = await permissionsListQuery();
		if (permissions?.error) {
			return {
				props: {},
			};
		}

		return {
			props: { role, domainsList: domainsList.domains, permissionsList: permissions.permissions },
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
