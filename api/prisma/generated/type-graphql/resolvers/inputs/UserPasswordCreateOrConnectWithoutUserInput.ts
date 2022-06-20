import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserPasswordCreateWithoutUserInput } from "../inputs/UserPasswordCreateWithoutUserInput";
import { UserPasswordWhereUniqueInput } from "../inputs/UserPasswordWhereUniqueInput";

@TypeGraphQL.InputType("UserPasswordCreateOrConnectWithoutUserInput", {
  isAbstract: true
})
export class UserPasswordCreateOrConnectWithoutUserInput {
  @TypeGraphQL.Field(_type => UserPasswordWhereUniqueInput, {
    nullable: false
  })
  where!: UserPasswordWhereUniqueInput;

  @TypeGraphQL.Field(_type => UserPasswordCreateWithoutUserInput, {
    nullable: false
  })
  create!: UserPasswordCreateWithoutUserInput;
}
