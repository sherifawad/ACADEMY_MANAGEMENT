import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProfileCreateWithoutAttendancesInput } from "../inputs/ProfileCreateWithoutAttendancesInput";
import { ProfileUpdateWithoutAttendancesInput } from "../inputs/ProfileUpdateWithoutAttendancesInput";

@TypeGraphQL.InputType("ProfileUpsertWithoutAttendancesInput", {
  isAbstract: true
})
export class ProfileUpsertWithoutAttendancesInput {
  @TypeGraphQL.Field(_type => ProfileUpdateWithoutAttendancesInput, {
    nullable: false
  })
  update!: ProfileUpdateWithoutAttendancesInput;

  @TypeGraphQL.Field(_type => ProfileCreateWithoutAttendancesInput, {
    nullable: false
  })
  create!: ProfileCreateWithoutAttendancesInput;
}
