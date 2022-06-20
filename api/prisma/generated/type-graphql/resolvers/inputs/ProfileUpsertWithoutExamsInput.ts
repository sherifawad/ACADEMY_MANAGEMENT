import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProfileCreateWithoutExamsInput } from "../inputs/ProfileCreateWithoutExamsInput";
import { ProfileUpdateWithoutExamsInput } from "../inputs/ProfileUpdateWithoutExamsInput";

@TypeGraphQL.InputType("ProfileUpsertWithoutExamsInput", {
  isAbstract: true
})
export class ProfileUpsertWithoutExamsInput {
  @TypeGraphQL.Field(_type => ProfileUpdateWithoutExamsInput, {
    nullable: false
  })
  update!: ProfileUpdateWithoutExamsInput;

  @TypeGraphQL.Field(_type => ProfileCreateWithoutExamsInput, {
    nullable: false
  })
  create!: ProfileCreateWithoutExamsInput;
}
