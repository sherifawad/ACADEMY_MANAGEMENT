import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ExamOrderByWithAggregationInput } from "../../../inputs/ExamOrderByWithAggregationInput";
import { ExamScalarWhereWithAggregatesInput } from "../../../inputs/ExamScalarWhereWithAggregatesInput";
import { ExamWhereInput } from "../../../inputs/ExamWhereInput";
import { ExamScalarFieldEnum } from "../../../../enums/ExamScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByExamArgs {
  @TypeGraphQL.Field(_type => ExamWhereInput, {
    nullable: true
  })
  where?: ExamWhereInput | undefined;

  @TypeGraphQL.Field(_type => [ExamOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: ExamOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [ExamScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"id" | "createdAt" | "updatedAt" | "score" | "note" | "date" | "createdBy" | "updatedBy" | "profileId">;

  @TypeGraphQL.Field(_type => ExamScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: ExamScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
