import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AttendanceCreateWithoutGroupInput } from "../inputs/AttendanceCreateWithoutGroupInput";
import { AttendanceUpdateWithoutGroupInput } from "../inputs/AttendanceUpdateWithoutGroupInput";
import { AttendanceWhereUniqueInput } from "../inputs/AttendanceWhereUniqueInput";

@TypeGraphQL.InputType("AttendanceUpsertWithWhereUniqueWithoutGroupInput", {
  isAbstract: true
})
export class AttendanceUpsertWithWhereUniqueWithoutGroupInput {
  @TypeGraphQL.Field(_type => AttendanceWhereUniqueInput, {
    nullable: false
  })
  where!: AttendanceWhereUniqueInput;

  @TypeGraphQL.Field(_type => AttendanceUpdateWithoutGroupInput, {
    nullable: false
  })
  update!: AttendanceUpdateWithoutGroupInput;

  @TypeGraphQL.Field(_type => AttendanceCreateWithoutGroupInput, {
    nullable: false
  })
  create!: AttendanceCreateWithoutGroupInput;
}
