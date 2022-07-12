import { PrismaClient, User } from "@prisma/client";
import { DateTimeResolver, TimeResolver } from "graphql-scalars";
import { Jwt } from "jsonwebtoken";
import { asNexusMethod, enumType } from "nexus";
import { Request, Response } from "express";

export * from "./User";
export * from "./authPayload";
export * from "./User";
export * from "./Exam";
export * from "./Grade";
export * from "./Group";
export * from "./Profile";
export * from "./UserPassword";
export * from "./Attendance";
export * from "./Contact";

export const Role = enumType({
	name: "Role",
	members: ["ADMIN", "USER", "Student"],
	description: "User Role",
});

export interface AccessTokenState {
	valid: boolean;
	needRefresh: boolean;
}

export type LoginPageProps = {
	csrfToken: string;
	setLogin: Function;
};

export type nextAuthToken = Jwt & {
	user: User;
};

export const DateTime = asNexusMethod(DateTimeResolver, "date");
export const Time = asNexusMethod(TimeResolver, "date");

// export type request = { req }: { req: NextApiRequest }
export interface Context {
	request: Request;
	response: Response;
	prisma: PrismaClient;
	user: User | null;
}

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