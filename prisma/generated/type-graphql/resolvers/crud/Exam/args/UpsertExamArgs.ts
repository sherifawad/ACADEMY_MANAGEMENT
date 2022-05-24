import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ExamCreateInput } from "../../../inputs/ExamCreateInput";
import { ExamUpdateInput } from "../../../inputs/ExamUpdateInput";
import { ExamWhereUniqueInput } from "../../../inputs/ExamWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertExamArgs {
  @TypeGraphQL.Field(_type => ExamWhereUniqueInput, {
    nullable: false
  })
  where!: ExamWhereUniqueInput;

  @TypeGraphQL.Field(_type => ExamCreateInput, {
    nullable: false
  })
  create!: ExamCreateInput;

  @TypeGraphQL.Field(_type => ExamUpdateInput, {
    nullable: false
  })
  update!: ExamUpdateInput;
}
