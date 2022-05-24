import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { ExamCreateManyInput } from "../../../inputs/ExamCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyExamArgs {
  @TypeGraphQL.Field(_type => [ExamCreateManyInput], {
    nullable: false
  })
  data!: ExamCreateManyInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
