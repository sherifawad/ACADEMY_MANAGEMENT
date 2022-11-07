import { booleanArg, extendType, nonNull, nullable, objectType, stringArg } from "nexus";

export const Contact = objectType({
	name: "Contact",
	definition(t) {
		t.id("id");
		t.string("note");
		t.string("phone");
		t.string("parentsPhones");
		t.string("address");
	},
});

//get unique contact
export const ContactByIdQuery = extendType({
	type: "Query",
	definition(t) {
		t.nonNull.field("Contact", {
			type: Contact,
			args: { contactId: nonNull(stringArg()) },
			resolve: async (_parent, { contactId }, { prisma, session }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					const userQuery = await prisma.user.findUniqueOrThrow({
						where: { id: contactId },
						include: { Contact: true },
					});
					return userQuery;
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
			type: Contact,
			args: {
				phone: nonNull(stringArg()),
				address: nonNull(stringArg()),
				note: nullable(stringArg()),
				parentsPhones: nullable(stringArg()),
				email: nullable(stringArg()),
			},
			resolve: async (_parent, { phone, address, note, parentsPhones, email }, { prisma, session }) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");
					const newContact: any = {
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
			type: Contact,
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
				{ prisma, session }
			) => {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");

					const updateContact = {
						phone,
						address,
						note,
						parentsPhones,
						email,
						emailConfirmed,
					};

					return await prisma.contact.update({
						where: { id: contactId },
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
			type: Contact,
			args: {
				id: nonNull(stringArg()),
			},
			async resolve(_parent, { id }, { prisma, session }) {
				try {
					const { role = null } = session;
					if (!role) throw new Error("Not Allowed");

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
