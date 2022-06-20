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
			args: { id: nonNull(stringArg()) },
			resolve: async (_parent, { id }, { prisma, user }) => {
				if (!user) return null;
				if (user.role !== Role.ADMIN && user.role !== Role.USER)
					return await prisma.contact.findUnique({
						where: { id },
					});
				// if logged in is not admin or user get the account details of logged user
				return await prisma.contact.findUnique({
					where: { id: user.id },
				});
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
				if (!user || user.role !== Role.ADMIN) return null;

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
				id: nonNull(stringArg()),
				phone: stringArg(),
				address: stringArg(),
				note: stringArg(),
				parentsPhones: stringArg(),
				email: stringArg(),
				emailConfirmed: booleanArg(),
			},
			resolve: async (
				_parent,
				{ id, phone, address, note, parentsPhones, email, emailConfirmed },
				{ prisma, user }
			) => {
				if (!user || user.role !== Role.ADMIN) return null;

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
				if (!user || user.role !== Role.ADMIN) return null;

				return await prisma.contact.delete({
					where: { id },
				});
			},
		});
	},
});
