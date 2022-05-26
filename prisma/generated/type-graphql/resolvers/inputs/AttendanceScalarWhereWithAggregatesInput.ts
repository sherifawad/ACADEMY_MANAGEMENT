import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeNullableWithAggregatesFilter } from "../inputs/DateTimeNullableWithAggregatesFilter";
import { DateTimeWithAggregatesFilter } from "../inputs/DateTimeWithAggregatesFilter";
import { StringNullableWithAggregatesFilter } from "../inputs/StringNullableWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("AttendanceScalarWhereWithAggregatesInput", {
  isAbstract: true
})
export class AttendanceScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(_type => [AttendanceScalarWhereWithAggregatesInput], {
    nullable: true
  })
  AND?: AttendanceScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [AttendanceScalarWhereWithAggregatesInput], {
    nullable: true
  })
  OR?: AttendanceScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [AttendanceScalarWhereWithAggregatesInput], {
    nullable: true
  })
  NOT?: AttendanceScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  id?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeWithAggregatesFilter, {
    nullable: true
  })
  startAt?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeNullableWithAggregatesFilter, {
    nullable: true
  })
  endAt?: DateTimeNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableWithAggregatesFilter, {
    nullable: true
  })
  note?: StringNullableWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  profileId?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableWithAggregatesFilter, {
    nullable: true
  })
  groupId?: StringNullableWithAggregatesFilter | undefined;
}
