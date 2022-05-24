import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { GradeUpdateInput } from "../../../inputs/GradeUpdateInput";
import { GradeWhereUniqueInput } from "../../../inputs/GradeWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateGradeArgs {
  @TypeGraphQL.Field(_type => GradeUpdateInput, {
    nullable: false
  })
  data!: GradeUpdateInput;

  @TypeGraphQL.Field(_type => GradeWhereUniqueInput, {
    nullable: false
  })
  where!: GradeWhereUniqueInput;
}
