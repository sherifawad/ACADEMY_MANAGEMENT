import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { DateTimeNullableFilter } from "../inputs/DateTimeNullableFilter";
import { GroupRelationFilter } from "../inputs/GroupRelationFilter";
import { ProfileRelationFilter } from "../inputs/ProfileRelationFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";

@TypeGraphQL.InputType("AttendanceWhereInput", {
  isAbstract: true
})
export class AttendanceWhereInput {
  @TypeGraphQL.Field(_type => [AttendanceWhereInput], {
    nullable: true
  })
  AND?: AttendanceWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [AttendanceWhereInput], {
    nullable: true
  })
  OR?: AttendanceWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [AttendanceWhereInput], {
    nullable: true
  })
  NOT?: AttendanceWhereInput[] | undefined;

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
  createdBy?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  updatedBy?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  profileId?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => ProfileRelationFilter, {
    nullable: true
  })
  Profile?: ProfileRelationFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  groupId?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => GroupRelationFilter, {
    nullable: true
  })
  group?: GroupRelationFilter | undefined;
}
