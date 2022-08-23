import { Role } from "@prisma/client";
import { nonNull, objectType, stringArg, extendType, intArg, nullable, arg, booleanArg } from "nexus";

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
					const { id, role } = user || {};
					if (!user) throw new Error("Not Allowed");
					const userQuery = await prisma.user.findUniqueOrThrow({
						where: { id: contactId },
						include: { contact: true },
					});
					const sameUser = user.id === id || user.familyId === userQuery.familyId;
					switch (role) {
						case Role.ADMIN:
							if (userQuery.role === Role.ADMIN && !sameUser) {
								throw new Error("Not Allowed");
							}
							return userQuery.contact;
						case Role.USER:
							if (userQuery.role === Role.ADMIN) {
								throw new Error("Not Allowed");
							}
							if (userQuery.role === Role.USER && !sameUser) {
								throw new Error("Not Allowed");
							}
							return userQuery.contact;
						case Role.Student:
							if (sameUser) {
								return userQuery.contact;
							}
							throw new Error("Not Allowed");

						default:
							throw new Error("Not Allowed");
					}
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
					if (!user || (user.role !== Role.ADMIN && user.role !== Role.USER))
						throw new Error("Not Allowed");
					const newContact = {
						phone,
						address,
						note,
						parentsPhones,
						email,
					};
					return await prisma.contact.create({
						data: newContact,
					});
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
					const { id, role } = user || {};
					if (!user) throw new Error("Not Allowed");

					const userQuery = await prisma.user.findUniqueOrThrow({
						where: { id: contactId },
					});
					const sameUser = user.id === id || user.familyId === userQuery.familyId;
					switch (role) {
						case Role.ADMIN:
							if (userQuery.role === Role.ADMIN && !sameUser) {
								throw new Error("Not Allowed");
							}
							break;
						case Role.USER:
							if (userQuery.role === Role.ADMIN) {
								throw new Error("Not Allowed");
							}
							if (userQuery.role === Role.USER && !sameUser) {
								throw new Error("Not Allowed");
							}
							break;
						case Role.Student:
							throw new Error("Not Allowed");

						default:
							throw new Error("Not Allowed");
					}
					const updateContact = {
						phone,
						address,
						note,
						parentsPhones,
						email,
						emailConfirmed,
					};
					return await prisma.contact.update({
						where: { id },
						data: { ...updateContact },
					});
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
					if (!user || user.role !== Role.ADMIN) throw new Error("Not Allowed");

					return await prisma.contact.delete({
						where: { id },
					});
				} catch (error) {
					return Promise.reject("error");
				}
			},
		});
	},
});
