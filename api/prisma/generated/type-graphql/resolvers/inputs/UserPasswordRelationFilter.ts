import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { UserPasswordWhereInput } from "../inputs/UserPasswordWhereInput";

@TypeGraphQL.InputType("UserPasswordRelationFilter", {
  isAbstract: true
})
export class UserPasswordRelationFilter {
  @TypeGraphQL.Field(_type => UserPasswordWhereInput, {
    nullable: true
  })
  is?: UserPasswordWhereInput | undefined;

  @TypeGraphQL.Field(_type => UserPasswordWhereInput, {
    nullable: true
  })
  isNot?: UserPasswordWhereInput | undefined;
}
