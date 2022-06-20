import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateWithoutTokensInput } from "../inputs/UserCreateWithoutTokensInput";
import { UserUpdateWithoutTokensInput } from "../inputs/UserUpdateWithoutTokensInput";

@TypeGraphQL.InputType("UserUpsertWithoutTokensInput", {
  isAbstract: true
})
export class UserUpsertWithoutTokensInput {
  @TypeGraphQL.Field(_type => UserUpdateWithoutTokensInput, {
    nullable: false
  })
  update!: UserUpdateWithoutTokensInput;

  @TypeGraphQL.Field(_type => UserCreateWithoutTokensInput, {
    nullable: false
  })
  create!: UserCreateWithoutTokensInput;
}
