import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserCreateNestedOneWithoutPasswordInput } from "../inputs/UserCreateNestedOneWithoutPasswordInput";

@TypeGraphQL.InputType("UserPasswordCreateInput", {
  isAbstract: true
})
export class UserPasswordCreateInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  password!: string;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  forceChange?: boolean | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  createdAt?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  updatedAt?: Date | undefined;

  @TypeGraphQL.Field(_type => UserCreateNestedOneWithoutPasswordInput, {
    nullable: false
  })
  user!: UserCreateNestedOneWithoutPasswordInput;
}
