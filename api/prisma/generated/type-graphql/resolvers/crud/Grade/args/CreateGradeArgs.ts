import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { GradeCreateInput } from "../../../inputs/GradeCreateInput";

@TypeGraphQL.ArgsType()
export class CreateGradeArgs {
  @TypeGraphQL.Field(_type => GradeCreateInput, {
    nullable: false
  })
  data!: GradeCreateInput;
}
