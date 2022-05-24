import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { UserPasswordUpdateInput } from "../../../inputs/UserPasswordUpdateInput";
import { UserPasswordWhereUniqueInput } from "../../../inputs/UserPasswordWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateUserPasswordArgs {
  @TypeGraphQL.Field(_type => UserPasswordUpdateInput, {
    nullable: false
  })
  data!: UserPasswordUpdateInput;

  @TypeGraphQL.Field(_type => UserPasswordWhereUniqueInput, {
    nullable: false
  })
  where!: UserPasswordWhereUniqueInput;
}
