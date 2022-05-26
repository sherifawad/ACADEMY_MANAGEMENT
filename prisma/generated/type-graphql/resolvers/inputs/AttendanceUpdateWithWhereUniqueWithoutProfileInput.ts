import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AttendanceUpdateWithoutProfileInput } from "../inputs/AttendanceUpdateWithoutProfileInput";
import { AttendanceWhereUniqueInput } from "../inputs/AttendanceWhereUniqueInput";

@TypeGraphQL.InputType("AttendanceUpdateWithWhereUniqueWithoutProfileInput", {
  isAbstract: true
})
export class AttendanceUpdateWithWhereUniqueWithoutProfileInput {
  @TypeGraphQL.Field(_type => AttendanceWhereUniqueInput, {
    nullable: false
  })
  where!: AttendanceWhereUniqueInput;

  @TypeGraphQL.Field(_type => AttendanceUpdateWithoutProfileInput, {
    nullable: false
  })
  data!: AttendanceUpdateWithoutProfileInput;
}
