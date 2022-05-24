import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { GradeWhereUniqueInput } from "../../../inputs/GradeWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueGradeArgs {
  @TypeGraphQL.Field(_type => GradeWhereUniqueInput, {
    nullable: false
  })
  where!: GradeWhereUniqueInput;
}
