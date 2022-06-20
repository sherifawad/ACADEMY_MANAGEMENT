import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { UserPasswordCreateInput } from "../../../inputs/UserPasswordCreateInput";

@TypeGraphQL.ArgsType()
export class CreateUserPasswordArgs {
  @TypeGraphQL.Field(_type => UserPasswordCreateInput, {
    nullable: false
  })
  data!: UserPasswordCreateInput;
}
