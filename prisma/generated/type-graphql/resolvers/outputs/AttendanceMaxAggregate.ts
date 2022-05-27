import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.ObjectType("AttendanceMaxAggregate", {
  isAbstract: true
})
export class AttendanceMaxAggregate {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id!: string | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  startAt!: Date | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  endAt!: Date | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  note!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  createdBy!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  updatedBy!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  profileId!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  groupId!: string | null;
}
