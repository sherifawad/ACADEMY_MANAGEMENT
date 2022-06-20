import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserPasswordCreateOrConnectWithoutUserInput } from "../inputs/UserPasswordCreateOrConnectWithoutUserInput";
import { UserPasswordCreateWithoutUserInput } from "../inputs/UserPasswordCreateWithoutUserInput";
import { UserPasswordUpdateWithoutUserInput } from "../inputs/UserPasswordUpdateWithoutUserInput";
import { UserPasswordUpsertWithoutUserInput } from "../inputs/UserPasswordUpsertWithoutUserInput";
import { UserPasswordWhereUniqueInput } from "../inputs/UserPasswordWhereUniqueInput";

@TypeGraphQL.InputType("UserPasswordUpdateOneWithoutUserInput", {
  isAbstract: true
})
export class UserPasswordUpdateOneWithoutUserInput {
  @TypeGraphQL.Field(_type => UserPasswordCreateWithoutUserInput, {
    nullable: true
  })
  create?: UserPasswordCreateWithoutUserInput | undefined;

  @TypeGraphQL.Field(_type => UserPasswordCreateOrConnectWithoutUserInput, {
    nullable: true
  })
  connectOrCreate?: UserPasswordCreateOrConnectWithoutUserInput | undefined;

  @TypeGraphQL.Field(_type => UserPasswordUpsertWithoutUserInput, {
    nullable: true
  })
  upsert?: UserPasswordUpsertWithoutUserInput | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  disconnect?: boolean | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  delete?: boolean | undefined;

  @TypeGraphQL.Field(_type => UserPasswordWhereUniqueInput, {
    nullable: true
  })
  connect?: UserPasswordWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => UserPasswordUpdateWithoutUserInput, {
    nullable: true
  })
  update?: UserPasswordUpdateWithoutUserInput | undefined;
}
