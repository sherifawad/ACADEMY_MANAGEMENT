import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { GradeOrderByWithAggregationInput } from "../../../inputs/GradeOrderByWithAggregationInput";
import { GradeScalarWhereWithAggregatesInput } from "../../../inputs/GradeScalarWhereWithAggregatesInput";
import { GradeWhereInput } from "../../../inputs/GradeWhereInput";
import { GradeScalarFieldEnum } from "../../../../enums/GradeScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByGradeArgs {
  @TypeGraphQL.Field(_type => GradeWhereInput, {
    nullable: true
  })
  where?: GradeWhereInput | undefined;

  @TypeGraphQL.Field(_type => [GradeOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: GradeOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [GradeScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"id" | "name" | "isActive" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy">;

  @TypeGraphQL.Field(_type => GradeScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: GradeScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
