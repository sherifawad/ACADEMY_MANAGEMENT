import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateOrConnectWithoutTokensInput } from "../inputs/UserCreateOrConnectWithoutTokensInput";
import { UserCreateWithoutTokensInput } from "../inputs/UserCreateWithoutTokensInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType("UserCreateNestedOneWithoutTokensInput", {
  isAbstract: true
})
export class UserCreateNestedOneWithoutTokensInput {
  @TypeGraphQL.Field(_type => UserCreateWithoutTokensInput, {
    nullable: true
  })
  create?: UserCreateWithoutTokensInput | undefined;

  @TypeGraphQL.Field(_type => UserCreateOrConnectWithoutTokensInput, {
    nullable: true
  })
  connectOrCreate?: UserCreateOrConnectWithoutTokensInput | undefined;

  @TypeGraphQL.Field(_type => UserWhereUniqueInput, {
    nullable: true
  })
  connect?: UserWhereUniqueInput | undefined;
}
