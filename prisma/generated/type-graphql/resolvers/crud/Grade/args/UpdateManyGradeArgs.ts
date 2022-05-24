import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { GradeUpdateManyMutationInput } from "../../../inputs/GradeUpdateManyMutationInput";
import { GradeWhereInput } from "../../../inputs/GradeWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyGradeArgs {
  @TypeGraphQL.Field(_type => GradeUpdateManyMutationInput, {
    nullable: false
  })
  data!: GradeUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => GradeWhereInput, {
    nullable: true
  })
  where?: GradeWhereInput | undefined;
}
