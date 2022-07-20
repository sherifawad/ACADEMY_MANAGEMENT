import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import prisma from "../lib/prisma";
import { getUserId } from "../utils/auth";
import { Context } from "./types";

export async function createContext(request: ExpressContext): Promise<Partial<Context>> {
	const context: Context = {
		...request,
		response: request.res,
		request: request.req,
		prisma: prisma,
		user: null,
	};

	const userId = getUserId(context);

	// if (userId) {
	// 	const user = await prisma.user.findFirst({
	// 		where: {
	// 			id: userId,
	// 		},
	// 		rejectOnNotFound: true,
	// 	});
	// 	context.user = user;
	// }

	const user = await prisma.contact.findUniqueOrThrow({
		where: {
			email: "seededadmin@admin.com",
		},

		include: { user: true },
	});
	if (user) {
		context.user = user.user;
	}

	return context;
}
