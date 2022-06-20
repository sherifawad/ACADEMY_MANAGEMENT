import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { GradeCreateInput } from "../../../inputs/GradeCreateInput";
import { GradeUpdateInput } from "../../../inputs/GradeUpdateInput";
import { GradeWhereUniqueInput } from "../../../inputs/GradeWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertGradeArgs {
  @TypeGraphQL.Field(_type => GradeWhereUniqueInput, {
    nullable: false
  })
  where!: GradeWhereUniqueInput;

  @TypeGraphQL.Field(_type => GradeCreateInput, {
    nullable: false
  })
  create!: GradeCreateInput;

  @TypeGraphQL.Field(_type => GradeUpdateInput, {
    nullable: false
  })
  update!: GradeUpdateInput;
}
