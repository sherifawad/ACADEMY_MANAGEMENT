import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProfileCreateWithoutAttendancesInput } from "../inputs/ProfileCreateWithoutAttendancesInput";
import { ProfileWhereUniqueInput } from "../inputs/ProfileWhereUniqueInput";

@TypeGraphQL.InputType("ProfileCreateOrConnectWithoutAttendancesInput", {
  isAbstract: true
})
export class ProfileCreateOrConnectWithoutAttendancesInput {
  @TypeGraphQL.Field(_type => ProfileWhereUniqueInput, {
    nullable: false
  })
  where!: ProfileWhereUniqueInput;

  @TypeGraphQL.Field(_type => ProfileCreateWithoutAttendancesInput, {
    nullable: false
  })
  create!: ProfileCreateWithoutAttendancesInput;
}
