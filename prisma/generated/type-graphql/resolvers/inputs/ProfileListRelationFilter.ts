import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProfileWhereInput } from "../inputs/ProfileWhereInput";

@TypeGraphQL.InputType("ProfileListRelationFilter", {
  isAbstract: true
})
export class ProfileListRelationFilter {
  @TypeGraphQL.Field(_type => ProfileWhereInput, {
    nullable: true
  })
  every?: ProfileWhereInput | undefined;

  @TypeGraphQL.Field(_type => ProfileWhereInput, {
    nullable: true
  })
  some?: ProfileWhereInput | undefined;

  @TypeGraphQL.Field(_type => ProfileWhereInput, {
    nullable: true
  })
  none?: ProfileWhereInput | undefined;
}
