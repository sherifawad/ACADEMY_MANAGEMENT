import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ExamAvgOrderByAggregateInput } from "../inputs/ExamAvgOrderByAggregateInput";
import { ExamCountOrderByAggregateInput } from "../inputs/ExamCountOrderByAggregateInput";
import { ExamMaxOrderByAggregateInput } from "../inputs/ExamMaxOrderByAggregateInput";
import { ExamMinOrderByAggregateInput } from "../inputs/ExamMinOrderByAggregateInput";
import { ExamSumOrderByAggregateInput } from "../inputs/ExamSumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("ExamOrderByWithAggregationInput", {
  isAbstract: true
})
export class ExamOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

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
  score?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  note?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  date?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  createdBy?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  updatedBy?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  profileId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => ExamCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: ExamCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ExamAvgOrderByAggregateInput, {
    nullable: true
  })
  _avg?: ExamAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ExamMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: ExamMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ExamMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: ExamMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ExamSumOrderByAggregateInput, {
    nullable: true
  })
  _sum?: ExamSumOrderByAggregateInput | undefined;
}
