import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BoolWithAggregatesFilter } from "../inputs/BoolWithAggregatesFilter";
import { DateTimeWithAggregatesFilter } from "../inputs/DateTimeWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("UserPasswordScalarWhereWithAggregatesInput", {
  isAbstract: true
})
export class UserPasswordScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(_type => [UserPasswordScalarWhereWithAggregatesInput], {
    nullable: true
  })
  AND?: UserPasswordScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserPasswordScalarWhereWithAggregatesInput], {
    nullable: true
  })
  OR?: UserPasswordScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserPasswordScalarWhereWithAggregatesInput], {
    nullable: true
  })
  NOT?: UserPasswordScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  id?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  password?: StringWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => BoolWithAggregatesFilter, {
    nullable: true
  })
  forceChange?: BoolWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeWithAggregatesFilter, {
    nullable: true
  })
  createdAt?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeWithAggregatesFilter, {
    nullable: true
  })
  updatedAt?: DateTimeWithAggregatesFilter | undefined;
}
