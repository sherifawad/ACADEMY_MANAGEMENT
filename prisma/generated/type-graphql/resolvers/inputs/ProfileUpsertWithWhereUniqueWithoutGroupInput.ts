import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProfileCreateWithoutGroupInput } from "../inputs/ProfileCreateWithoutGroupInput";
import { ProfileUpdateWithoutGroupInput } from "../inputs/ProfileUpdateWithoutGroupInput";
import { ProfileWhereUniqueInput } from "../inputs/ProfileWhereUniqueInput";

@TypeGraphQL.InputType("ProfileUpsertWithWhereUniqueWithoutGroupInput", {
  isAbstract: true
})
export class ProfileUpsertWithWhereUniqueWithoutGroupInput {
  @TypeGraphQL.Field(_type => ProfileWhereUniqueInput, {
    nullable: false
  })
  where!: ProfileWhereUniqueInput;

  @TypeGraphQL.Field(_type => ProfileUpdateWithoutGroupInput, {
    nullable: false
  })
  update!: ProfileUpdateWithoutGroupInput;

  @TypeGraphQL.Field(_type => ProfileCreateWithoutGroupInput, {
    nullable: false
  })
  create!: ProfileCreateWithoutGroupInput;
}
