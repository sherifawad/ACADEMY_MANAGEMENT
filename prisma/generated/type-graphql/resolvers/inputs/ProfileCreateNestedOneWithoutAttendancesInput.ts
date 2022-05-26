import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProfileCreateOrConnectWithoutAttendancesInput } from "../inputs/ProfileCreateOrConnectWithoutAttendancesInput";
import { ProfileCreateWithoutAttendancesInput } from "../inputs/ProfileCreateWithoutAttendancesInput";
import { ProfileWhereUniqueInput } from "../inputs/ProfileWhereUniqueInput";

@TypeGraphQL.InputType("ProfileCreateNestedOneWithoutAttendancesInput", {
  isAbstract: true
})
export class ProfileCreateNestedOneWithoutAttendancesInput {
  @TypeGraphQL.Field(_type => ProfileCreateWithoutAttendancesInput, {
    nullable: true
  })
  create?: ProfileCreateWithoutAttendancesInput | undefined;

  @TypeGraphQL.Field(_type => ProfileCreateOrConnectWithoutAttendancesInput, {
    nullable: true
  })
  connectOrCreate?: ProfileCreateOrConnectWithoutAttendancesInput | undefined;

  @TypeGraphQL.Field(_type => ProfileWhereUniqueInput, {
    nullable: true
  })
  connect?: ProfileWhereUniqueInput | undefined;
}
