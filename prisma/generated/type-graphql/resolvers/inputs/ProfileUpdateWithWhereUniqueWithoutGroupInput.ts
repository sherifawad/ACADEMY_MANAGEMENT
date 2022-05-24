import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProfileUpdateWithoutGroupInput } from "../inputs/ProfileUpdateWithoutGroupInput";
import { ProfileWhereUniqueInput } from "../inputs/ProfileWhereUniqueInput";

@TypeGraphQL.InputType("ProfileUpdateWithWhereUniqueWithoutGroupInput", {
  isAbstract: true
})
export class ProfileUpdateWithWhereUniqueWithoutGroupInput {
  @TypeGraphQL.Field(_type => ProfileWhereUniqueInput, {
    nullable: false
  })
  where!: ProfileWhereUniqueInput;

  @TypeGraphQL.Field(_type => ProfileUpdateWithoutGroupInput, {
    nullable: false
  })
  data!: ProfileUpdateWithoutGroupInput;
}
