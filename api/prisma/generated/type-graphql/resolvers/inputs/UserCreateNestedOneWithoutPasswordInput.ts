import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateOrConnectWithoutPasswordInput } from "../inputs/UserCreateOrConnectWithoutPasswordInput";
import { UserCreateWithoutPasswordInput } from "../inputs/UserCreateWithoutPasswordInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType("UserCreateNestedOneWithoutPasswordInput", {
  isAbstract: true
})
export class UserCreateNestedOneWithoutPasswordInput {
  @TypeGraphQL.Field(_type => UserCreateWithoutPasswordInput, {
    nullable: true
  })
  create?: UserCreateWithoutPasswordInput | undefined;

  @TypeGraphQL.Field(_type => UserCreateOrConnectWithoutPasswordInput, {
    nullable: true
  })
  connectOrCreate?: UserCreateOrConnectWithoutPasswordInput | undefined;

  @TypeGraphQL.Field(_type => UserWhereUniqueInput, {
    nullable: true
  })
  connect?: UserWhereUniqueInput | undefined;
}
