import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { UserPasswordWhereInput } from "../../../inputs/UserPasswordWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyUserPasswordArgs {
  @TypeGraphQL.Field(_type => UserPasswordWhereInput, {
    nullable: true
  })
  where?: UserPasswordWhereInput | undefined;
}
