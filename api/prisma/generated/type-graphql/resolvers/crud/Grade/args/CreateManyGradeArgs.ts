import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { GradeCreateManyInput } from "../../../inputs/GradeCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyGradeArgs {
  @TypeGraphQL.Field(_type => [GradeCreateManyInput], {
    nullable: false
  })
  data!: GradeCreateManyInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
