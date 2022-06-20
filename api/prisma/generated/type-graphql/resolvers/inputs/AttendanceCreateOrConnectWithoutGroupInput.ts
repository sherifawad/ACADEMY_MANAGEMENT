import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AttendanceCreateWithoutGroupInput } from "../inputs/AttendanceCreateWithoutGroupInput";
import { AttendanceWhereUniqueInput } from "../inputs/AttendanceWhereUniqueInput";

@TypeGraphQL.InputType("AttendanceCreateOrConnectWithoutGroupInput", {
  isAbstract: true
})
export class AttendanceCreateOrConnectWithoutGroupInput {
  @TypeGraphQL.Field(_type => AttendanceWhereUniqueInput, {
    nullable: false
  })
  where!: AttendanceWhereUniqueInput;

  @TypeGraphQL.Field(_type => AttendanceCreateWithoutGroupInput, {
    nullable: false
  })
  create!: AttendanceCreateWithoutGroupInput;
}
