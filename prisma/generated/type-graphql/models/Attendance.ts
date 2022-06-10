import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { Group } from "../models/Group";
import { Profile } from "../models/Profile";

@TypeGraphQL.ObjectType("Attendance", {
	isAbstract: true,
})
export class Attendance {
	@TypeGraphQL.Field((_type) => String, {
		nullable: false,
	})
	id!: string;

	@TypeGraphQL.Field((_type) => Date, {
		nullable: false,
	})
	startAt!: Date;

	@TypeGraphQL.Field((_type) => Date, {
		nullable: true,
	})
	endAt?: Date | null;

	@TypeGraphQL.Field((_type) => String, {
		nullable: true,
	})
	note?: string | null;

	@TypeGraphQL.Field((_type) => String, {
		nullable: false,
	})
	createdBy!: string;

	@TypeGraphQL.Field((_type) => String, {
		nullable: true,
	})
	updatedBy?: string | null;

	@TypeGraphQL.Field((_type) => String, {
		nullable: false,
	})
	profileId!: string;

	Profile?: Profile;

	@TypeGraphQL.Field((_type) => String, {
		nullable: true,
	})
	groupId?: string | null;

	group?: Group | null;
}
