import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { RefreshTokenCreateNestedManyWithoutUserInput } from "../inputs/RefreshTokenCreateNestedManyWithoutUserInput";
import { UserPasswordCreateNestedOneWithoutUserInput } from "../inputs/UserPasswordCreateNestedOneWithoutUserInput";
import { Role } from "../../enums/Role";

@TypeGraphQL.InputType("UserCreateWithoutProfileInput", {
  isAbstract: true
})
export class UserCreateWithoutProfileInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  name!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  avatar?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  email?: string | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  emailConfirmed?: boolean | undefined;

  @TypeGraphQL.Field(_type => Role, {
    nullable: true
  })
  role?: "ADMIN" | "USER" | "Student" | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  createdAt?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  updatedAt?: Date | undefined;

  @TypeGraphQL.Field(_type => UserPasswordCreateNestedOneWithoutUserInput, {
    nullable: true
  })
  password?: UserPasswordCreateNestedOneWithoutUserInput | undefined;

  @TypeGraphQL.Field(_type => RefreshTokenCreateNestedManyWithoutUserInput, {
    nullable: true
  })
  tokens?: RefreshTokenCreateNestedManyWithoutUserInput | undefined;
}
