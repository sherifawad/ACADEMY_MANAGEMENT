import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateOrConnectWithoutContactInput } from "../inputs/UserCreateOrConnectWithoutContactInput";
import { UserCreateWithoutContactInput } from "../inputs/UserCreateWithoutContactInput";
import { UserUpdateWithoutContactInput } from "../inputs/UserUpdateWithoutContactInput";
import { UserUpsertWithoutContactInput } from "../inputs/UserUpsertWithoutContactInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType("UserUpdateOneRequiredWithoutContactInput", {
  isAbstract: true
})
export class UserUpdateOneRequiredWithoutContactInput {
  @TypeGraphQL.Field(_type => UserCreateWithoutContactInput, {
    nullable: true
  })
  create?: UserCreateWithoutContactInput | undefined;

  @TypeGraphQL.Field(_type => UserCreateOrConnectWithoutContactInput, {
    nullable: true
  })
  connectOrCreate?: UserCreateOrConnectWithoutContactInput | undefined;

  @TypeGraphQL.Field(_type => UserUpsertWithoutContactInput, {
    nullable: true
  })
  upsert?: UserUpsertWithoutContactInput | undefined;

  @TypeGraphQL.Field(_type => UserWhereUniqueInput, {
    nullable: true
  })
  connect?: UserWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => UserUpdateWithoutContactInput, {
    nullable: true
  })
  update?: UserUpdateWithoutContactInput | undefined;
}
