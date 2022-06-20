import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ExamUpdateInput } from "../../../inputs/ExamUpdateInput";
import { ExamWhereUniqueInput } from "../../../inputs/ExamWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateExamArgs {
  @TypeGraphQL.Field(_type => ExamUpdateInput, {
    nullable: false
  })
  data!: ExamUpdateInput;

  @TypeGraphQL.Field(_type => ExamWhereUniqueInput, {
    nullable: false
  })
  where!: ExamWhereUniqueInput;
}
