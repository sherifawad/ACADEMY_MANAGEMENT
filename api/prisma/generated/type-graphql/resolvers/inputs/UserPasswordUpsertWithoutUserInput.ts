import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserPasswordCreateWithoutUserInput } from "../inputs/UserPasswordCreateWithoutUserInput";
import { UserPasswordUpdateWithoutUserInput } from "../inputs/UserPasswordUpdateWithoutUserInput";

@TypeGraphQL.InputType("UserPasswordUpsertWithoutUserInput", {
  isAbstract: true
})
export class UserPasswordUpsertWithoutUserInput {
  @TypeGraphQL.Field(_type => UserPasswordUpdateWithoutUserInput, {
    nullable: false
  })
  update!: UserPasswordUpdateWithoutUserInput;

  @TypeGraphQL.Field(_type => UserPasswordCreateWithoutUserInput, {
    nullable: false
  })
  create!: UserPasswordCreateWithoutUserInput;
}
