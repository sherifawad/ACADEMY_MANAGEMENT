import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { GradeRelationFilter } from "../inputs/GradeRelationFilter";
import { ProfileListRelationFilter } from "../inputs/ProfileListRelationFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";

@TypeGraphQL.InputType("GroupWhereInput", {
  isAbstract: true
})
export class GroupWhereInput {
  @TypeGraphQL.Field(_type => [GroupWhereInput], {
    nullable: true
  })
  AND?: GroupWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [GroupWhereInput], {
    nullable: true
  })
  OR?: GroupWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [GroupWhereInput], {
    nullable: true
  })
  NOT?: GroupWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  name?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  createdAt?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  updatedAt?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  startAt?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  endAt?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => ProfileListRelationFilter, {
    nullable: true
  })
  profiles?: ProfileListRelationFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  gradeId?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => GradeRelationFilter, {
    nullable: true
  })
  grade?: GradeRelationFilter | undefined;
}
