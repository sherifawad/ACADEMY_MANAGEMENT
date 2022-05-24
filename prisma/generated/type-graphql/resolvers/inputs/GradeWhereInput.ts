import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { GroupListRelationFilter } from "../inputs/GroupListRelationFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType("GradeWhereInput", {
  isAbstract: true
})
export class GradeWhereInput {
  @TypeGraphQL.Field(_type => [GradeWhereInput], {
    nullable: true
  })
  AND?: GradeWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [GradeWhereInput], {
    nullable: true
  })
  OR?: GradeWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [GradeWhereInput], {
    nullable: true
  })
  NOT?: GradeWhereInput[] | undefined;

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

  @TypeGraphQL.Field(_type => GroupListRelationFilter, {
    nullable: true
  })
  groups?: GroupListRelationFilter | undefined;
}
