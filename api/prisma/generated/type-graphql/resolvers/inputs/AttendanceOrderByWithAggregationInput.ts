import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AttendanceCountOrderByAggregateInput } from "../inputs/AttendanceCountOrderByAggregateInput";
import { AttendanceMaxOrderByAggregateInput } from "../inputs/AttendanceMaxOrderByAggregateInput";
import { AttendanceMinOrderByAggregateInput } from "../inputs/AttendanceMinOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("AttendanceOrderByWithAggregationInput", {
  isAbstract: true
})
export class AttendanceOrderByWithAggregationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

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
  note?: "asc" | "desc" | undefined;

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

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  groupId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => AttendanceCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: AttendanceCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => AttendanceMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: AttendanceMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => AttendanceMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: AttendanceMinOrderByAggregateInput | undefined;
}
