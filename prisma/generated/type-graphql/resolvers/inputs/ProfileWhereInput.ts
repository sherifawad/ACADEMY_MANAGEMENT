import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AttendanceListRelationFilter } from "../inputs/AttendanceListRelationFilter";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { ExamListRelationFilter } from "../inputs/ExamListRelationFilter";
import { GroupRelationFilter } from "../inputs/GroupRelationFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";
import { UserRelationFilter } from "../inputs/UserRelationFilter";

@TypeGraphQL.InputType("ProfileWhereInput", {
  isAbstract: true
})
export class ProfileWhereInput {
  @TypeGraphQL.Field(_type => [ProfileWhereInput], {
    nullable: true
  })
  AND?: ProfileWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProfileWhereInput], {
    nullable: true
  })
  OR?: ProfileWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProfileWhereInput], {
    nullable: true
  })
  NOT?: ProfileWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  bio?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  createdAt?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  updatedAt?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => UserRelationFilter, {
    nullable: true
  })
  user?: UserRelationFilter | undefined;

  @TypeGraphQL.Field(_type => ExamListRelationFilter, {
    nullable: true
  })
  exams?: ExamListRelationFilter | undefined;

  @TypeGraphQL.Field(_type => AttendanceListRelationFilter, {
    nullable: true
  })
  attendances?: AttendanceListRelationFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  groupId?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => GroupRelationFilter, {
    nullable: true
  })
  group?: GroupRelationFilter | undefined;
}
