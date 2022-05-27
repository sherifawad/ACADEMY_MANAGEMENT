import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { GroupOrderByWithAggregationInput } from "../../../inputs/GroupOrderByWithAggregationInput";
import { GroupScalarWhereWithAggregatesInput } from "../../../inputs/GroupScalarWhereWithAggregatesInput";
import { GroupWhereInput } from "../../../inputs/GroupWhereInput";
import { GroupScalarFieldEnum } from "../../../../enums/GroupScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByGroupArgs {
  @TypeGraphQL.Field(_type => GroupWhereInput, {
    nullable: true
  })
  where?: GroupWhereInput | undefined;

  @TypeGraphQL.Field(_type => [GroupOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: GroupOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [GroupScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"id" | "name" | "createdAt" | "updatedAt" | "startAt" | "endAt" | "createdBy" | "updatedBy" | "gradeId">;

  @TypeGraphQL.Field(_type => GroupScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: GroupScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
