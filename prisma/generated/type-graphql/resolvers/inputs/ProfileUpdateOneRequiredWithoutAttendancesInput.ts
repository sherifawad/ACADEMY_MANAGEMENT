import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProfileCreateOrConnectWithoutAttendancesInput } from "../inputs/ProfileCreateOrConnectWithoutAttendancesInput";
import { ProfileCreateWithoutAttendancesInput } from "../inputs/ProfileCreateWithoutAttendancesInput";
import { ProfileUpdateWithoutAttendancesInput } from "../inputs/ProfileUpdateWithoutAttendancesInput";
import { ProfileUpsertWithoutAttendancesInput } from "../inputs/ProfileUpsertWithoutAttendancesInput";
import { ProfileWhereUniqueInput } from "../inputs/ProfileWhereUniqueInput";

@TypeGraphQL.InputType("ProfileUpdateOneRequiredWithoutAttendancesInput", {
  isAbstract: true
})
export class ProfileUpdateOneRequiredWithoutAttendancesInput {
  @TypeGraphQL.Field(_type => ProfileCreateWithoutAttendancesInput, {
    nullable: true
  })
  create?: ProfileCreateWithoutAttendancesInput | undefined;

  @TypeGraphQL.Field(_type => ProfileCreateOrConnectWithoutAttendancesInput, {
    nullable: true
  })
  connectOrCreate?: ProfileCreateOrConnectWithoutAttendancesInput | undefined;

  @TypeGraphQL.Field(_type => ProfileUpsertWithoutAttendancesInput, {
    nullable: true
  })
  upsert?: ProfileUpsertWithoutAttendancesInput | undefined;

  @TypeGraphQL.Field(_type => ProfileWhereUniqueInput, {
    nullable: true
  })
  connect?: ProfileWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => ProfileUpdateWithoutAttendancesInput, {
    nullable: true
  })
  update?: ProfileUpdateWithoutAttendancesInput | undefined;
}
