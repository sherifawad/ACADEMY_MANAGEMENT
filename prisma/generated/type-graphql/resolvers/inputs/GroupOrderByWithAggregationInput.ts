import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GroupCountOrderByAggregateInput } from "../inputs/GroupCountOrderByAggregateInput";
import { GroupMaxOrderByAggregateInput } from "../inputs/GroupMaxOrderByAggregateInput";
import { GroupMinOrderByAggregateInput } from "../inputs/GroupMinOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("GroupOrderByWithAggregationInput", {
  isAbstract: true
})
export class GroupOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  name?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  createdAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  updatedAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  startAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  endAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  gradeId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => GroupCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: GroupCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => GroupMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: GroupMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => GroupMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: GroupMinOrderByAggregateInput | undefined;
}
