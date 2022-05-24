import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { GradeOrderByWithRelationInput } from "../inputs/GradeOrderByWithRelationInput";
import { ProfileOrderByRelationAggregateInput } from "../inputs/ProfileOrderByRelationAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("GroupOrderByWithRelationInput", {
  isAbstract: true
})
export class GroupOrderByWithRelationInput {
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

  @TypeGraphQL.Field(_type => ProfileOrderByRelationAggregateInput, {
    nullable: true
  })
  profiles?: ProfileOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  gradeId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => GradeOrderByWithRelationInput, {
    nullable: true
  })
  grade?: GradeOrderByWithRelationInput | undefined;
}
