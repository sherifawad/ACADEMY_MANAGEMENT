import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ProfileCreateNestedOneWithoutAttendancesInput } from "../inputs/ProfileCreateNestedOneWithoutAttendancesInput";

@TypeGraphQL.InputType("AttendanceCreateWithoutGroupInput", {
  isAbstract: true
})
export class AttendanceCreateWithoutGroupInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  startAt!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  endAt?: Date | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  note?: string | undefined;

  @TypeGraphQL.Field(_type => ProfileCreateNestedOneWithoutAttendancesInput, {
    nullable: false
  })
  Profile!: ProfileCreateNestedOneWithoutAttendancesInput;
}
