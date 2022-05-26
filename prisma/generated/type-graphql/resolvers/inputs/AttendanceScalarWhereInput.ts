import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { DateTimeNullableFilter } from "../inputs/DateTimeNullableFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";

@TypeGraphQL.InputType("AttendanceScalarWhereInput", {
  isAbstract: true
})
export class AttendanceScalarWhereInput {
  @TypeGraphQL.Field(_type => [AttendanceScalarWhereInput], {
    nullable: true
  })
  AND?: AttendanceScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [AttendanceScalarWhereInput], {
    nullable: true
  })
  OR?: AttendanceScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [AttendanceScalarWhereInput], {
    nullable: true
  })
  NOT?: AttendanceScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  startAt?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeNullableFilter, {
    nullable: true
  })
  endAt?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  note?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  profileId?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  groupId?: StringNullableFilter | undefined;
}
