import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { UserPasswordWhereUniqueInput } from "../../../inputs/UserPasswordWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueUserPasswordArgs {
  @TypeGraphQL.Field(_type => UserPasswordWhereUniqueInput, {
    nullable: false
  })
  where!: UserPasswordWhereUniqueInput;
}
