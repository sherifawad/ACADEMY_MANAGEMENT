import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AttendanceCreateWithoutProfileInput } from "../inputs/AttendanceCreateWithoutProfileInput";
import { AttendanceUpdateWithoutProfileInput } from "../inputs/AttendanceUpdateWithoutProfileInput";
import { AttendanceWhereUniqueInput } from "../inputs/AttendanceWhereUniqueInput";

@TypeGraphQL.InputType("AttendanceUpsertWithWhereUniqueWithoutProfileInput", {
  isAbstract: true
})
export class AttendanceUpsertWithWhereUniqueWithoutProfileInput {
  @TypeGraphQL.Field(_type => AttendanceWhereUniqueInput, {
    nullable: false
  })
  where!: AttendanceWhereUniqueInput;

  @TypeGraphQL.Field(_type => AttendanceUpdateWithoutProfileInput, {
    nullable: false
  })
  update!: AttendanceUpdateWithoutProfileInput;

  @TypeGraphQL.Field(_type => AttendanceCreateWithoutProfileInput, {
    nullable: false
  })
  create!: AttendanceCreateWithoutProfileInput;
}
