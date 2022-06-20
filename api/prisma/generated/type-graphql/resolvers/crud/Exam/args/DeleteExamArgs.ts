import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ExamWhereUniqueInput } from "../../../inputs/ExamWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class DeleteExamArgs {
  @TypeGraphQL.Field(_type => ExamWhereUniqueInput, {
    nullable: false
  })
  where!: ExamWhereUniqueInput;
}
