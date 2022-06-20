import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { UserPasswordCreateInput } from "../../../inputs/UserPasswordCreateInput";
import { UserPasswordUpdateInput } from "../../../inputs/UserPasswordUpdateInput";
import { UserPasswordWhereUniqueInput } from "../../../inputs/UserPasswordWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertUserPasswordArgs {
  @TypeGraphQL.Field(_type => UserPasswordWhereUniqueInput, {
    nullable: false
  })
  where!: UserPasswordWhereUniqueInput;

  @TypeGraphQL.Field(_type => UserPasswordCreateInput, {
    nullable: false
  })
  create!: UserPasswordCreateInput;

  @TypeGraphQL.Field(_type => UserPasswordUpdateInput, {
    nullable: false
  })
  update!: UserPasswordUpdateInput;
}
