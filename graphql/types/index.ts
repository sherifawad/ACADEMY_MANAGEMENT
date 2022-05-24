import { PrismaClient, User } from "@prisma/client";
import { DateTimeResolver, TimeResolver } from "graphql-scalars";
import { NextApiRequest, NextApiResponse } from "next";
import { asNexusMethod, enumType } from "nexus";

export * from "./User";
export * from "./authPayload";
export * from "./User";
export * from "./Exam";
export * from "./Grade";
export * from "./Group";
export * from "./Profile";
export * from "./UserPassword";

export const Role = enumType({
	name: "Role",
	members: ["ADMIN", "USER", "Student"],
	description: "User Role",
});

export const DateTime = asNexusMethod(DateTimeResolver, "date");
export const Time = asNexusMethod(TimeResolver, "date");

export type Context = {
	req: NextApiRequest;
	res: NextApiResponse;
	prisma: PrismaClient;
	user: User | null;
};

export const tokens = {
	access: {
		name: "ACCESS_TOKEN",
		expiry: "1d",
	},
};

export interface Token {
	userId: string;
	type: string;
	timestamp: number;
}

export interface UserToken {
	userId: string;
}
