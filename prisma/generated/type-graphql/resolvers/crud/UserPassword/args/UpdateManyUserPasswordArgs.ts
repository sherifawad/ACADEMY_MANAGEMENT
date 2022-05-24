import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { UserPasswordUpdateManyMutationInput } from "../../../inputs/UserPasswordUpdateManyMutationInput";
import { UserPasswordWhereInput } from "../../../inputs/UserPasswordWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyUserPasswordArgs {
  @TypeGraphQL.Field(_type => UserPasswordUpdateManyMutationInput, {
    nullable: false
  })
  data!: UserPasswordUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => UserPasswordWhereInput, {
    nullable: true
  })
  where?: UserPasswordWhereInput | undefined;
}
