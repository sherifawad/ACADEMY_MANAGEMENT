import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateOrConnectWithoutContactInput } from "../inputs/UserCreateOrConnectWithoutContactInput";
import { UserCreateWithoutContactInput } from "../inputs/UserCreateWithoutContactInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType("UserCreateNestedOneWithoutContactInput", {
  isAbstract: true
})
export class UserCreateNestedOneWithoutContactInput {
  @TypeGraphQL.Field(_type => UserCreateWithoutContactInput, {
    nullable: true
  })
  create?: UserCreateWithoutContactInput | undefined;

  @TypeGraphQL.Field(_type => UserCreateOrConnectWithoutContactInput, {
    nullable: true
  })
  connectOrCreate?: UserCreateOrConnectWithoutContactInput | undefined;

  @TypeGraphQL.Field(_type => UserWhereUniqueInput, {
    nullable: true
  })
  connect?: UserWhereUniqueInput | undefined;
}
