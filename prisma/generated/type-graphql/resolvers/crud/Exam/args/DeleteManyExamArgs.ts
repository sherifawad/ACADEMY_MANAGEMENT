import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ExamWhereInput } from "../../../inputs/ExamWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyExamArgs {
  @TypeGraphQL.Field(_type => ExamWhereInput, {
    nullable: true
  })
  where?: ExamWhereInput | undefined;
}
