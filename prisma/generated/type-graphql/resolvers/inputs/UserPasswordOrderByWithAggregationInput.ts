import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserPasswordCountOrderByAggregateInput } from "../inputs/UserPasswordCountOrderByAggregateInput";
import { UserPasswordMaxOrderByAggregateInput } from "../inputs/UserPasswordMaxOrderByAggregateInput";
import { UserPasswordMinOrderByAggregateInput } from "../inputs/UserPasswordMinOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("UserPasswordOrderByWithAggregationInput", {
  isAbstract: true
})
export class UserPasswordOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  password?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  forceChange?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  createdAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  updatedAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => UserPasswordCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: UserPasswordCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => UserPasswordMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: UserPasswordMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => UserPasswordMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: UserPasswordMinOrderByAggregateInput | undefined;
}
