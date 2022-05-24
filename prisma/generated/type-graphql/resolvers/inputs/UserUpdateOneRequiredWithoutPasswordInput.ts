import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateOrConnectWithoutPasswordInput } from "../inputs/UserCreateOrConnectWithoutPasswordInput";
import { UserCreateWithoutPasswordInput } from "../inputs/UserCreateWithoutPasswordInput";
import { UserUpdateWithoutPasswordInput } from "../inputs/UserUpdateWithoutPasswordInput";
import { UserUpsertWithoutPasswordInput } from "../inputs/UserUpsertWithoutPasswordInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType("UserUpdateOneRequiredWithoutPasswordInput", {
  isAbstract: true
})
export class UserUpdateOneRequiredWithoutPasswordInput {
  @TypeGraphQL.Field(_type => UserCreateWithoutPasswordInput, {
    nullable: true
  })
  create?: UserCreateWithoutPasswordInput | undefined;

  @TypeGraphQL.Field(_type => UserCreateOrConnectWithoutPasswordInput, {
    nullable: true
  })
  connectOrCreate?: UserCreateOrConnectWithoutPasswordInput | undefined;

  @TypeGraphQL.Field(_type => UserUpsertWithoutPasswordInput, {
    nullable: true
  })
  upsert?: UserUpsertWithoutPasswordInput | undefined;

  @TypeGraphQL.Field(_type => UserWhereUniqueInput, {
    nullable: true
  })
  connect?: UserWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => UserUpdateWithoutPasswordInput, {
    nullable: true
  })
  update?: UserUpdateWithoutPasswordInput | undefined;
}
