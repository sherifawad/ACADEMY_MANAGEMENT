import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeWithAggregatesFilter } from "../inputs/DateTimeWithAggregatesFilter";
import { StringNullableWithAggregatesFilter } from "../inputs/StringNullableWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("GradeScalarWhereWithAggregatesInput", {
  isAbstract: true
})
export class GradeScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(_type => [GradeScalarWhereWithAggregatesInput], {
    nullable: true
  })
  AND?: GradeScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [GradeScalarWhereWithAggregatesInput], {
    nullable: true
  })
  OR?: GradeScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [GradeScalarWhereWithAggregatesInput], {
    nullable: true
  })
  NOT?: GradeScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  id?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  name?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeWithAggregatesFilter, {
    nullable: true
  })
  createdAt?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeWithAggregatesFilter, {
    nullable: true
  })
  updatedAt?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  createdBy?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableWithAggregatesFilter, {
    nullable: true
  })
  updatedBy?: StringNullableWithAggregatesFilter | undefined;
}
