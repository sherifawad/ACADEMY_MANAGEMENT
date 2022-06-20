import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateWithoutPasswordInput } from "../inputs/UserCreateWithoutPasswordInput";
import { UserUpdateWithoutPasswordInput } from "../inputs/UserUpdateWithoutPasswordInput";

@TypeGraphQL.InputType("UserUpsertWithoutPasswordInput", {
  isAbstract: true
})
export class UserUpsertWithoutPasswordInput {
  @TypeGraphQL.Field(_type => UserUpdateWithoutPasswordInput, {
    nullable: false
  })
  update!: UserUpdateWithoutPasswordInput;

  @TypeGraphQL.Field(_type => UserCreateWithoutPasswordInput, {
    nullable: false
  })
  create!: UserCreateWithoutPasswordInput;
}
