import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ContactCountOrderByAggregateInput } from "../inputs/ContactCountOrderByAggregateInput";
import { ContactMaxOrderByAggregateInput } from "../inputs/ContactMaxOrderByAggregateInput";
import { ContactMinOrderByAggregateInput } from "../inputs/ContactMinOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("ContactOrderByWithAggregationInput", {
  isAbstract: true
})
export class ContactOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  email?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  emailConfirmed?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  phone?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  parentsPhones?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  address?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  note?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => ContactCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: ContactCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ContactMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: ContactMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ContactMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: ContactMinOrderByAggregateInput | undefined;
}
