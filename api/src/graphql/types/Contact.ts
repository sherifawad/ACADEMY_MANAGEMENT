import { nonNull, objectType, stringArg, extendType, intArg, nullable, arg, booleanArg } from "nexus";
import { DomainsIds } from ".";
import { getDomainPermissions } from "../../utils/utils";

//generates Contact type at schema.graphql
export const Contact = objectType({
	name: "Contact",
	definition(t) {
		t.string("id");
		t.string("note");
		t.string("phone");
		t.string("parentsPhones");
		t.string("address");
		t.string("email");
		t.boolean("emailConfirmed");
	},
});

//get unique contact
export const ContactByIdQuery = extendType({
	type: "Query",
	definition(t) {
		t.nonNull.field("Contact", {
			type: "Contact",
			args: { contactId: nonNull(stringArg()) },
			resolve: async (_parent, { contactId }, { prisma, user }) => {
				try {
					const { role = null } = user;
					if (!role) throw new Error("Not Allowed");
					const permissionsList = await getDomainPermissions(role.id, DomainsIds.STUDENT);
					if (!permissionsList) throw new Error("Not Allowed");
					const userQuery = await prisma.user.findUniqueOrThrow({
						where: { id: contactId },
						include: { contact: true },
					});
					if (permissionsList.includes("readSelf")) {
						if (contactId !== user.id) {
							return userQuery;
						}
					}

					if (permissionsList.includes("readFamily")) {
						const familyId = await prisma.user.findUniqueOrThrow({
							where: { id: contactId },
						})?.familyId;
						if (familyId && familyId === user.familyId) {
							return userQuery;
						}
					}
					if (permissionsList.includes("full") || permissionsList.includes("read")) {
						return userQuery;
					}
					throw new Error("Not Allowed");
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

//create Contact
export const createContactMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("createContact", {
			type: "Contact",
			args: {
				phone: nonNull(stringArg()),
				address: nonNull(stringArg()),
				note: nullable(stringArg()),
				parentsPhones: nullable(stringArg()),
				email: nullable(stringArg()),
			},
			resolve: async (_parent, { phone, address, note, parentsPhones, email }, { prisma, user }) => {
				try {
					const { role = null } = user;
					if (!role) throw new Error("Not Allowed");
					const permissionsList = await getDomainPermissions(role.id, DomainsIds.STUDENT);
					if (!permissionsList) throw new Error("Not Allowed");
					const newContact: any = {
						phone,
						address,
						note,
						parentsPhones,
						email,
					};
					if (permissionsList.includes("full") || permissionsList.includes("create")) {
						return await prisma.contact.create({
							data: newContact,
						});
					}
					throw new Error("Not Allowed");
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

// update Contact
export const UpdateContactMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("updateContact", {
			type: "Contact",
			args: {
				contactId: nonNull(stringArg()),
				phone: stringArg(),
				address: stringArg(),
				note: stringArg(),
				parentsPhones: stringArg(),
				email: stringArg(),
				emailConfirmed: booleanArg(),
			},
			resolve: async (
				_parent,
				{ contactId, phone, address, note, parentsPhones, email, emailConfirmed },
				{ prisma, user }
			) => {
				try {
					const { role = null } = user;
					if (!role) throw new Error("Not Allowed");
					const permissionsList = await getDomainPermissions(role.id, DomainsIds.STUDENT);
					if (!permissionsList) throw new Error("Not Allowed");

					const updateContact = {
						phone,
						address,
						note,
						parentsPhones,
						email,
						emailConfirmed,
					};

					if (permissionsList.includes("editSelf")) {
						if (contactId === user.id) {
							return await prisma.contact.update({
								where: { id: contactId },
								data: { ...updateContact },
							});
						}
					}
					if (permissionsList.includes("full") || permissionsList.includes("edit")) {
						return await prisma.contact.update({
							where: { id: contactId },
							data: { ...updateContact },
						});
					}
					throw new Error("Not Allowed");
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});

// delete Contact
export const DeleteContactMutation = extendType({
	type: "Mutation",
	definition(t) {
		t.nonNull.field("deleteContact", {
			type: "Contact",
			args: {
				id: nonNull(stringArg()),
			},
			async resolve(_parent, { id }, { prisma, user }) {
				try {
					const { role = null } = user;
					if (!role) throw new Error("Not Allowed");
					const permissionsList = await getDomainPermissions(role.id, DomainsIds.ATTENDANCES);
					if (!permissionsList) throw new Error("Not Allowed");

					if (permissionsList.includes("full") || permissionsList.includes("delete")) {
						return await prisma.contact.delete({
							where: { id },
						});
					}
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});
