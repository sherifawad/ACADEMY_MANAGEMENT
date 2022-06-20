import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserPasswordCreateOrConnectWithoutUserInput } from "../inputs/UserPasswordCreateOrConnectWithoutUserInput";
import { UserPasswordCreateWithoutUserInput } from "../inputs/UserPasswordCreateWithoutUserInput";
import { UserPasswordWhereUniqueInput } from "../inputs/UserPasswordWhereUniqueInput";

@TypeGraphQL.InputType("UserPasswordCreateNestedOneWithoutUserInput", {
  isAbstract: true
})
export class UserPasswordCreateNestedOneWithoutUserInput {
  @TypeGraphQL.Field(_type => UserPasswordCreateWithoutUserInput, {
    nullable: true
  })
  create?: UserPasswordCreateWithoutUserInput | undefined;

  @TypeGraphQL.Field(_type => UserPasswordCreateOrConnectWithoutUserInput, {
    nullable: true
  })
  connectOrCreate?: UserPasswordCreateOrConnectWithoutUserInput | undefined;

  @TypeGraphQL.Field(_type => UserPasswordWhereUniqueInput, {
    nullable: true
  })
  connect?: UserPasswordWhereUniqueInput | undefined;
}
