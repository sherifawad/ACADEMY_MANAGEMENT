import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { GradeWhereInput } from "../../../inputs/GradeWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyGradeArgs {
  @TypeGraphQL.Field(_type => GradeWhereInput, {
    nullable: true
  })
  where?: GradeWhereInput | undefined;
}
