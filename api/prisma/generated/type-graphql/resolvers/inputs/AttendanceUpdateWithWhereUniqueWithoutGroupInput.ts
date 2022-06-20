import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AttendanceUpdateWithoutGroupInput } from "../inputs/AttendanceUpdateWithoutGroupInput";
import { AttendanceWhereUniqueInput } from "../inputs/AttendanceWhereUniqueInput";

@TypeGraphQL.InputType("AttendanceUpdateWithWhereUniqueWithoutGroupInput", {
  isAbstract: true
})
export class AttendanceUpdateWithWhereUniqueWithoutGroupInput {
  @TypeGraphQL.Field(_type => AttendanceWhereUniqueInput, {
    nullable: false
  })
  where!: AttendanceWhereUniqueInput;

  @TypeGraphQL.Field(_type => AttendanceUpdateWithoutGroupInput, {
    nullable: false
  })
  data!: AttendanceUpdateWithoutGroupInput;
}
