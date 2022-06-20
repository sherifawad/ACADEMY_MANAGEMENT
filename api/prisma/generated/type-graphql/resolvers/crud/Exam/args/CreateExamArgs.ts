import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ExamCreateInput } from "../../../inputs/ExamCreateInput";

@TypeGraphQL.ArgsType()
export class CreateExamArgs {
  @TypeGraphQL.Field(_type => ExamCreateInput, {
    nullable: false
  })
  data!: ExamCreateInput;
}
