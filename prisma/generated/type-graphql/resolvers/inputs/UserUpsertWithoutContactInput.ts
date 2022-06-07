import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateWithoutContactInput } from "../inputs/UserCreateWithoutContactInput";
import { UserUpdateWithoutContactInput } from "../inputs/UserUpdateWithoutContactInput";

@TypeGraphQL.InputType("UserUpsertWithoutContactInput", {
  isAbstract: true
})
export class UserUpsertWithoutContactInput {
  @TypeGraphQL.Field(_type => UserUpdateWithoutContactInput, {
    nullable: false
  })
  update!: UserUpdateWithoutContactInput;

  @TypeGraphQL.Field(_type => UserCreateWithoutContactInput, {
    nullable: false
  })
  create!: UserCreateWithoutContactInput;
}
