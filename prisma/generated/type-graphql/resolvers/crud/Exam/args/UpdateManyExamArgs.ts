import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ExamUpdateManyMutationInput } from "../../../inputs/ExamUpdateManyMutationInput";
import { ExamWhereInput } from "../../../inputs/ExamWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyExamArgs {
  @TypeGraphQL.Field(_type => ExamUpdateManyMutationInput, {
    nullable: false
  })
  data!: ExamUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => ExamWhereInput, {
    nullable: true
  })
  where?: ExamWhereInput | undefined;
}
